import { test, expect } from '@playwright/test';
import { getLatestOtp } from './utils/mailhog';
import { clearCouponUsageHistory, TEST_USERS } from './utils/test-data-setup';

/**
 * クーポン年齢制限テスト（20歳未満ユーザー）
 * 
 * テストデータはグローバルセットアップで初期化されます。
 */

test.beforeAll(async () => {
    clearCouponUsageHistory(TEST_USERS.UNDERAGE.userId);
});

test.describe('アルコールクーポン未成年', () => {
    test.describe.configure({ mode: 'serial' });

    test('未成年にアルコールクーポン非表示', async ({ page, request }) => {
        // ログインページにアクセス
        await page.goto('/login');
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);
        
        // ログインフォームに入力
        await page.locator('input[type="email"]').fill(TEST_USERS.UNDERAGE.email);
        await page.locator('input[type="password"]').fill(TEST_USERS.UNDERAGE.password);
        
        // ログインボタンをクリック
        const loginButton = page.getByRole('button', { name: /ログイン/i });
        await loginButton.click();
        
        // OTP入力画面へのリダイレクトを待機
        await page.waitForURL(/.*\/verify-otp\?requestId=/, { timeout: 30000 });
        await page.waitForTimeout(2000);
        
        // MailHogからOTPを取得
        const otp = await getLatestOtp(request, TEST_USERS.UNDERAGE.email);
        // OTPが取得できることを確認（テストの前提条件）
        expect(otp, 'OTPを取得できませんでした。MailHogが起動しているか確認してください。').toBeTruthy();
        if (!otp) {  // TypeScriptの型チェック用
        }
        
        console.log(`OTP retrieved: ${otp}`);
        
        // OTP入力フィールドが表示されるのを待機
        await page.waitForSelector('input[type="text"][maxlength="1"]', { timeout: 15000 });
        
        // OTPを入力（6桁全て入力すると自動で認証される）
        const otpInputs = page.locator('input[type="text"][maxlength="1"]');
        const inputCount = await otpInputs.count();
        console.log(`[Underage Test] Found ${inputCount} OTP input fields`);
        
        for (let i = 0; i < otp.length && i < inputCount; i++) {
            await otpInputs.nth(i).fill(otp[i]);
            await page.waitForTimeout(150);
        }
        
        // OTP入力後、自動認証されてホームにリダイレクトされるのを待機
        await page.waitForURL(/.*home.*/, { timeout: 20000 });
        await page.waitForTimeout(2000);
        
        // 店舗カードが表示されるまで待機
        const storeCards = page.locator('h3').filter({ hasText: /./ });
        await expect(storeCards.first()).toBeVisible({ timeout: 15000 });
        
        // 店舗詳細を開く
        const firstStoreCard = storeCards.first();
        const storeCard = firstStoreCard.locator('..').locator('..').locator('..');
        await storeCard.click({ timeout: 5000 });
        await page.waitForTimeout(1500);
        
        // 店舗詳細ポップアップが表示されることを確認
        const popupHeader = page.getByText('店舗詳細').first();
        await expect(popupHeader).toBeVisible({ timeout: 5000 });
        
        // クーポンボタンをクリック
        const couponButton = page.getByRole('button', { name: '今すぐクーポンGET' }).first();
        await couponButton.click({ force: true, timeout: 5000 });
        await page.waitForTimeout(2000);
        
        // クーポン一覧が表示されることを確認
        const couponListPopup = page.locator('text=クーポン一覧').first();
        await expect(couponListPopup).toBeVisible({ timeout: 5000 });
        
        // アルコールクーポンが非表示であることを確認
        const alcoholCouponTitles = page.locator('h4').filter({ 
            hasText: /ビール|ハイボール|日本酒|焼酎|ワイン|カクテル|サワー|酎ハイ/ 
        });
        const alcoholCount = await alcoholCouponTitles.count();
        
        console.log(`20歳未満ユーザーに表示されているアルコールクーポン数: ${alcoholCount}`);
        
        // アルコールクーポンが表示されていないことを確認
        expect(alcoholCount, '20歳未満ユーザーにはアルコールクーポンが表示されないべきです').toBe(0);
        
        // クーポン総数を確認
        const couponButtons = page.getByRole('button', { name: 'このクーポンで乾杯！' });
        const totalCount = await couponButtons.count();
        console.log(`20歳未満ユーザーに表示されているクーポン総数: ${totalCount}`);
    });
});
