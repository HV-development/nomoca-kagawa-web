import { test, expect, Page } from '@playwright/test';

/**
 * 未ログイン時のクーポン使用テスト
 *
 * ルート（/）は認証不要のため、未ログイン状態で店舗一覧を表示できます。
 * クーポンを使用しようとした際にログイン誘導のポップアップが表示されることを確認します。
 */

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

test.describe('未ログインクーポン', () => {
    test.beforeEach(async ({ page }) => {
        // 未ログイン状態でルートにアクセス（ルートは認証不要）
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);
    });

    test('未ログインでログイン誘導表示', async ({ page }) => {
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[Unauthenticated Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // ログイン誘導ポップアップが表示されることを確認
        const loginRequiredHeader = page.getByText('ログインしてください').first();
        await expect(loginRequiredHeader).toBeVisible({ timeout: 5000 });

        // ログイン誘導メッセージが表示されることを確認
        const loginRequiredMessage = page.getByText('クーポンの利用にはログインが必要です').first();
        await expect(loginRequiredMessage).toBeVisible({ timeout: 5000 });

        // 「ログインする」ボタンが表示されることを確認
        const loginButton = page.getByRole('button', { name: 'ログインする' }).first();
        await expect(loginButton).toBeVisible({ timeout: 5000 });

        // 「キャンセル」ボタンが表示されることを確認
        const cancelButton = page.getByRole('button', { name: 'キャンセル' }).first();
        await expect(cancelButton).toBeVisible({ timeout: 5000 });
    });

    test('ログインボタンでログイン画面へ', async ({ page }) => {
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[Unauthenticated Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // ログイン誘導ポップアップが表示されることを確認
        const loginRequiredHeader = page.getByText('ログインしてください').first();
        await expect(loginRequiredHeader).toBeVisible({ timeout: 5000 });

        // 「ログインする」ボタンをクリック
        const loginButton = page.getByRole('button', { name: 'ログインする' }).first();
        await loginButton.click({ force: true });
        await page.waitForTimeout(2000);

        // ログイン画面が表示されることを確認（SPAのためURLではなくビューを確認）
        // ログインフォームが表示されることを確認
        const loginFormHeader = page.getByRole('heading', { name: 'ログイン' }).first();
        await expect(loginFormHeader).toBeVisible({ timeout: 5000 });

        // メールアドレス入力欄が表示されることを確認
        const emailInput = page.locator('input[type="email"]').first();
        await expect(emailInput).toBeVisible({ timeout: 5000 });

        // パスワード入力欄が表示されることを確認
        const passwordInput = page.locator('input[type="password"]').first();
        await expect(passwordInput).toBeVisible({ timeout: 5000 });
    });

    test('キャンセルでポップアップ閉じる', async ({ page }) => {
        const { hasCoupons } = await openCouponList(page);

        if (!hasCoupons) {
            console.log('[Unauthenticated Test] No coupons available - test will fail');
            expect(hasCoupons, 'クーポンが存在する必要があります（テストデータの準備を確認してください）').toBeTruthy();
            return;
        }

        // 「このクーポンで乾杯！」ボタンをクリック
        const useCouponButton = page.getByRole('button', { name: 'このクーポンで乾杯！' }).first();
        await useCouponButton.click({ force: true });
        await page.waitForTimeout(1000);

        // ログイン誘導ポップアップが表示されることを確認
        const loginRequiredHeader = page.getByText('ログインしてください').first();
        await expect(loginRequiredHeader).toBeVisible({ timeout: 5000 });

        // 「キャンセル」ボタンをクリック
        const cancelButton = page.getByRole('button', { name: 'キャンセル' }).first();
        await cancelButton.click({ force: true });
        await page.waitForTimeout(1000);

        // ポップアップが閉じることを確認
        await expect(loginRequiredHeader).not.toBeVisible({ timeout: 5000 });
    });
});
