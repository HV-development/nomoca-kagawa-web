import { test, expect } from '@playwright/test';
import {
  mockAuthenticatedUser,
  mockApiResponse,
  mockApiError,
  waitForPageLoad,
  takeScreenshot,
  goToMypage,
} from './utils/test-helpers';
import {
  createUserData,
  createUsageHistoryListResponse,
  ValidationMessages,
} from './utils/test-data';

test.describe('マイページ', () => {
  // ================================================================
  // プロフィール表示テスト
  // ================================================================
  test.describe('プロフィール表示', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page, {
        nickname: 'テストユーザー',
        email: 'test@example.com',
        rank: 2,
      });
    });

    test('プロフィール情報が正しく表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: 'テストユーザー',
        email: 'test@example.com',
        rank: 2,
        rankName: 'シルバー',
        postalCode: '760-0001',
        prefecture: '香川県',
        city: '高松市',
        registeredAt: '2024-01-01T00:00:00Z',
      });

      await page.goto('/mypage');
      await waitForPageLoad(page);

      await expect(page.getByText('テストユーザー')).toBeVisible();
      await expect(page.getByText('test@example.com')).toBeVisible();
      await expect(page.getByText(/シルバー|ランク2/)).toBeVisible();

      await takeScreenshot(page, 'mypage-profile');
    });

    test('会員ランクが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: 'テストユーザー',
        rank: 3,
        rankName: 'ゴールド',
      });

      await page.goto('/mypage');
      await waitForPageLoad(page);

      await expect(page.getByText(/ゴールド|ランク3/)).toBeVisible();
    });
  });

  // ================================================================
  // プロフィール編集テスト
  // ================================================================
  test.describe('プロフィール編集', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: '編集前ユーザー',
        email: 'before@example.com',
        postalCode: '760-0001',
      });
    });

    test('ニックネームを変更できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: '編集後ユーザー',
        email: 'before@example.com',
      });

      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByLabel(/ニックネーム/).fill('編集後ユーザー');

      await takeScreenshot(page, 'mypage-edit-form');

      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(/更新しました|保存しました/)).toBeVisible({ timeout: 10000 });
    });

    test('ニックネームのバリデーションエラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(ValidationMessages.nickname.required)).toBeVisible();
    });

    test('郵便番号を変更できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: '編集前ユーザー',
        postalCode: '760-0002',
      });

      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      const postalCodeInput = page.getByLabel(/郵便番号/);
      if (await postalCodeInput.isVisible()) {
        await postalCodeInput.clear();
        await postalCodeInput.fill('760-0002');

        await page.getByRole('button', { name: /保存|更新/ }).click();
        await expect(page.getByText(/更新しました|保存しました/)).toBeVisible({ timeout: 10000 });
      }
    });
  });

  // ================================================================
  // メールアドレス変更テスト
  // ================================================================
  test.describe('メールアドレス変更', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page, {
        email: 'old@example.com',
      });
    });

    test('メールアドレス変更フローが開始できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/email/change-request', {
        success: true,
        message: '確認メールを送信しました',
      });

      await page.goto('/mypage/email');
      await waitForPageLoad(page);

      await expect(page.getByText('old@example.com')).toBeVisible();

      await page.getByLabel(/新しいメールアドレス/).fill('new@example.com');
      await page.getByRole('button', { name: /変更|送信/ }).click();

      await expect(page.getByText(/確認メール|送信しました/)).toBeVisible({ timeout: 10000 });

      await takeScreenshot(page, 'mypage-email-change');
    });

    test('無効なメールアドレス形式でエラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/email');
      await waitForPageLoad(page);

      await page.getByLabel(/新しいメールアドレス/).fill('invalid-email');
      await page.getByRole('button', { name: /変更|送信/ }).click();

      await expect(page.getByText(ValidationMessages.email.invalid)).toBeVisible();
    });
  });

  // ================================================================
  // パスワード変更テスト
  // ================================================================
  test.describe('パスワード変更', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('パスワードを変更できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/password', {
        success: true,
        message: 'パスワードを変更しました',
      });

      await page.goto('/mypage/password');
      await waitForPageLoad(page);

      // 現在のパスワード（存在する場合）
      const currentPasswordInput = page.getByLabel(/現在のパスワード/);
      if (await currentPasswordInput.isVisible()) {
        await currentPasswordInput.fill('OldPassword123!');
      }

      await page.getByLabel(/新しいパスワード/).first().fill('NewPassword123!');

      // パスワード確認
      const confirmPasswordInput = page.getByLabel(/パスワード確認|新しいパスワード（確認）/);
      if (await confirmPasswordInput.isVisible()) {
        await confirmPasswordInput.fill('NewPassword123!');
      }

      await page.getByRole('button', { name: /変更|更新/ }).click();

      await expect(page.getByText(/変更しました|更新しました/)).toBeVisible({ timeout: 10000 });

      await takeScreenshot(page, 'mypage-password-changed');
    });

    test('パスワードが一致しない場合エラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/password');
      await waitForPageLoad(page);

      await page.getByLabel(/新しいパスワード/).first().fill('NewPassword123!');

      const confirmPasswordInput = page.getByLabel(/パスワード確認|新しいパスワード（確認）/);
      if (await confirmPasswordInput.isVisible()) {
        await confirmPasswordInput.fill('DifferentPassword123!');
      }

      await page.getByRole('button', { name: /変更|更新/ }).click();

      await expect(page.getByText(ValidationMessages.password.mismatch)).toBeVisible();
    });

    test('弱いパスワードでエラーが表示されること', async ({ page }) => {
      await page.goto('/mypage/password');
      await waitForPageLoad(page);

      await page.getByLabel(/新しいパスワード/).first().fill('weak');

      await page.getByRole('button', { name: /変更|更新/ }).click();

      await expect(page.getByText(ValidationMessages.password.tooShort)).toBeVisible();
    });
  });

  // ================================================================
  // 利用履歴テスト
  // ================================================================
  test.describe('利用履歴', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('クーポン利用履歴が表示されること', async ({ page }) => {
      const usageHistory = createUsageHistoryListResponse(5);
      await mockApiResponse(page, '**/api/me/usage-history*', usageHistory);

      await page.goto('/mypage/history');
      await waitForPageLoad(page);

      // 履歴が表示されていることを確認
      const historyItems = page.locator('[data-history-item]').or(
        page.locator('table tbody tr')
      );

      await expect(historyItems).toHaveCount(5);

      await takeScreenshot(page, 'mypage-usage-history');
    });

    test('利用履歴が空の場合メッセージが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/usage-history*', {
        items: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await page.goto('/mypage/history');
      await waitForPageLoad(page);

      await expect(page.getByText(/利用履歴がありません|データがありません/)).toBeVisible();
    });
  });

  // ================================================================
  // 支払い履歴テスト
  // ================================================================
  test.describe('支払い履歴', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('支払い履歴が表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/payment-history*', {
        items: [
          {
            id: 'payment-001',
            amount: 980,
            planName: 'スタンダードプラン',
            paidAt: '2024-06-01T00:00:00Z',
            status: 'completed',
          },
          {
            id: 'payment-002',
            amount: 980,
            planName: 'スタンダードプラン',
            paidAt: '2024-05-01T00:00:00Z',
            status: 'completed',
          },
        ],
        pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });

      await page.goto('/mypage/payments');
      await waitForPageLoad(page);

      await expect(page.getByText('スタンダードプラン')).toBeVisible();
      await expect(page.getByText(/¥980|980円/)).toBeVisible();

      await takeScreenshot(page, 'mypage-payment-history');
    });

    test('支払い履歴が空の場合メッセージが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/payment-history*', {
        items: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await page.goto('/mypage/payments');
      await waitForPageLoad(page);

      await expect(page.getByText(/支払い履歴がありません|データがありません/)).toBeVisible();
    });
  });

  // ================================================================
  // ログアウトテスト
  // ================================================================
  test.describe('ログアウト', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('ログアウトできること', async ({ page }) => {
      await mockApiResponse(page, '**/api/auth/logout', {
        success: true,
      });

      await page.goto('/mypage');
      await waitForPageLoad(page);

      const logoutButton = page.getByRole('button', { name: /ログアウト/ })
        .or(page.getByRole('link', { name: /ログアウト/ }));

      await logoutButton.click();

      // 確認ダイアログ（存在する場合）
      const confirmButton = page.getByRole('button', { name: /確認|はい|ログアウト/ });
      if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await confirmButton.click();
      }

      // ログインページにリダイレクト
      await page.waitForURL('**/login**', { timeout: 10000 });
    });
  });

  // ================================================================
  // エラーハンドリングテスト
  // ================================================================
  test.describe('エラーハンドリング', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('プロフィール取得エラー時にエラーメッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/me/profile', 500, 'サーバーエラーが発生しました');

      await page.goto('/mypage');
      await waitForPageLoad(page);

      await expect(page.getByText(/エラー|問題が発生|サーバーエラー/)).toBeVisible();

      await takeScreenshot(page, 'mypage-error');
    });

    test('プロフィール更新エラー時にエラーメッセージが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/profile', {
        nickname: '編集前ユーザー',
      });
      await mockApiError(page, '**/api/me/profile', 400, '更新に失敗しました');

      await page.goto('/mypage/edit');
      await waitForPageLoad(page);

      await page.getByLabel(/ニックネーム/).clear();
      await page.getByLabel(/ニックネーム/).fill('新しいニックネーム');
      await page.getByRole('button', { name: /保存|更新/ }).click();

      await expect(page.getByText(/エラー|更新に失敗/)).toBeVisible({ timeout: 10000 });
    });
  });

  // ================================================================
  // 未ログインユーザーのアクセステスト
  // ================================================================
  test.describe('未ログインユーザーのアクセス', () => {
    test('未ログインでマイページにアクセスするとログイン画面にリダイレクトされること', async ({ page }) => {
      await page.goto('/mypage');

      // ログイン画面にリダイレクト
      await page.waitForURL('**/login**', { timeout: 10000 });
    });

    test('未ログインでプロフィール編集にアクセスするとログイン画面にリダイレクトされること', async ({ page }) => {
      await page.goto('/mypage/edit');

      await page.waitForURL('**/login**', { timeout: 10000 });
    });
  });
});




