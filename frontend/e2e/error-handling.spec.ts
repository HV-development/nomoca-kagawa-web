import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * エラーハンドリングのE2Eテスト
 * 基本的なエラー状態のテスト
 */
test.describe('エラーハンドリング', () => {
  // ================================================================
  // 404エラーテスト
  // ================================================================
  test.describe('404エラー', () => {
    test('404ページ表示', async ({ page }) => {
      const response = await page.goto('/non-existent-page-12345');
      
      // 404ステータスまたはエラーページが表示されることを確認
      const status = response?.status();
      const is404 = status === 404;
      
      // 404ページまたはエラーコンテンツが表示されることを確認（必須要件）
      const pageContent = await page.locator('body').textContent() || '';
      const has404 = is404 || 
                     pageContent.includes('見つかりません') || 
                     pageContent.includes('Not Found') ||
                     pageContent.includes('404');
      expect(has404, '存在しないページへのアクセスで404エラーが表示されるべきです').toBeTruthy();

      await takeScreenshot(page, 'error-404');
    });
  });

  // ================================================================
  // 認証エラーテスト
  // ================================================================
  test.describe('認証エラー', () => {
    // 認証なしでテスト
    test.use({ storageState: { cookies: [], origins: [] } });

    test('未認証で保護ページリダイレクト', async ({ page }) => {
      await page.goto('/home');
      
      // ログインページにリダイレクト、またはログインフォームが表示される
      await page.waitForURL(/.*login.*|.*\/$/, { timeout: 10000 });
      
      // ログインページの要素を確認
      const loginHeading = page.getByRole('heading', { name: /ログイン/ });
      await expect(loginHeading).toBeVisible({ timeout: 5000 });
    });

    test('未認証でマイページリダイレクト', async ({ page }) => {
      await page.goto('/mypage');
      
      // ログインページにリダイレクト
      await page.waitForURL(/.*login.*|.*\/$/, { timeout: 10000 });
      
      // ログインページの要素を確認
      const loginHeading = page.getByRole('heading', { name: /ログイン/ });
      await expect(loginHeading).toBeVisible({ timeout: 5000 });
    });
  });

  // ================================================================
  // フォームエラーテスト
  // ================================================================
  test.describe('フォームエラー', () => {
    test('ログインバリデーションエラー', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      // 空のフォームを送信
      await page.getByRole('button', { name: /ログイン/i }).click();
      await page.waitForTimeout(500);

      // エラーメッセージが表示されることを確認（必須要件）
      const errorMessage = page.locator('.text-red-500, .text-red-600, [class*="error"]');
      await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
      await takeScreenshot(page, 'error-form-validation');
    });

    test('無効メールアドレスエラー', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const emailInput = page.getByPlaceholder('example@email.com')
        .or(page.locator('input[type="email"]'));
      await emailInput.fill('invalid-email');

      const passwordInput = page.getByPlaceholder(/パスワード/i)
        .or(page.locator('input[type="password"]'));
      await passwordInput.fill('password123');

      await page.getByRole('button', { name: /ログイン/i }).click();
      await page.waitForTimeout(500);

      // エラーメッセージが表示される、またはログインページにとどまる
      expect(page.url().includes('/login') || page.url().includes('/verify')).toBeTruthy();
    });
  });
});
