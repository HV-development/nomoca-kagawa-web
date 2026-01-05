import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { getLatestOtp } from './utils/mailhog';

/**
 * プラン未登録ユーザーのクーポン使用テスト
 *
 * プラン未登録のユーザーがクーポンを使用しようとした際にプラン登録誘導のポップアップが表示されることを確認します。
 * このテストはauth-flowプロジェクトで実行され、独自のログインフローを含みます。
 * 
 * 注意: プラン未登録ユーザーは/homeに直接アクセスできない（/plan-registrationにリダイレクト）ため、
 * ログイン後に/（ルート）からアクセスして店舗一覧を表示します。
 */

import { TEST_USERS, ensureUserHasNoPlan, clearCouponUsageHistory } from './utils/test-data-setup';

// プラン未登録テストユーザー
const NO_PLAN_USER = TEST_USERS.NO_PLAN;

test.beforeAll(async () => {
    // プラン未登録状態を確保
    ensureUserHasNoPlan(NO_PLAN_USER.userId);
    clearCouponUsageHistory(NO_PLAN_USER.userId);
});

/**
 * 店舗一覧からクーポン一覧を開くヘルパー関数
 */
async function openCouponList(page: Page): Promise<{ hasCoupons: boolean }> {
    // 店舗カードが表示されるまで待機
    const storeCards = page.locator('h3').filter({ hasText: /./ });
    await expect(storeCards.first()).toBeVisible({ timeout: 15000 });

    // 最初の店舗カードをクリック
    const firstStoreCard = storeCards.first();
    const storeCard = firstStoreCard.locator('..').locator('..').locator('..');
    await storeCard.click({ timeout: 5000 });
    await page.waitForTimeout(1500);

    // 店舗詳細ポップアップが表示されることを確認
    const popupHeader = page.getByText('店舗詳細').first();
    await expect(popupHeader).toBeVisible({ timeout: 5000 });

    // クーポンボタンをクリック
    const couponButton = page.getByRole('button', { name: '今すぐクーポンGET' }).first();
    await expect(couponButton).toBeVisible({ timeout: 5000 });
    await couponButton.click({ force: true, timeout: 5000 });

    // APIリクエストを待機
    try {
        await page.waitForResponse(
            response => response.url().includes('/api/coupons') &&
                       response.url().includes('status=approved') &&
                       response.status() === 200,
            { timeout: 15000 }
        );
    } catch {
        // タイムアウトしても続行
    }

    await page.waitForTimeout(2000);

    // クーポンが存在するか確認
    const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
    const hasCoupons = await useCouponButton.count() > 0;

    return { hasCoupons };
}

/**
 * プラン未登録ユーザーでログインするヘルパー関数
 */
async function loginAsNoPlanUser(page: Page, _request: APIRequestContext): Promise<void> {
    // ログインページにアクセス
    await page.goto('/login');
    await page.waitForLoadState('load');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });

    // プラン未登録ユーザーでログイン
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await emailInput.fill(NO_PLAN_USER.email);
    await passwordInput.fill(NO_PLAN_USER.password);

    const loginButton = page.getByRole('button', { name: /ログイン/i });
    await loginButton.click();

    // OTP入力画面へのリダイレクトを待機
    await page.waitForURL(/.*\/verify-otp\?requestId=/, { timeout: 30000 });
    await page.waitForTimeout(2000);

    // MailHogからOTPを取得
    const otp = await getLatestOtp(request, NO_PLAN_USER.email);
    expect(otp, 'OTPを取得できませんでした').toBeTruthy();
    expect(otp).toMatch(/^\d{6}$/);
    console.log(`OTP retrieved: ${otp}`);

    // OTP入力フィールドが表示されるのを待機
    await page.waitForSelector('input[type="text"][maxlength="1"]', { timeout: 15000 });

    // OTPを入力
    const otpInputs = page.locator('input[type="text"][maxlength="1"]');
    for (let i = 0; i < otp.length; i++) {
        await otpInputs.nth(i).fill(otp[i]);
        await page.waitForTimeout(100);
    }

    // ログイン完了を待機（/homeまたは/plan-registrationにリダイレクト）
    await page.waitForURL(/.*\/(home|plan-registration).*/, { timeout: 15000 });
    await page.waitForTimeout(2000);

    // /plan-registrationにリダイレクトされた場合は/（ルート）に移動
    if (page.url().includes('/plan-registration')) {
        console.log('[No Plan Test] Redirected to plan-registration, navigating to root');
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);
    }
}

test.describe('未登録クーポン使用', () => {
    // このテストスイートは認証フローを含むため、シリアル実行
    test.describe.configure({ mode: 'serial' });

    test('未登録でクーポン使用時ポップアップ', async ({ page, request }) => {
        // プラン未登録ユーザーでログイン
        await loginAsNoPlanUser(page, request);

        // クーポン一覧を開く
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[No Plan Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // プラン登録誘導ポップアップが表示されることを確認
        const planRequiredHeader = page.getByText('プラン未契約').first();
        await expect(planRequiredHeader).toBeVisible({ timeout: 5000 });

        // プラン登録誘導メッセージが表示されることを確認
        const planRequiredMessage = page.getByText('クーポンを使用するには、プランの登録が必要です').first();
        await expect(planRequiredMessage).toBeVisible({ timeout: 5000 });

        // 「プランを登録する」ボタンが表示されることを確認
        const registerPlanButton = page.getByRole('button', { name: 'プランを登録する' }).first();
        await expect(registerPlanButton).toBeVisible({ timeout: 5000 });

        // 「キャンセル」ボタンが表示されることを確認
        const cancelButton = page.getByRole('button', { name: 'キャンセル' }).first();
        await expect(cancelButton).toBeVisible({ timeout: 5000 });
    });

    test('登録ボタンでプラン登録画面へ', async ({ page, request }) => {
        // プラン未登録ユーザーでログイン
        await loginAsNoPlanUser(page, request);

        // クーポン一覧を開く
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[No Plan Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // プラン登録誘導ポップアップが表示されることを確認
        const planRequiredHeader = page.getByText('プラン未契約').first();
        await expect(planRequiredHeader).toBeVisible({ timeout: 5000 });

        // 「プランを登録する」ボタンをクリック
        const registerPlanButton = page.getByRole('button', { name: 'プランを登録する' }).first();
        await registerPlanButton.click({ force: true });
        await page.waitForTimeout(2000);

        // プラン登録関連の要素が表示されることを確認（SPAのビュー遷移）
        // プラン一覧、プラン選択、またはマイページのプラン登録セクションが表示されることを確認
        const planContent = page.getByText(/プラン|サブスクリプション|月額|料金/).first();
        await expect(planContent).toBeVisible({ timeout: 5000 });
    });

    test('キャンセルでポップアップ閉じる', async ({ page, request }) => {
        // プラン未登録ユーザーでログイン
        await loginAsNoPlanUser(page, request);

        // クーポン一覧を開く
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[No Plan Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // プラン登録誘導ポップアップが表示されることを確認
        const planRequiredHeader = page.getByText('プラン未契約').first();
        await expect(planRequiredHeader).toBeVisible({ timeout: 5000 });

        // 「キャンセル」ボタンをクリック
        const cancelButton = page.getByRole('button', { name: 'キャンセル' }).first();
        await cancelButton.click({ force: true });
        await page.waitForTimeout(1000);

        // ポップアップが閉じることを確認
        await expect(planRequiredHeader).not.toBeVisible({ timeout: 5000 });
    });
});
