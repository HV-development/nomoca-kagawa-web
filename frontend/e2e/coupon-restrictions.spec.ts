import { test, expect } from '@playwright/test';

/**
 * クーポン年齢制限テスト（20歳以上ユーザー）
 * 
 * このテストは認証済みセッション（nomoca-user@example.com、20歳以上）を使用します。
 */

test.describe('アルコールクーポン成人', () => {
    test('成人にアルコールクーポン表示', async ({ page }) => {
        await page.goto('/home', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);
        
        const storeCards = page.locator('h3').filter({ hasText: /./ });
        await expect(storeCards.first()).toBeVisible({ timeout: 15000 });
        
        const firstStoreCard = storeCards.first();
        const storeCard = firstStoreCard.locator('..').locator('..').locator('..');
        await storeCard.click({ timeout: 5000 });
        await page.waitForTimeout(1500);
        
        const popupHeader = page.getByText('店舗詳細').first();
        await expect(popupHeader).toBeVisible({ timeout: 5000 });
        
        const couponButton = page.getByRole('button', { name: '今すぐクーポンGET' }).first();
        await couponButton.click({ force: true, timeout: 5000 });
        await page.waitForTimeout(2000);
        
        const couponListPopup = page.locator('text=クーポン一覧').first();
        await expect(couponListPopup).toBeVisible({ timeout: 5000 });
        
        const couponButtons = page.getByRole('button', { name: 'このクーポンで乾杯！' });
        const couponCount = await couponButtons.count();
        
        console.log(`表示されているクーポン数: ${couponCount}`);
        expect(couponCount).toBeGreaterThan(0);
    });
});
