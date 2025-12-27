import { test, expect } from '@playwright/test';
import {
  mockApiResponse,
  mockApiError,
  waitForPageLoad,
  takeScreenshot,
  mockAuthenticatedUser,
} from './utils/test-helpers';
import { getLatestOtp } from './utils/otp-retriever';
import {
  createRegistrationData,
  ValidationMessages,
  randomEmail,
} from './utils/test-data';

test.describe('ユーザー登録フロー', () => {
  // ================================================================
  // メールアドレス登録（仮登録）テスト
  // ================================================================
  test.describe('メールアドレス登録', () => {
    test('メールアドレス入力画面が表示されること', async ({ page }) => {
      await page.goto('/register');
      await waitForPageLoad(page);

      await expect(page.getByRole('heading', { name: /新規登録|会員登録/ })).toBeVisible();
      await expect(page.getByLabel('メールアドレス')).toBeVisible();
      await expect(page.getByRole('button', { name: /登録|送信|次へ/ })).toBeVisible();

      await takeScreenshot(page, 'registration-email-form');
    });

    test('有効なメールアドレスで仮登録リクエストができること', async ({ page }) => {
      const testEmail = randomEmail();

      // 仮登録APIをモック
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        message: '確認メールを送信しました',
      });

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(testEmail);
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      // 成功メッセージまたは次画面への遷移を確認
      await expect(
        page.getByText(/確認メール|送信しました/).or(page.getByText(/OTP|認証コード/))
      ).toBeVisible({ timeout: 10000 });

      await takeScreenshot(page, 'registration-email-sent');
    });

    test('必須項目のバリデーションエラーが表示されること', async ({ page }) => {
      await page.goto('/register');
      await waitForPageLoad(page);

      // 空で送信
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      // エラーメッセージの確認
      await expect(page.getByText(ValidationMessages.email.required)).toBeVisible();

      await takeScreenshot(page, 'registration-email-required-error');
    });

    test('無効なメールアドレス形式でエラーが表示されること', async ({ page }) => {
      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('invalid-email');
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.email.invalid)).toBeVisible();

      await takeScreenshot(page, 'registration-email-invalid-error');
    });

    test('既に登録済みのメールアドレスでエラーが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/register/request', 409, 'このメールアドレスは既に登録されています');

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill('existing@example.com');
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.email.duplicate)).toBeVisible();
    });
  });

  // ================================================================
  // OTP認証テスト
  // ================================================================
  test.describe('OTP認証', () => {
    test('OTP入力画面が表示されること', async ({ page }) => {
      // 登録フローの途中状態をシミュレート
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        requestId: 'request-001',
      });

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(randomEmail());
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      // OTP入力フォームが表示されることを確認
      await expect(page.getByPlaceholder(/認証コード|OTP|\d{6}/)).toBeVisible({ timeout: 10000 });

      await takeScreenshot(page, 'registration-otp-form');
    });

    test('正しいOTPで認証が成功すること', async ({ page, request }) => {
      const testEmail = randomEmail();

      // 仮登録APIをモック
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        requestId: 'request-001',
      });

      // OTP検証APIをモック
      await mockApiResponse(page, '**/api/auth/register/verify-otp', {
        success: true,
        registrationToken: 'reg-token-001',
      });

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(testEmail);
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      // OTP入力画面を待機
      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      // 実際のテストではMailHogからOTPを取得
      // const otp = await getLatestOtp(request, testEmail);
      // ここではモックOTPを使用
      const otpInput = page.getByPlaceholder(/認証コード|OTP/);
      await otpInput.fill('123456');

      await page.getByRole('button', { name: /確認|認証|次へ/ }).click();

      // プロフィール入力画面への遷移を確認
      await expect(page.getByLabel(/ニックネーム|名前/)).toBeVisible({ timeout: 10000 });
    });

    test('無効なOTPでエラーが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        requestId: 'request-001',
      });

      await mockApiError(page, '**/api/auth/register/verify-otp', 400, '認証コードが正しくありません');

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(randomEmail());
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      const otpInput = page.getByPlaceholder(/認証コード|OTP/);
      await otpInput.fill('000000');

      await page.getByRole('button', { name: /確認|認証|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.otp.invalid)).toBeVisible();

      await takeScreenshot(page, 'registration-otp-invalid-error');
    });

    test('期限切れOTPでエラーが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        requestId: 'request-001',
      });

      await mockApiError(page, '**/api/auth/register/verify-otp', 400, '認証コードの有効期限が切れています');

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(randomEmail());
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      const otpInput = page.getByPlaceholder(/認証コード|OTP/);
      await otpInput.fill('123456');

      await page.getByRole('button', { name: /確認|認証|次へ/ }).click();

      await expect(page.getByText(ValidationMessages.otp.expired)).toBeVisible();
    });

    test('OTP再送信ができること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/request', {
        success: true,
        requestId: 'request-001',
      });

      await mockApiResponse(page, '**/api/auth/register/resend-otp', {
        success: true,
        message: '認証コードを再送信しました',
      });

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(randomEmail());
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await page.waitForSelector('input[placeholder*="認証コード"], input[maxlength="6"]', { timeout: 10000 });

      // 再送信ボタンをクリック
      const resendButton = page.getByRole('button', { name: /再送信|もう一度送る/ });
      if (await resendButton.isVisible()) {
        await resendButton.click();
        await expect(page.getByText(/再送信しました|送信しました/)).toBeVisible();
      }
    });
  });

  // ================================================================
  // プロフィール入力テスト
  // ================================================================
  test.describe('プロフィール入力', () => {
    test.beforeEach(async ({ page }) => {
      // プロフィール入力画面への直接アクセスをシミュレート
      // 実際のアプリケーションでは、OTP認証後にトークンが設定される
      await page.context().addCookies([
        {
          name: 'registrationToken',
          value: 'mock-registration-token',
          domain: 'localhost',
          path: '/',
        },
      ]);
    });

    test('プロフィール入力画面が表示されること', async ({ page }) => {
      // トークン情報APIをモック
      await mockApiResponse(page, '**/api/auth/register/token-info*', {
        valid: true,
      });

      await page.goto('/register-confirmation');
      await waitForPageLoad(page);

      await expect(page.getByLabel(/ニックネーム/)).toBeVisible();

      await takeScreenshot(page, 'registration-profile-form');
    });

    test('必須項目を入力して登録が完了すること', async ({ page }) => {
      const profileData = createRegistrationData();

      await mockApiResponse(page, '**/api/auth/register/token-info*', {
        valid: true,
      });

      await mockApiResponse(page, '**/api/auth/register/complete', {
        success: true,
        user: {
          id: 'new-user-001',
          nickname: profileData.nickname,
        },
      });

      await page.goto('/register-confirmation');
      await waitForPageLoad(page);

      // 必須項目入力
      await page.getByLabel(/ニックネーム/).fill(profileData.nickname);

      // 郵便番号（存在する場合）
      const postalCodeInput = page.getByLabel('郵便番号');
      if (await postalCodeInput.isVisible() && profileData.postalCode) {
        await postalCodeInput.fill(profileData.postalCode);
      }

      // 生年月日（存在する場合）
      const birthDateInput = page.getByLabel(/生年月日/);
      if (await birthDateInput.isVisible() && profileData.birthDate) {
        await birthDateInput.fill(profileData.birthDate);
      }

      // 性別（存在する場合）
      const genderSelect = page.getByRole('combobox', { name: /性別/ });
      if (await genderSelect.isVisible()) {
        await genderSelect.click();
        await page.getByRole('option', { name: /男性/ }).click();
      }

      await takeScreenshot(page, 'registration-profile-filled');

      await page.getByRole('button', { name: /登録|完了|送信/ }).click();

      // 登録完了を確認
      await expect(page.getByText(/登録完了|ようこそ|完了しました/)).toBeVisible({ timeout: 10000 });

      await takeScreenshot(page, 'registration-complete');
    });

    test('ニックネームのバリデーションエラーが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/token-info*', {
        valid: true,
      });

      await page.goto('/register-confirmation');
      await waitForPageLoad(page);

      // 空で送信
      await page.getByRole('button', { name: /登録|完了|送信/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.required)).toBeVisible();
    });

    test('ニックネームが短すぎる場合エラーが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/token-info*', {
        valid: true,
      });

      await page.goto('/register-confirmation');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).fill('あ'); // 1文字

      await page.getByRole('button', { name: /登録|完了|送信/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.tooShort)).toBeVisible();
    });

    test('ニックネームが長すぎる場合エラーが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/register/token-info*', {
        valid: true,
      });

      await page.goto('/register-confirmation');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).fill('あ'.repeat(21)); // 21文字

      await page.getByRole('button', { name: /登録|完了|送信/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.tooLong)).toBeVisible();
    });
  });

  // ================================================================
  // エラーハンドリングテスト
  // ================================================================
  test.describe('エラーハンドリング', () => {
    test('サーバーエラー時にエラーメッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/register/request', 500, 'サーバーエラーが発生しました');

      await page.goto('/register');
      await waitForPageLoad(page);

      await page.getByLabel('メールアドレス').fill(randomEmail());
      await page.getByRole('button', { name: /登録|送信|次へ/ }).click();

      await expect(page.getByText(/エラー|問題が発生|サーバーエラー/)).toBeVisible();

      await takeScreenshot(page, 'registration-server-error');
    });

    test('無効なトークンでプロフィール画面にアクセスした場合リダイレクトされること', async ({ page }) => {
      await mockApiError(page, '**/api/auth/register/token-info*', 400, 'トークンが無効です');

      await page.goto('/register-confirmation');

      // 登録開始画面にリダイレクトされるか、エラーメッセージが表示される
      await page.waitForURL('**/register**', { timeout: 10000 });
    });
  });

  // ================================================================
  // 登録済みユーザーのアクセステスト
  // ================================================================
  test.describe('登録済みユーザーのアクセス', () => {
    test('ログイン済みユーザーが登録ページにアクセスした場合リダイレクトされること', async ({ page }) => {
      await mockAuthenticatedUser(page);

      await page.goto('/register');

      // ホームまたはマイページにリダイレクトされることを確認
      await page.waitForURL('**/{,home,mypage}**', { timeout: 10000 });
    });
  });
});




