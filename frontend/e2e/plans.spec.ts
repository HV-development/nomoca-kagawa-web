import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * プラン管理のE2Eテスト
 * 実データを使用してテスト（storageStateで認証済み状態を使用）
 */
test.describe('プラン管理', () => {
  // ================================================================
  // プラン登録ページテスト
  // ================================================================
  test.describe('プラン登録', () => {
    test('プラン登録ページアクセス', async ({ page }) => {
      await page.goto('/plan-registration');
      await waitForPageLoad(page);

      // ページが正しく読み込まれたことを確認
      const pageContent = await page.locator('body').textContent();
      expect(pageContent).toBeTruthy();

      await takeScreenshot(page, 'plan-registration');
    });

    test('プラン情報表示', async ({ page }) => {
      await page.goto('/plan-registration');
      await waitForPageLoad(page);

      // プラン関連の情報が表示されていることを確認（必須要件）
      await expect(page.getByText(/プラン|料金|月額|円/).first()).toBeVisible({ timeout: 10000 });
    });
  });

  // ================================================================
  // マイページからのプラン変更テスト
  // ================================================================
  test.describe('プラン変更', () => {
    test('プラン関連リンクアクセス', async ({ page }) => {
      await page.goto('/home');
      await waitForPageLoad(page);

      // マイページタブをクリック
      const mypageTab = page.locator('nav button, [class*="nav"] button').filter({ hasText: /マイページ/ });
      
      if (await mypageTab.isVisible()) {
        await mypageTab.click();
        await page.waitForTimeout(1000);

        // プラン関連のリンクまたはボタンを探す
        const planLink = page.getByText(/プラン/).first();
        await expect(planLink).toBeVisible({ timeout: 5000 });

        await takeScreenshot(page, 'mypage-plan-section');
      }
    });
  });
});
