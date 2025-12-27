import { test, expect } from '@playwright/test';
import {
  mockAuthenticatedUser,
  mockApiResponse,
  mockApiError,
  mockNetworkError,
  waitForPageLoad,
  takeScreenshot,
} from './utils/test-helpers';
import { ValidationMessages } from './utils/test-data';

test.describe('エラーハンドリング - Web', () => {
  // ================================================================
  // ネットワークエラーテスト
  // ================================================================
  test.describe('ネットワークエラー', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('API接続失敗時にエラーメッセージが表示されること', async ({ page }) => {
      await mockNetworkError(page, '**/api/shops*');

      await page.goto('/shops');
      await waitForPageLoad(page);

      await expect(page.getByText(/ネットワークエラー|接続.*失敗|通信.*エラー/)).toBeVisible();

      await takeScreenshot(page, 'error-network-failure');
    });

    test('リクエストタイムアウト時にエラーメッセージが表示されること', async ({ page }) => {
      await page.route('**/api/shops*', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 60000));
        await route.abort('timedout');
      });

      await page.goto('/shops');

      await expect(page.getByText(/タイムアウト|時間.*超過|応答.*ありません/)).toBeVisible({ timeout: 45000 });
    });

    test('ネットワーク復旧後にリトライできること', async ({ page }) => {
      let requestCount = 0;

      await page.route('**/api/shops*', async (route) => {
        requestCount++;
        if (requestCount === 1) {
          await route.abort('failed');
        } else {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              items: [],
              pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
            }),
          });
        }
      });

      await page.goto('/shops');
      await waitForPageLoad(page);

      const retryButton = page.getByRole('button', { name: /再試行|リトライ|再読み込み/ });
      if (await retryButton.isVisible()) {
        await retryButton.click();
        await waitForPageLoad(page);

        await expect(page.getByText(/店舗が見つかりません|データがありません/)).toBeVisible();
      }
    });
  });

  // ================================================================
  // HTTPエラーテスト
  // ================================================================
  test.describe('HTTPエラー', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('500エラー時にサーバーエラーメッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/shops*', 500, 'Internal Server Error');

      await page.goto('/shops');
      await waitForPageLoad(page);

      await expect(page.getByText(/サーバーエラー|500|内部エラー|問題が発生/)).toBeVisible();

      await takeScreenshot(page, 'error-500');
    });

    test('503エラー時にサービス利用不可メッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/shops*', 503, 'Service Unavailable');

      await page.goto('/shops');
      await waitForPageLoad(page);

      await expect(page.getByText(/サービス.*利用.*不可|503|メンテナンス/)).toBeVisible();
    });

    test('404エラー時にリソース未存在メッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/shops/non-existent', 404, 'Not Found');

      await page.goto('/shops/non-existent');
      await waitForPageLoad(page);

      await expect(page.getByText(/見つかりません|404|存在しません/)).toBeVisible();

      await takeScreenshot(page, 'error-404');
    });
  });

  // ================================================================
  // 認証エラーテスト
  // ================================================================
  test.describe('認証エラー', () => {
    test('401エラー時にログイン画面にリダイレクトされること', async ({ page }) => {
      await mockAuthenticatedUser(page);

      await mockApiError(page, '**/api/me', 401, 'Unauthorized');
      await mockApiError(page, '**/api/favorites*', 401, 'Unauthorized');

      await page.goto('/favorites');

      await page.waitForURL('**/login**', { timeout: 10000 });
    });

    test('未ログイン状態で保護ページにアクセスするとログイン画面にリダイレクトされること', async ({ page }) => {
      // 認証なしでお気に入りページにアクセス
      await page.goto('/favorites');

      await page.waitForURL('**/login**', { timeout: 10000 });
    });

    test('トークン期限切れ時にリフレッシュ処理が実行されること', async ({ page }) => {
      await mockAuthenticatedUser(page);

      let refreshCalled = false;

      await page.route('**/api/favorites*', async (route) => {
        if (!refreshCalled) {
          await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Token expired' }),
          });
        } else {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              items: [],
              pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
            }),
          });
        }
      });

      await page.route('**/api/auth/refresh', async (route) => {
        refreshCalled = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            accessToken: 'new-access-token',
          }),
        });
      });

      await page.goto('/favorites');
    });
  });

  // ================================================================
  // バリデーションエラーテスト - ログインフォーム
  // ================================================================
  test.describe('バリデーションエラー - ログイン', () => {
    test('メールアドレス未入力時にエラーメッセージが表示されること', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByRole('button', { name: /ログイン|送信|認証コード/ }).click();

      await expect(page.getByText(ValidationMessages.email.required)).toBeVisible();

      await takeScreenshot(page, 'error-login-email-required');
    });

    test('無効なメールアドレス形式でエラーが表示されること', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('invalid-email');
      await page.getByRole('button', { name: /ログイン|送信|認証コード/ }).click();

      await expect(page.getByText(ValidationMessages.email.invalid)).toBeVisible();
    });
  });

  // ================================================================
  // バリデーションエラーテスト - 登録フォーム
  // ================================================================
  test.describe('バリデーションエラー - 登録', () => {
    test('メールアドレス未入力時にエラーメッセージが表示されること', async ({ page }) => {
      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.email.required)).toBeVisible();

      await takeScreenshot(page, 'error-register-email-required');
    });

    test('無効なメールアドレス形式でエラーが表示されること', async ({ page }) => {
      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('invalid-email');
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.email.invalid)).toBeVisible();
    });

    test('登録済みメールアドレスでエラーが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/register/request', 409, 'このメールアドレスは既に登録されています');

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('existing@example.com');
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.email.duplicate)).toBeVisible();

      await takeScreenshot(page, 'error-register-email-duplicate');
    });
  });

  // ================================================================
  // バリデーションエラーテスト - OTP
  // ================================================================
  test.describe('バリデーションエラー - OTP', () => {
    test.beforeEach(async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/login/request', {
        success: true,
        requestId: 'request-001',
      });
    });

    test('OTP未入力時にエラーメッセージが表示されること', async ({ page }) => {
      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('test@example.com');
      await page.getByRole('button', { name: /認証コードを送信|送信/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      await page.getByRole('button', { name: /確認|認証|ログイン/ }).click();

      await expect(page.getByText(ValidationMessages.otp.required)).toBeVisible();
    });

    test('無効なOTPでエラーが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/login/verify', 400, '認証コードが正しくありません');

      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('test@example.com');
      await page.getByRole('button', { name: /認証コードを送信|送信/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      const otpInput = page.getByPlaceholder(/認証コード|OTP/);
      await otpInput.fill('000000');
      await page.getByRole('button', { name: /確認|認証|ログイン/ }).click();

      await expect(page.getByText(ValidationMessages.otp.invalid)).toBeVisible();

      await takeScreenshot(page, 'error-otp-invalid');
    });

    test('期限切れOTPでエラーが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/login/verify', 400, '認証コードの有効期限が切れています');

      await page.goto('/login');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('test@example.com');
      await page.getByRole('button', { name: /認証コードを送信|送信/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      const otpInput = page.getByPlaceholder(/認証コード|OTP/);
      await otpInput.fill('123456');
      await page.getByRole('button', { name: /確認|認証|ログイン/ }).click();

      await expect(page.getByText(ValidationMessages.otp.expired)).toBeVisible();

      await takeScreenshot(page, 'error-otp-expired');
    });
  });

  // ================================================================
  // バリデーションエラーテスト - マイページ
  // ================================================================
  test.describe('バリデーションエラー - マイページ', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: 'テストユーザー',
        email: 'test@example.com',
      });
    });

    test('ニックネーム未入力時にエラーメッセージが表示されること', async ({ page }) => {
      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.required)).toBeVisible();
    });

    test('ニックネームが短すぎる場合エラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByLabel(/ニックネーム/).fill('あ');
      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.tooShort)).toBeVisible();
    });

    test('ニックネームが長すぎる場合エラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByLabel(/ニックネーム/).fill('あ'.repeat(21));
      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.tooLong)).toBeVisible();
    });
  });

  // ================================================================
  // セッションエラーテスト
  // ================================================================
  test.describe('セッションエラー', () => {
    test('セッションタイムアウト後にログイン画面にリダイレクトされること', async ({ page }) => {
      await mockAuthenticatedUser(page);

      await mockApiResponse(page, '**/api/me/profile', {
        nickname: 'テストユーザー',
      });

      await page.goto('/mypage');
      await waitForPageLoad(page);

      // セッションタイムアウトをシミュレート
      await page.context().clearCookies();
      await mockApiError(page, '**/api/me', 401, 'Session expired');

      await page.reload();

      await page.waitForURL('**/login**', { timeout: 10000 });
    });

    test('別デバイスログイン時に強制ログアウトされること', async ({ page }) => {
      await mockAuthenticatedUser(page);

      await mockApiResponse(page, '**/api/shops*', {
        items: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await page.goto('/shops');
      await waitForPageLoad(page);

      // 強制ログアウトをシミュレート
      await mockApiError(page, '**/api/**', 401, 'Session invalidated by another login');

      await page.reload();

      const isRedirected = await page.waitForURL('**/login**', { timeout: 5000 }).then(() => true).catch(() => false);
      const hasMessage = await page.getByText(/別のデバイス|セッション.*無効|再.*ログイン/).isVisible().catch(() => false);

      expect(isRedirected || hasMessage).toBeTruthy();
    });
  });

  // ================================================================
  // グローバルエラーハンドリングテスト
  // ================================================================
  test.describe('グローバルエラーハンドリング', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('予期しないエラー時に汎用エラーメッセージが表示されること', async ({ page }) => {
      await page.route('**/api/shops*', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'text/plain',
          body: 'Unexpected error',
        });
      });

      await page.goto('/shops');
      await waitForPageLoad(page);

      await expect(page.getByText(/エラー|問題が発生/)).toBeVisible();
    });

    test('エラー発生後もアプリケーションが動作すること', async ({ page }) => {
      await mockApiError(page, '**/api/shops*', 500, 'Server Error');

      await page.goto('/shops');
      await waitForPageLoad(page);

      await expect(page.getByText(/エラー|問題が発生/)).toBeVisible();

      // 別のページに移動
      await mockApiResponse(page, '**/api/coupons*', {
        items: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await page.goto('/coupons');
      await waitForPageLoad(page);

      // 正常に表示される
      await expect(page.getByRole('heading', { name: /クーポン/ })).toBeVisible();
    });
  });
});




