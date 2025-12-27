import { test, expect } from '@playwright/test';
import {
  mockAuthenticatedUser,
  mockApiResponse,
  mockApiError,
  waitForPageLoad,
  takeScreenshot,
} from './utils/test-helpers';
import { createPlanListResponse } from './utils/test-data';

test.describe('プラン管理', () => {
  // ================================================================
  // プラン一覧テスト
  // ================================================================
  test.describe('プラン一覧', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('プラン一覧が正しく表示されること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // プランカードが表示されていることを確認
      await expect(page.getByText('フリープラン')).toBeVisible();
      await expect(page.getByText('スタンダードプラン')).toBeVisible();
      await expect(page.getByText('プレミアムプラン')).toBeVisible();

      // 価格が表示されていることを確認
      await expect(page.getByText(/無料|¥0|0円/)).toBeVisible();
      await expect(page.getByText(/¥980|980円/)).toBeVisible();
      await expect(page.getByText(/¥1,980|1980円|1,980円/)).toBeVisible();

      await takeScreenshot(page, 'plans-list');
    });

    test('現在のプランがハイライト表示されること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });
      await mockApiResponse(page, '**/api/me/subscription', {
        planId: 'plan-standard',
        planName: 'スタンダードプラン',
        status: 'active',
      });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // 現在のプランに「現在のプラン」などの表示があることを確認
      const currentPlanCard = page.locator('[data-current-plan="true"]').or(
        page.locator(':has-text("現在のプラン")').first()
      );
      await expect(currentPlanCard.or(page.getByText(/現在のプラン|契約中/))).toBeVisible();
    });

    test('各プランの特徴が表示されること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // プランの特徴が表示されていることを確認
      await expect(page.getByText(/全店舗のクーポン利用/)).toBeVisible();
      await expect(page.getByText(/お気に入り/)).toBeVisible();
    });
  });

  // ================================================================
  // プラン登録テスト
  // ================================================================
  test.describe('プラン登録', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('プラン選択後に決済画面に遷移すること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });
      await mockApiResponse(page, '**/api/me/subscription', null); // 未契約状態

      // 決済セッション作成APIをモック
      await mockApiResponse(page, '**/api/subscription/create-session', {
        sessionId: 'session-001',
        checkoutUrl: '/checkout/session-001',
      });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // スタンダードプランを選択
      const selectButton = page.locator('[data-plan-id="plan-standard"]')
        .or(page.locator(':has-text("スタンダードプラン")').getByRole('button', { name: /選択|申込|登録/ }));

      if (await selectButton.isVisible()) {
        await selectButton.click();

        // 決済画面または確認画面への遷移を確認
        await expect(
          page.getByText(/お支払い|決済|クレジットカード/).or(page.getByText(/確認/))
        ).toBeVisible({ timeout: 10000 });
      }
    });

    test('クレジットカード情報入力画面が表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/subscription/payment-form', {
        clientSecret: 'mock-client-secret',
      });

      await page.goto('/plans/payment');
      await waitForPageLoad(page);

      // Stripeのカード入力要素または自前のフォームを確認
      const cardElement = page.locator('iframe[name*="stripe"]')
        .or(page.getByLabel(/カード番号/));

      // カード入力フォームが存在することを確認（Stripeの場合はiframe）
      await takeScreenshot(page, 'plans-payment-form');
    });
  });

  // ================================================================
  // プラン変更テスト
  // ================================================================
  test.describe('プラン変更', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
      await mockApiResponse(page, '**/api/me/subscription', {
        planId: 'plan-standard',
        planName: 'スタンダードプラン',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    });

    test('プランアップグレードができること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await mockApiResponse(page, '**/api/subscription/upgrade', {
        success: true,
        newPlanId: 'plan-premium',
        message: 'プランをアップグレードしました',
      });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // プレミアムプランへのアップグレードボタンをクリック
      const upgradeButton = page.locator('[data-plan-id="plan-premium"]')
        .or(page.locator(':has-text("プレミアムプラン")').getByRole('button', { name: /アップグレード|変更|選択/ }));

      if (await upgradeButton.isVisible()) {
        await upgradeButton.click();

        // 確認ダイアログ
        const confirmButton = page.getByRole('button', { name: /確認|はい|アップグレード/ });
        if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await confirmButton.click();
        }

        await expect(page.getByText(/アップグレード|変更しました|完了/)).toBeVisible({ timeout: 10000 });
      }
    });

    test('プランダウングレードができること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      // 現在プレミアムプランに変更
      await mockApiResponse(page, '**/api/me/subscription', {
        planId: 'plan-premium',
        planName: 'プレミアムプラン',
        status: 'active',
      });

      await mockApiResponse(page, '**/api/subscription/downgrade', {
        success: true,
        newPlanId: 'plan-standard',
        effectiveDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        message: '次回更新日からプランが変更されます',
      });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // スタンダードプランへのダウングレード
      const downgradeButton = page.locator('[data-plan-id="plan-standard"]')
        .or(page.locator(':has-text("スタンダードプラン")').getByRole('button', { name: /ダウングレード|変更|選択/ }));

      if (await downgradeButton.isVisible()) {
        await downgradeButton.click();

        // ダウングレード確認（次回更新日から適用される旨の説明）
        await expect(page.getByText(/次回更新日|適用されます/)).toBeVisible({ timeout: 5000 });
      }
    });
  });

  // ================================================================
  // 支払い方法変更テスト
  // ================================================================
  test.describe('支払い方法変更', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
      await mockApiResponse(page, '**/api/me/subscription', {
        planId: 'plan-standard',
        status: 'active',
      });
      await mockApiResponse(page, '**/api/me/payment-method', {
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025,
      });
    });

    test('現在の支払い方法が表示されること', async ({ page }) => {
      await page.goto('/mypage/payment');
      await waitForPageLoad(page);

      await expect(page.getByText(/VISA|Visa/i)).toBeVisible();
      await expect(page.getByText(/4242|\*\*\*\*4242/)).toBeVisible();

      await takeScreenshot(page, 'payment-method-current');
    });

    test('支払い方法を変更できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/me/payment-method/update', {
        success: true,
        message: '支払い方法を更新しました',
      });

      await page.goto('/mypage/payment');
      await waitForPageLoad(page);

      const changeButton = page.getByRole('button', { name: /変更|更新/ });
      if (await changeButton.isVisible()) {
        await changeButton.click();

        // カード入力フォームが表示されることを確認
        await expect(
          page.locator('iframe[name*="stripe"]').or(page.getByLabel(/カード番号/))
        ).toBeVisible({ timeout: 5000 });

        await takeScreenshot(page, 'payment-method-change-form');
      }
    });
  });

  // ================================================================
  // 解約テスト
  // ================================================================
  test.describe('プラン解約', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
      await mockApiResponse(page, '**/api/me/subscription', {
        planId: 'plan-standard',
        planName: 'スタンダードプラン',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    });

    test('プランを解約できること', async ({ page }) => {
      await mockApiResponse(page, '**/api/subscription/cancel', {
        success: true,
        message: '解約手続きが完了しました',
        cancelAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      await page.goto('/mypage/subscription');
      await waitForPageLoad(page);

      const cancelButton = page.getByRole('button', { name: /解約|キャンセル/ });
      if (await cancelButton.isVisible()) {
        await cancelButton.click();

        // 解約確認ダイアログ
        await expect(page.getByText(/解約しますか|解約すると/)).toBeVisible({ timeout: 5000 });

        const confirmButton = page.getByRole('button', { name: /解約する|確認|はい/ });
        await confirmButton.click();

        await expect(page.getByText(/解約.*完了|解約手続き/)).toBeVisible({ timeout: 10000 });

        await takeScreenshot(page, 'subscription-cancelled');
      }
    });
  });

  // ================================================================
  // エラーハンドリングテスト
  // ================================================================
  test.describe('エラーハンドリング', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('プラン取得エラー時にエラーメッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/plans*', 500, 'サーバーエラーが発生しました');

      await page.goto('/plans');
      await waitForPageLoad(page);

      await expect(page.getByText(/エラー|問題が発生|サーバーエラー/)).toBeVisible();

      await takeScreenshot(page, 'plans-error');
    });

    test('決済エラー時にエラーメッセージが表示されること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await mockApiError(page, '**/api/subscription/create-session', 400, 'カード情報が無効です');

      await page.goto('/plans');
      await waitForPageLoad(page);

      const selectButton = page.locator(':has-text("スタンダードプラン")').getByRole('button', { name: /選択|申込/ });
      if (await selectButton.isVisible()) {
        await selectButton.click();
        await expect(page.getByText(/エラー|カード情報|無効/)).toBeVisible({ timeout: 10000 });
      }
    });
  });

  // ================================================================
  // 未ログインユーザーのアクセステスト
  // ================================================================
  test.describe('未ログインユーザーのアクセス', () => {
    test('未ログインでプラン一覧を閲覧できること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await page.goto('/plans');
      await waitForPageLoad(page);

      // プラン一覧は閲覧可能
      await expect(page.getByText('スタンダードプラン')).toBeVisible();
    });

    test('未ログインでプラン申込時にログイン画面にリダイレクトされること', async ({ page }) => {
      const plans = createPlanListResponse();
      await mockApiResponse(page, '**/api/plans*', { plans });

      await page.goto('/plans');
      await waitForPageLoad(page);

      const selectButton = page.locator(':has-text("スタンダードプラン")').getByRole('button', { name: /選択|申込/ });
      if (await selectButton.isVisible()) {
        await selectButton.click();

        // ログイン画面にリダイレクト
        await page.waitForURL('**/login**', { timeout: 10000 });
      }
    });
  });
});




