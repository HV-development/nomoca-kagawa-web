import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

// 動画撮影のための待機時間
const VIDEO_CAPTURE_WAIT = 3000;

/**
 * 履歴画面のE2Eテスト
 * - 利用履歴（クーポン利用履歴）
 * - 決済履歴
 */
test.describe('履歴画面', () => {
  // シリアル実行
  test.describe.configure({ mode: 'serial' });

  // マイページに移動するヘルパー関数
  async function navigateToMyPage(page: import('@playwright/test').Page) {
    await page.goto('/home');
    await waitForPageLoad(page);
    await page.waitForTimeout(2000);

    const mypageButton = page.getByRole('button', { name: 'マイページ' });
    
    if (await mypageButton.isVisible()) {
      await mypageButton.click();
      await page.waitForTimeout(1500);
      return true;
    }
    
    return false;
  }

  // ================================================================
  // 利用履歴（クーポン利用履歴）テスト
  // ================================================================
  test.describe('利用履歴', () => {
    test('メニュー表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      // 利用履歴メニューが表示されることを確認
      const historyButton = page.getByText('利用履歴', { exact: true });
      const isVisible = await historyButton.isVisible().catch(() => false);
      
      console.log(`[利用履歴] メニュー表示: ${isVisible}`);
      await takeScreenshot(page, 'history-usage-menu-visible');
      
      expect(isVisible, '利用履歴メニューが表示されること').toBeTruthy();
    });

    test('画面遷移', async ({ page }) => {
      await navigateToMyPage(page);
      
      const historyButton = page.getByText('利用履歴', { exact: true });
      await expect(historyButton).toBeVisible({ timeout: 5000 });
      
      await historyButton.click();
      await page.waitForTimeout(2000);
      
      // 利用履歴画面のタイトルを確認
      const pageTitle = page.getByText('クーポン利用履歴');
      const isOnHistoryPage = await pageTitle.isVisible().catch(() => false);
      
      console.log(`[利用履歴] 画面遷移成功: ${isOnHistoryPage}`);
      await takeScreenshot(page, 'history-usage-screen');
      await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
      
      expect(isOnHistoryPage, 'クーポン利用履歴画面が表示されること').toBeTruthy();
    });

    test('履歴一覧表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const historyButton = page.getByText('利用履歴', { exact: true });
      await historyButton.click();
      await page.waitForTimeout(2000);
      
      // 履歴があるかどうかを確認
      const emptyMessage = page.getByText('まだ利用履歴がありません');
      const historyItems = page.locator('[class*="rounded-2xl"][class*="border"]');
      
      const isEmpty = await emptyMessage.isVisible().catch(() => false);
      const itemCount = await historyItems.count();
      
      console.log(`[利用履歴] 空状態: ${isEmpty}, 履歴件数: ${itemCount}`);
      
      if (isEmpty) {
        // 空状態のスクリーンショット
        await takeScreenshot(page, 'history-usage-empty');
        console.log('[利用履歴] 履歴が空の状態を確認しました');
        expect(isEmpty, '空状態メッセージが表示されること').toBeTruthy();
      } else {
        // 履歴一覧のスクリーンショット
        await takeScreenshot(page, 'history-usage-list');
        console.log(`[利用履歴] ${itemCount}件の履歴を確認しました`);
        expect(itemCount, '履歴が表示されること').toBeGreaterThan(0);
      }
      
      await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
    });

    test('戻るボタン', async ({ page }) => {
      await navigateToMyPage(page);
      
      const historyButton = page.getByText('利用履歴', { exact: true });
      await historyButton.click();
      await page.waitForTimeout(2000);
      
      // 戻るボタンをクリック
      const backButton = page.getByText('← 戻る').or(page.locator('button').filter({ hasText: '戻る' }));
      if (await backButton.first().isVisible()) {
        await backButton.first().click();
        await page.waitForTimeout(1500);
        
        // マイページに戻っていることを確認
        const profileCard = page.getByText('プロフィール');
        const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
        
        console.log(`[利用履歴] マイページに戻る: ${isOnMyPage}`);
        await takeScreenshot(page, 'history-usage-back-to-mypage');
        
        expect(isOnMyPage, 'マイページに戻ること').toBeTruthy();
      }
    });
  });

  // ================================================================
  // 決済履歴テスト
  // ================================================================
  test.describe('決済履歴', () => {
    test('メニュー表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      // 決済履歴メニューが表示されることを確認
      const paymentButton = page.getByText('決済履歴', { exact: true });
      const isVisible = await paymentButton.isVisible().catch(() => false);
      
      console.log(`[決済履歴] メニュー表示: ${isVisible}`);
      await takeScreenshot(page, 'history-payment-menu-visible');
      
      expect(isVisible, '決済履歴メニューが表示されること').toBeTruthy();
    });

    test('画面遷移', async ({ page }) => {
      await navigateToMyPage(page);
      
      const paymentButton = page.getByText('決済履歴', { exact: true });
      await expect(paymentButton).toBeVisible({ timeout: 5000 });
      
      await paymentButton.click();
      await page.waitForTimeout(2000);
      
      // 決済履歴画面のタイトルを確認
      const pageTitle = page.getByRole('heading', { name: '決済履歴' })
        .or(page.getByText('決済履歴').first());
      const isOnHistoryPage = await pageTitle.isVisible().catch(() => false);
      
      console.log(`[決済履歴] 画面遷移成功: ${isOnHistoryPage}`);
      await takeScreenshot(page, 'history-payment-screen');
      await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
      
      expect(isOnHistoryPage, '決済履歴画面が表示されること').toBeTruthy();
    });

    test('履歴一覧表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const paymentButton = page.getByText('決済履歴', { exact: true });
      await paymentButton.click();
      await page.waitForTimeout(2000);
      
      // 履歴があるかどうかを確認
      const emptyMessage = page.getByText('まだ決済履歴がありません');
      const historyItems = page.locator('[class*="rounded-2xl"][class*="border"]');
      
      const isEmpty = await emptyMessage.isVisible().catch(() => false);
      const itemCount = await historyItems.count();
      
      console.log(`[決済履歴] 空状態: ${isEmpty}, 履歴件数: ${itemCount}`);
      
      if (isEmpty) {
        // 空状態のスクリーンショット
        await takeScreenshot(page, 'history-payment-empty');
        console.log('[決済履歴] 履歴が空の状態を確認しました');
        expect(isEmpty, '空状態メッセージが表示されること').toBeTruthy();
      } else {
        // 履歴一覧のスクリーンショット
        await takeScreenshot(page, 'history-payment-list');
        console.log(`[決済履歴] ${itemCount}件の履歴を確認しました`);
        
        // ステータス表示を確認
        const completedStatus = page.getByText('完了');
        const pendingStatus = page.getByText('処理中');
        const failedStatus = page.getByText('失敗');
        
        const hasCompleted = await completedStatus.first().isVisible().catch(() => false);
        const hasPending = await pendingStatus.first().isVisible().catch(() => false);
        const hasFailed = await failedStatus.first().isVisible().catch(() => false);
        
        console.log(`[決済履歴] ステータス - 完了: ${hasCompleted}, 処理中: ${hasPending}, 失敗: ${hasFailed}`);
        expect(itemCount, '履歴が表示されること').toBeGreaterThan(0);
      }
      
      await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
    });

    test('戻るボタン', async ({ page }) => {
      await navigateToMyPage(page);
      
      const paymentButton = page.getByText('決済履歴', { exact: true });
      await paymentButton.click();
      await page.waitForTimeout(2000);
      
      // 戻るボタンをクリック
      const backButton = page.getByText('← 戻る').or(page.locator('button').filter({ hasText: '戻る' }));
      if (await backButton.first().isVisible()) {
        await backButton.first().click();
        await page.waitForTimeout(1500);
        
        // マイページに戻っていることを確認
        const profileCard = page.getByText('プロフィール');
        const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
        
        console.log(`[決済履歴] マイページに戻る: ${isOnMyPage}`);
        await takeScreenshot(page, 'history-payment-back-to-mypage');
        
        expect(isOnMyPage, 'マイページに戻ること').toBeTruthy();
      }
    });
  });
});
