import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * 認証フローのE2Eテスト
 * 実際のアプリケーションの認証フローに沿ってテスト
 * 
 * 注意: OTP認証を伴うテストは auth.setup.ts で実行されるため、
 * ここでは基本的なUI表示と入力バリデーションのテストのみ行う
 */
test.describe('認証フローのテスト', () => {
  // OTP検証の競合を避けるため、このテストスイートは順次実行
  test.describe.configure({ mode: 'serial' });

  // ================================================================
  // ログインページ表示テスト
  // ================================================================
  test.describe('ログインページ表示', () => {
    test('ログインページ表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      // ログインページの主要要素が表示されることを確認
      await expect(page.getByRole('heading', { name: /ログイン/ })).toBeVisible();
      
      await takeScreenshot(page, 'login-page');
    });

    test('メール入力欄表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const emailInput = page.getByPlaceholder('example@email.com')
        .or(page.getByLabel(/メール/i))
        .or(page.locator('input[type="email"]'));

      await expect(emailInput).toBeVisible();
    });

    test('パスワード入力欄表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const passwordInput = page.getByPlaceholder(/パスワード/i)
        .or(page.getByLabel(/パスワード/i))
        .or(page.locator('input[type="password"]'));

      await expect(passwordInput).toBeVisible();
    });

    test('ログインボタン表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const loginButton = page.getByRole('button', { name: /ログイン/i });
      await expect(loginButton).toBeVisible();
    });
  });

  // ================================================================
  // バリデーションテスト
  // ================================================================
  test.describe('入力バリデーション', () => {
    test('空フォーム送信エラー', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByRole('button', { name: /ログイン/i }).click();

      // エラーメッセージが表示されることを確認
      const errorMessage = page.locator('.text-red-500, .text-red-600, [class*="error"]');
      
      // エラーメッセージが表示されることを確認（必須要件）
      await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('無効メール形式エラー', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const emailInput = page.getByPlaceholder('example@email.com')
        .or(page.locator('input[type="email"]'));
      await emailInput.fill('invalid-email');

      await page.getByRole('button', { name: /ログイン/i }).click();
      await page.waitForTimeout(500);

      // エラーメッセージが表示されることを確認（必須要件）
      const errorMessage = page.locator('.text-red-500, .text-red-600, [class*="error"]');
      await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });
  });

  // ================================================================
  // ナビゲーションテスト
  // ================================================================
  test.describe('ナビゲーション', () => {
    test('新規登録リンク表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const registerLink = page.getByRole('link', { name: /新規登録|会員登録|登録/ })
        .or(page.getByRole('button', { name: /新規登録|会員登録|登録/ }))
        .or(page.locator('a[href*="register"], a[href*="email-registration"]'));

      await expect(registerLink.first()).toBeVisible({ timeout: 5000 });
      
      // 新規登録リンクがあるかどうかを確認
      await takeScreenshot(page, 'login-page-navigation');
    });

    test('パスワードリセットリンク表示', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      const resetLink = page.getByRole('link', { name: /パスワード.*忘れ|リセット|再設定/ })
        .or(page.getByRole('button', { name: /パスワード.*忘れ|リセット|再設定/ }))
        .or(page.locator('a[href*="reset"], a[href*="forgot"]'));

      await expect(resetLink.first()).toBeVisible({ timeout: 5000 });
      
      // パスワードリセットリンクの有無を確認
      await takeScreenshot(page, 'login-page-links');
    });
  });
});
