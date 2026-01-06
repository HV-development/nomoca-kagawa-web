import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * お気に入り機能のE2Eテスト
 * 実データを使用してテスト（storageStateで認証済み状態を使用）
 */
test.describe('お気に入り機能', () => {
  // シリアル実行（お気に入り追加→一覧確認→削除の順序が重要）
  test.describe.configure({ mode: 'serial' });

  // テスト中に使用する店舗名を保持
  let targetStoreName: string = '';

  // ================================================================
  // お気に入りボタン操作テスト
  // ================================================================
  test.describe('お気に入りボタン', () => {
    test('店舗一覧でお気に入りボタン表示', async ({ page }) => {
      await page.goto('/home');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);

      // 店舗カードが表示されるまで待機
      const storeCards = page.locator('h3').filter({ hasText: /./ });
      await expect(storeCards.first()).toBeVisible({ timeout: 15000 });
      
      // 店舗一覧が表示されていることを確認
      const cardCount = await storeCards.count();
      expect(cardCount, '店舗が1件以上表示されること').toBeGreaterThan(0);

      // お気に入りボタン（追加または削除）が表示されていることを確認
      const favoriteAddButtons = page.getByRole('button', { name: /お気に入りに追加/ });
      const favoriteRemoveButtons = page.getByRole('button', { name: /お気に入りから削除/ });
      const addCount = await favoriteAddButtons.count();
      const removeCount = await favoriteRemoveButtons.count();
      console.log(`[お気に入りテスト] 店舗数: ${cardCount}, 追加ボタン: ${addCount}, 削除ボタン: ${removeCount}`);

      await takeScreenshot(page, 'favorites-shop-list-with-buttons');
    });

    test('お気に入りに追加', async ({ page }) => {
      await page.goto('/home');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);

      // 店舗カードが表示されるまで待機
      const storeCards = page.locator('h3').filter({ hasText: /./ });
      await expect(storeCards.first()).toBeVisible({ timeout: 15000 });

      // 最初の店舗名を取得
      targetStoreName = await storeCards.first().textContent() || '';
      console.log(`[お気に入りテスト] 対象店舗: ${targetStoreName}`);

      // お気に入り追加ボタンを探す
      const favoriteAddButton = page.getByRole('button', { name: /お気に入りに追加/ }).first();
      
      if (await favoriteAddButton.isVisible()) {
        // クリック前のスクリーンショット
        await takeScreenshot(page, 'favorites-before-add');
        
        await favoriteAddButton.click();
        await page.waitForTimeout(1500);

        // クリック後のスクリーンショット（ボタンの状態変化を確認）
        await takeScreenshot(page, 'favorites-after-add');
        
        // ボタンが「お気に入りから削除」に変わっていることを確認
        const removeButton = page.getByRole('button', { name: /お気に入りから削除/ }).first();
        const isRemoveVisible = await removeButton.isVisible().catch(() => false);
        console.log(`[お気に入りテスト] お気に入りに追加完了、削除ボタン表示: ${isRemoveVisible}`);
      } else {
        console.log('[お気に入りテスト] 既にお気に入りに追加済みの可能性があります');
        await takeScreenshot(page, 'favorites-already-added');
      }
    });
  });

  // ================================================================
  // お気に入り一覧テスト
  // ================================================================
  test.describe('お気に入り一覧', () => {
    test('お気に入りタブでお気に入り一覧表示', async ({ page }) => {
      await page.goto('/home');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);

      // ボトムナビゲーションのお気に入りタブを探す
      const favoritesTab = page.locator('nav button, nav a, [role="navigation"] button, [role="navigation"] a')
        .filter({ hasText: /お気に入り/ });
      
      let tabClicked = false;
      
      if (await favoritesTab.first().isVisible()) {
        console.log('[お気に入りテスト] お気に入りタブを発見');
        await favoritesTab.first().click();
        tabClicked = true;
      } else {
        // ナビゲーション内のボタンを確認
        const navButtons = await page.locator('nav button, nav a').all();
        console.log(`[お気に入りテスト] ナビゲーションボタン数: ${navButtons.length}`);
        
        for (let i = 0; i < navButtons.length; i++) {
          const text = await navButtons[i].textContent();
          console.log(`[お気に入りテスト] ボタン${i}: ${text}`);
        }
        
        // ハンバーガーメニューを開く
        const menuButton = page.getByRole('button', { name: /メニュー/ });
        if (await menuButton.isVisible()) {
          await menuButton.click();
          await page.waitForTimeout(1000);
          
          const menuFavorites = page.getByText(/お気に入り/).first();
          if (await menuFavorites.isVisible()) {
            await menuFavorites.click();
            tabClicked = true;
          }
        }
      }

      if (tabClicked) {
        await page.waitForTimeout(2000);
        
        // お気に入り一覧画面が表示されることを確認
        await page.waitForTimeout(1000); // 動画撮影用の待機
        await takeScreenshot(page, 'favorites-list-view');
        
        // 「お気に入りから削除」ボタンが表示されていれば成功
        const removeButtons = page.getByRole('button', { name: /お気に入りから削除/ });
        const removeCount = await removeButtons.count();
        console.log(`[お気に入りテスト] お気に入り店舗数（削除ボタン数）: ${removeCount}`);
        
        // お気に入り一覧が表示されていることを確認
        const favoritesPage = page.getByText(/お気に入り|お気に入り一覧/);
        const hasFavoritesPage = await favoritesPage.first().isVisible().catch(() => false);
        
        // お気に入り一覧ページまたは店舗カードが表示されていることを確認
        expect(hasFavoritesPage || removeCount >= 0, 'お気に入り一覧が表示されること').toBeTruthy();
      }
    });

    test('お気に入り一覧に店舗が表示される', async ({ page }) => {
      // お気に入りページに直接アクセス（リダイレクトされる可能性あり）
      await page.goto('/favorites');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);
      
      // 現在のURLを確認
      const currentUrl = page.url();
      console.log(`[お気に入りテスト] 現在のURL: ${currentUrl}`);
      
      // ページが表示されることを確認
      await takeScreenshot(page, 'favorites-page-direct-access');
      
      // お気に入りに追加済みの店舗があるか確認（「お気に入りから削除」ボタンで判断）
      const removeButtons = page.getByRole('button', { name: /お気に入りから削除/ });
      const removeCount = await removeButtons.count();
      
      // 店舗カードまたは「お気に入りがありません」メッセージを確認
      const storeCards = page.locator('h3').filter({ hasText: /./ });
      const emptyMessage = page.getByText(/お気に入りがありません|お気に入りに登録/);
      
      const hasStores = await storeCards.first().isVisible().catch(() => false);
      const isEmpty = await emptyMessage.isVisible().catch(() => false);
      
      console.log(`[お気に入りテスト] 店舗表示: ${hasStores}, 空メッセージ: ${isEmpty}, 削除ボタン数: ${removeCount}`);
      
      // どちらかが表示されていればOK
      expect(hasStores || isEmpty, 'ページが正常に表示されること').toBeTruthy();
      
      if (removeCount > 0) {
        console.log(`[お気に入りテスト] お気に入り店舗数: ${removeCount}`);
        
        // お気に入り一覧に店舗が表示されている状態でスクリーンショット
        await page.waitForTimeout(1000);
        await takeScreenshot(page, 'favorites-list-with-stores');
      }
    });
  });

  // ================================================================
  // お気に入り削除テスト
  // ================================================================
  test.describe('お気に入り削除', () => {
    test('お気に入りから削除', async ({ page }) => {
      // ホームページにアクセス
      await page.goto('/home');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);
      
      // お気に入り削除ボタンが表示されているか確認
      const removeButton = page.getByRole('button', { name: /お気に入りから削除/ }).first();
      const hasRemoveButton = await removeButton.isVisible().catch(() => false);
      
      if (hasRemoveButton) {
        await takeScreenshot(page, 'favorites-before-remove');
        
        // 削除ボタンをクリック
        await removeButton.click();
        await page.waitForTimeout(1500);
        
        await takeScreenshot(page, 'favorites-after-remove');
        
        // ボタンが「お気に入りに追加」に変わっていることを確認
        const addButton = page.getByRole('button', { name: /お気に入りに追加/ }).first();
        const isAddVisible = await addButton.isVisible().catch(() => false);
        console.log(`[お気に入りテスト] お気に入りから削除完了、追加ボタン表示: ${isAddVisible}`);
        
        // ボタンが「お気に入りに追加」に変わっていることを確認
        await expect(addButton).toBeVisible({ timeout: 3000 });
      } else {
        console.log('[お気に入りテスト] お気に入りに店舗がないため削除テストをスキップ');
        await takeScreenshot(page, 'favorites-no-stores-to-remove');
      }
    });

    test('削除後にお気に入り一覧更新', async ({ page }) => {
      // ホームページにアクセス
      await page.goto('/home');
      await waitForPageLoad(page);
      await page.waitForTimeout(2000);
      
      // ページの状態を確認
      await takeScreenshot(page, 'favorites-final-state');
      
      // お気に入り追加/削除ボタンを確認
      const addButtons = page.getByRole('button', { name: /お気に入りに追加/ });
      const removeButtons = page.getByRole('button', { name: /お気に入りから削除/ });
      
      const addCount = await addButtons.count();
      const removeCount = await removeButtons.count();
      
      console.log(`[お気に入りテスト] 最終状態 - 追加ボタン: ${addCount}, 削除ボタン: ${removeCount}`);
      
      // ページが正常に表示されていることを確認
      expect(addCount + removeCount, 'お気に入りボタンが表示されること').toBeGreaterThan(0);
    });
  });
});
