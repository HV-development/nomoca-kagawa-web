import { test, expect, Page } from '@playwright/test';
import { clearCouponUsageHistory, TEST_USERS } from './utils/test-data-setup';

/**
 * クーポン使用のテスト
 * 
 * テストデータはグローバルセットアップで初期化されます。
 * 各テスト前にクーポン使用履歴をクリアします。
 */

test.beforeAll(async () => {
    clearCouponUsageHistory(TEST_USERS.WITH_PLAN.userId);
});

async function openCouponList(page: Page): Promise<{ hasCoupons: boolean; storeName: string }> {
    const storeCards = page.locator('h3').filter({ hasText: /./ });
    await expect(storeCards.first()).toBeVisible({ timeout: 15000 });
    
    const firstStoreCard = storeCards.first();
    const storeName = await firstStoreCard.textContent() || '';
    const storeCard = firstStoreCard.locator('..').locator('..').locator('..');
    await storeCard.click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    
    const popupHeader = page.getByText('店舗詳細').first();
    await expect(popupHeader).toBeVisible({ timeout: 5000 });
    
    const couponButton = page.getByRole('button', { name: '今すぐクーポンGET' }).first();
    await expect(couponButton).toBeVisible({ timeout: 5000 });
    await couponButton.click({ force: true, timeout: 5000 });
    
    try {
        await page.waitForResponse(
            response => response.url().includes('/api/coupons') && response.status() === 200,
            { timeout: 15000 }
        );
    } catch { /* ignore */ }
    
    await page.waitForTimeout(2000);
    
    const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
    const hasCoupons = await useCouponButton.count() > 0;
    
    return { hasCoupons, storeName };
}

async function useCoupon(page: Page): Promise<boolean> {
    try {
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        if (!(await useCouponButton.isVisible().catch(() => false))) {
            console.log('[useCoupon] Button not found');
            return false;
        }
        
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1500);
        
        await expect(page.getByText('クーポン使用確認').first()).toBeVisible({ timeout: 5000 });
        
        const showToStaffButton = page.getByRole('button', { name: '店員に見せる' }).first();
        if (await showToStaffButton.isVisible().catch(() => false)) {
            console.log('[useCoupon] Clicking "店員に見せる"');
            await showToStaffButton.click({ force: true });
            await page.waitForTimeout(1500);
        }
        
        const useButton = page.getByRole('button', { name: '利用する' }).first();
        await expect(useButton).toBeVisible({ timeout: 5000 });
        console.log('[useCoupon] Clicking "利用する"');
        
        const responsePromise = page.waitForResponse(
            response => response.url().includes('/api/coupons') && response.url().includes('/use'),
            { timeout: 15000 }
        );
        
        await useButton.click({ force: true });
        
        try {
            const response = await responsePromise;
            console.log('[useCoupon] API response status:', response.status());
            
            if (!response.ok()) {
                const text = await response.text();
                console.log('[useCoupon] API error:', text);
                return false;
            }
        } catch (_error) {
            console.log('[useCoupon] No API response received');
        }
        
        await page.waitForTimeout(3000);
        
        const successIndicators = [
            page.getByText('使用完了'),
            page.getByText('クーポンを使用しました'),
            page.locator('img[src*="drink"]'),
        ];
        
        for (const indicator of successIndicators) {
            if (await indicator.first().isVisible().catch(() => false)) {
                console.log('[useCoupon] Success!');
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('[useCoupon] Error:', error);
        return false;
    }
}

test.describe('クーポン使用のテスト', () => {
    // シリアル実行で競合を避ける
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }) => {
        await page.goto('/home', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);
    });

    test('クーポン一覧表示', async ({ page }) => {
        const storeCards = page.locator('h3').filter({ hasText: /./ });
        await expect(storeCards.first()).toBeVisible({ timeout: 15000 });
        
        const firstStoreCard = storeCards.first();
        const storeCard = firstStoreCard.locator('..').locator('..').locator('..');
        await storeCard.click({ timeout: 5000 });
        await page.waitForTimeout(1500);
        
        const popupHeader = page.getByText('店舗詳細').first();
        await expect(popupHeader).toBeVisible({ timeout: 5000 });
        
        const couponButton = page.getByRole('button', { name: '今すぐクーポンGET' }).first();
        await expect(couponButton).toBeVisible({ timeout: 5000 });
        await couponButton.click({ force: true, timeout: 5000 });
        await page.waitForTimeout(2000);
        
        const couponListHeader = page.getByText('クーポン一覧').first();
        await expect(couponListHeader).toBeVisible({ timeout: 5000 });
        
        const storeName = page.locator('h4').filter({ hasText: /【ノモカ】/ }).first();
        await expect(storeName).toBeVisible({ timeout: 5000 });
    });

    test('クーポン使用成功', async ({ page }) => {
        const { hasCoupons, storeName } = await openCouponList(page);
        console.log(`[Test] Shop: ${storeName}, Has coupons: ${hasCoupons}`);
        
        // クーポンが存在することを確認（テストの前提条件）
        expect(hasCoupons, 'テスト実行にはクーポンデータが必要です。seedデータを確認してください。').toBeTruthy();
        
        const used = await useCoupon(page);
        expect(used, 'クーポン使用に成功する必要があります').toBeTruthy();
    });

    test('同日同店舗クーポン使用不可', async ({ page }) => {
        // このテストは「クーポン使用成功」テストの後にシリアル実行される
        // 同じ店舗（1番目の店舗）でクーポンを再度取得しようとする
        const { hasCoupons, storeName } = await openCouponList(page);
        console.log(`[同日テスト] 店舗: ${storeName}, クーポン有: ${hasCoupons}`);
        
        // クーポンが存在することを確認（前提条件）
        expect(hasCoupons, 'クーポンが存在する必要があります').toBeTruthy();
        
        // 「本日のクーポンは使用済みです」メッセージが表示されることを確認
        const usedTodayMessage = page.getByText('本日のクーポンは使用済みです');
        const hasUsedMessage = await usedTodayMessage.isVisible().catch(() => false);
        
        if (hasUsedMessage) {
            console.log('[同日テスト] 使用済みメッセージ確認完了');
            expect(hasUsedMessage).toBeTruthy();
        } else {
            // 使用済みでない場合は、先にクーポンを使用してから再確認
            console.log('[同日テスト] まだ使用されていないため、クーポンを使用します');
            const used = await useCoupon(page);
            if (used) {
                console.log('[同日テスト] クーポン使用完了、再度確認します');
                // ページをリロードして同じ店舗を再選択
                await page.goto('/home');
                await page.waitForTimeout(2000);
                await openCouponList(page);
                
                // 使用済みメッセージを再確認
                const usedMessageAfter = page.getByText('本日のクーポンは使用済みです');
                await expect(usedMessageAfter).toBeVisible({ timeout: 10000 });
                console.log('[同日テスト] 使用済みメッセージ確認完了（クーポン使用後）');
            } else {
                // クーポン使用に失敗した場合は、テスト前提条件のエラーとして扱う
                expect(false, 'クーポン使用に失敗しました。テスト環境を確認してください。').toBeTruthy();
            }
        }
    });
});
