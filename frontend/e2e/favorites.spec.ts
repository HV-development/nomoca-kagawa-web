import { test, expect } from '@playwright/test';
import {
  mockAuthenticatedUser,
  mockApiResponse,
  mockApiError,
  waitForPageLoad,
  takeScreenshot,
  goToShopList,
} from './utils/test-helpers';
import {
  createShopMockData,
  createShopListResponse,
  createFavoriteListResponse,
} from './utils/test-data';

test.describe('お気に入り機能', () => {
  // ================================================================
  // お気に入り追加テスト
  // ================================================================
  test.describe('お気に入り追加', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('店舗詳細からお気に入りに追加できること', async ({ page }) => {
      const shop = createShopMockData({ isFavorite: false });
      await mockApiResponse(page, `**/api/shops/${shop.id}`, shop);
      await mockApiResponse(page, `**/api/favorites`, {
        success: true,
        favoriteId: 'fav-001',
      }, 201);

      await page.goto(`/shops/${shop.id}`);
      await waitForPageLoad(page);

      // お気に入りボタンをクリック
      const favoriteButton = page.getByRole('button', { name: /お気に入り/ })
        .or(page.locator('[data-favorite-button]'))
        .or(page.locator('button:has(svg[data-lucide="heart"])'));

      await favoriteButton.click();

      // 成功フィードバックを確認
      await expect(
        page.getByText(/お気に入りに追加|追加しました/).or(
          page.locator('[data-favorite="true"]')
        )
      ).toBeVisible({ timeout: 5000 });

      await takeScreenshot(page, 'favorites-added');
    });

    test('店舗一覧からお気に入りに追加できること', async ({ page }) => {
      const shops = createShopListResponse(3);
      await mockApiResponse(page, '**/api/shops*', shops);
      await mockApiResponse(page, '**/api/favorites', {
        success: true,
        favoriteId: 'fav-002',
      }, 201);

      await page.goto('/shops');
      await waitForPageLoad(page);

      // 最初の店舗のお気に入りボタンをクリック
      const favoriteButton = page.locator('[data-shop-card]').first()
        .getByRole('button', { name: /お気に入り/ })
        .or(page.locator('[data-shop-card]').first().locator('[data-favorite-button]'));

      if (await favoriteButton.isVisible()) {
        await favoriteButton.click();
        await expect(page.getByText(/お気に入りに追加|追加しました/)).toBeVisible({ timeout: 5000 });
      }
    });
  });

  // ================================================================
  // お気に入り削除テスト
  // ================================================================
  test.describe('お気に入り削除', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('店舗詳細からお気に入りを削除できること', async ({ page }) => {
      const shop = createShopMockData({ isFavorite: true });
      await mockApiResponse(page, `**/api/shops/${shop.id}`, shop);
      await mockApiResponse(page, `**/api/favorites/${shop.id}`, {
        success: true,
      }, 200);

      await page.goto(`/shops/${shop.id}`);
      await waitForPageLoad(page);

      // お気に入り解除ボタンをクリック
      const favoriteButton = page.getByRole('button', { name: /お気に入り解除|お気に入り済み/ })
        .or(page.locator('[data-favorite="true"]'))
        .or(page.locator('button:has(svg[data-lucide="heart"][fill])'));

      await favoriteButton.click();

      // 成功フィードバックを確認
      await expect(
        page.getByText(/お気に入りから削除|解除しました/).or(
          page.locator('[data-favorite="false"]')
        )
      ).toBeVisible({ timeout: 5000 });

      await takeScreenshot(page, 'favorites-removed');
    });

    test('お気に入り一覧から削除できること', async ({ page }) => {
      const favorites = createFavoriteListResponse(3);
      await mockApiResponse(page, '**/api/favorites*', favorites);
      await mockApiResponse(page, `**/api/favorites/**`, {
        success: true,
      }, 200);

      await page.goto('/favorites');
      await waitForPageLoad(page);

      // 最初のお気に入りの削除ボタンをクリック
      const deleteButton = page.locator('[data-favorite-card]').first()
        .getByRole('button', { name: /削除|解除/ })
        .or(page.locator('[data-favorite-card]').first().locator('[data-delete-button]'));

      if (await deleteButton.isVisible()) {
        await deleteButton.click();

        // 確認ダイアログ（存在する場合）
        const confirmButton = page.getByRole('button', { name: /確認|はい|削除/ });
        if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await confirmButton.click();
        }

        await expect(page.getByText(/削除しました|解除しました/)).toBeVisible({ timeout: 5000 });
      }
    });
  });

  // ================================================================
  // お気に入り一覧テスト
  // ================================================================
  test.describe('お気に入り一覧', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('お気に入り一覧が正しく表示されること', async ({ page }) => {
      const favorites = createFavoriteListResponse(3);
      await mockApiResponse(page, '**/api/favorites*', favorites);

      await page.goto('/favorites');
      await waitForPageLoad(page);

      // お気に入り店舗が表示されていることを確認
      const favoriteCards = page.locator('[data-favorite-card]').or(
        page.locator('[data-shop-card]')
      );

      await expect(favoriteCards).toHaveCount(3);

      await takeScreenshot(page, 'favorites-list');
    });

    test('お気に入りが空の場合メッセージが表示されること', async ({ page }) => {
      await mockApiResponse(page, '**/api/favorites*', {
        items: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await page.goto('/favorites');
      await waitForPageLoad(page);

      await expect(page.getByText(/お気に入りがありません|お気に入り店舗がありません/)).toBeVisible();

      await takeScreenshot(page, 'favorites-empty');
    });

    test('お気に入り店舗をクリックすると詳細ページに遷移すること', async ({ page }) => {
      const favorites = createFavoriteListResponse(1);
      const shopId = favorites.items[0].shopId;
      await mockApiResponse(page, '**/api/favorites*', favorites);
      await mockApiResponse(page, `**/api/shops/${shopId}`, createShopMockData({ id: shopId }));

      await page.goto('/favorites');
      await waitForPageLoad(page);

      // 店舗カードをクリック
      const shopCard = page.locator('[data-favorite-card]').first()
        .or(page.locator('[data-shop-card]').first());
      await shopCard.click();

      // 店舗詳細ページに遷移
      await page.waitForURL(`**/shops/${shopId}**`, { timeout: 10000 });
    });
  });

  // ================================================================
  // エラーハンドリングテスト
  // ================================================================
  test.describe('エラーハンドリング', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthenticatedUser(page);
    });

    test('お気に入り追加エラー時にエラーメッセージが表示されること', async ({ page }) => {
      const shop = createShopMockData({ isFavorite: false });
      await mockApiResponse(page, `**/api/shops/${shop.id}`, shop);
      await mockApiError(page, '**/api/favorites', 500, 'サーバーエラーが発生しました');

      await page.goto(`/shops/${shop.id}`);
      await waitForPageLoad(page);

      const favoriteButton = page.getByRole('button', { name: /お気に入り/ });
      await favoriteButton.click();

      await expect(page.getByText(/エラー|追加できませんでした/)).toBeVisible({ timeout: 5000 });
    });

    test('お気に入り上限エラーが表示されること', async ({ page }) => {
      const shop = createShopMockData({ isFavorite: false });
      await mockApiResponse(page, `**/api/shops/${shop.id}`, shop);
      await mockApiError(page, '**/api/favorites', 400, 'お気に入りの上限に達しています');

      await page.goto(`/shops/${shop.id}`);
      await waitForPageLoad(page);

      const favoriteButton = page.getByRole('button', { name: /お気に入り/ });
      await favoriteButton.click();

      await expect(page.getByText(/上限|これ以上追加できません/)).toBeVisible({ timeout: 5000 });
    });

    test('お気に入り一覧取得エラー時にエラーメッセージが表示されること', async ({ page }) => {
      await mockApiError(page, '**/api/favorites*', 500, 'サーバーエラーが発生しました');

      await page.goto('/favorites');
      await waitForPageLoad(page);

      await expect(page.getByText(/エラー|問題が発生|サーバーエラー/)).toBeVisible();

      await takeScreenshot(page, 'favorites-error');
    });
  });

  // ================================================================
  // 未ログインユーザーのアクセステスト
  // ================================================================
  test.describe('未ログインユーザーのアクセス', () => {
    test('未ログインでお気に入り追加時にログイン画面にリダイレクトされること', async ({ page }) => {
      const shop = createShopMockData({ isFavorite: false });
      await mockApiResponse(page, `**/api/shops/${shop.id}`, shop);

      await page.goto(`/shops/${shop.id}`);
      await waitForPageLoad(page);

      const favoriteButton = page.getByRole('button', { name: /お気に入り/ });
      if (await favoriteButton.isVisible()) {
        await favoriteButton.click();

        // ログイン画面にリダイレクトまたはログインモーダル表示
        await expect(
          page.getByText(/ログイン/).or(page.locator('[data-login-modal]'))
        ).toBeVisible({ timeout: 10000 });
      }
    });

    test('未ログインでお気に入り一覧にアクセスするとログイン画面にリダイレクトされること', async ({ page }) => {
      await page.goto('/favorites');

      // ログイン画面にリダイレクト
      await page.waitForURL('**/login**', { timeout: 10000 });
    });
  });
});




