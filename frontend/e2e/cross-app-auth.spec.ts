import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * クロスアプリケーション認証テスト（nomoca-kagawa-web用）
 * 
 * 他アプリケーションのアカウントでログインできないことを確認
 * - tamanomi-webで登録したアカウントでnomoca-kagawa-webにログインできないこと
 * 
 * ※ nomocaアカウントでtamanomiにログインできないテストはtamanomi-webのE2Eテストで実行
 */
test.describe('クロスアプリ認証', () => {
  // テストは順次実行
  test.describe.configure({ mode: 'serial' });

  // tamanomi-web のテストユーザー（既存）
  const TAMANOMI_USER = {
    email: 'tamanomi-user@example.com',
    password: 'tamanomi-user123',
  };

  // ================================================================
  // アプリケーション分離テスト
  // ================================================================
  test.describe('アプリ分離', () => {
    test('tamanomiアカウントでnomocaログイン不可', async ({ page }) => {
      // nomoca-kagawa-webのログインページに移動
      await page.goto('/login');
      await waitForPageLoad(page);

      // ログインフォームが表示されるまで待機
      await page.waitForSelector('input[type="email"], input[placeholder*="email"], input[placeholder*="メール"]', { timeout: 15000 });

      // tamanomi-webのユーザー情報でログインを試行
      const emailInput = page.getByPlaceholder('example@email.com')
        .or(page.locator('input[type="email"]'));
      const passwordInput = page.getByPlaceholder(/パスワード/i)
        .or(page.locator('input[type="password"]'));

      await emailInput.fill(TAMANOMI_USER.email);
      await passwordInput.fill(TAMANOMI_USER.password);

      // ログインボタンをクリック
      const loginButton = page.getByRole('button', { name: /ログイン/i });
      await loginButton.click();

      // 5秒待ってからチェック
      await page.waitForTimeout(5000);

      const currentUrl = page.url();
      
      await takeScreenshot(page, 'tamanomi-user-cannot-login-nomoca');

      // OTPページに遷移していないことを確認（アプリケーション分離が機能している証拠）
      const isOnOtpPage = currentUrl.includes('/verify-otp') || currentUrl.includes('/otp');
      expect(isOnOtpPage, 'OTPページに遷移してはいけません（アプリケーション分離が機能していません）').toBeFalsy();
      
      // ログインページに留まっているか、エラーが表示されていることを確認
      const isStillOnLogin = currentUrl.includes('/login');
      const hasError = await page.locator('text=/エラー|失敗|見つかりません|登録されていません|無効|正しくありません/i').isVisible().catch(() => false);
      
      expect(isStillOnLogin || hasError, 'ログインページに留まるか、エラーが表示されるべきです').toBeTruthy();
    });
  });
});
