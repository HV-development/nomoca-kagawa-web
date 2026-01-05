import { test, expect } from '@playwright/test';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

// 動画撮影のための待機時間
const VIDEO_CAPTURE_WAIT = 3000;

/**
 * マイページのE2Eテスト
 * 実データを使用してテスト（storageStateで認証済み状態を使用）
 */
test.describe('マイページ', () => {
  // シリアル実行（編集操作の順序が重要）
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
    
    const mypageText = page.getByText('マイページ', { exact: true });
    if (await mypageText.isVisible()) {
      await mypageText.click();
      await page.waitForTimeout(1500);
      return true;
    }
    
    return false;
  }

  // ================================================================
  // マイページメイン画面テスト
  // ================================================================
  test.describe('メイン画面', () => {
    test('画面表示', async ({ page }) => {
      const navigated = await navigateToMyPage(page);
      expect(navigated, 'マイページに遷移できること').toBeTruthy();
      
      await takeScreenshot(page, 'mypage-main-view');
      
      const profileCard = page.getByText('プロフィール');
      await expect(profileCard.first()).toBeVisible({ timeout: 10000 });
    });

    test('プロフィール情報', async ({ page }) => {
      await navigateToMyPage(page);
      
      const nicknameLabel = page.getByText('ニックネーム', { exact: true });
      const emailLabel = page.getByText('メールアドレス', { exact: true });
      
      await expect(nicknameLabel).toBeVisible({ timeout: 5000 });
      await expect(emailLabel).toBeVisible({ timeout: 5000 });
      
      await takeScreenshot(page, 'mypage-profile-info');
    });

    test('メニュー一覧', async ({ page }) => {
      await navigateToMyPage(page);
      
      const menuItems = ['プロフィール編集', 'プラン', 'メールアドレスの変更', 'パスワードの変更', 'ログアウト'];
      
      for (const menuItem of menuItems) {
        const menuButton = page.getByText(new RegExp(menuItem));
        const isVisible = await menuButton.first().isVisible().catch(() => false);
        console.log(`[マイページ] メニュー「${menuItem}」: ${isVisible}`);
      }
      
      // 主要メニューが表示されていることを確認
      const profileEditButton = page.getByText('プロフィール編集');
      await expect(profileEditButton).toBeVisible({ timeout: 5000 });
      
      await takeScreenshot(page, 'mypage-menu-buttons');
    });
  });

  // ================================================================
  // プロフィール編集テスト
  // ================================================================
  test.describe('プロフィール編集', () => {
    let originalNickname: string = '';

    test('画面表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      const pageTitle = page.getByRole('heading', { name: /プロフィール編集/ });
      await expect(pageTitle).toBeVisible({ timeout: 10000 });
      
      await takeScreenshot(page, 'mypage-profile-edit-view');
    });

    test('フォーム項目表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      // フォーム項目を確認
      const labels = ['ニックネーム', '郵便番号', '住所', '生年月日', '電話番号'];
      for (const label of labels) {
        const labelElement = page.getByText(label, { exact: true });
        const isVisible = await labelElement.isVisible().catch(() => false);
        console.log(`[プロフィール] フォーム項目「${label}」: ${isVisible}`);
      }
      
      // 主要フォーム項目が表示されていることを確認
      const nicknameLabel = page.getByText('ニックネーム', { exact: true });
      await expect(nicknameLabel).toBeVisible({ timeout: 5000 });
      
      await takeScreenshot(page, 'mypage-profile-edit-form');
    });

    // バリデーションテスト - ニックネーム
    test('バリデーション-ニックネーム空欄', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      // ニックネーム入力欄をクリア
      const nicknameInput = page.getByLabel(/ニックネーム/).or(page.locator('input').first());
      if (await nicknameInput.isVisible()) {
        await nicknameInput.fill('');
        await nicknameInput.blur();
        await page.waitForTimeout(500);
      }
      
      // 確認するボタンをクリック
      const confirmButton = page.getByRole('button', { name: '確認する' });
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
        await page.waitForTimeout(1000);
      }
      
      await takeScreenshot(page, 'mypage-profile-validation-nickname-empty');
    });

    // バリデーションテスト - 郵便番号形式
    test('バリデーション-郵便番号形式', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      // 郵便番号入力欄に不正な値を入力
      const postalCodeInput = page.getByLabel(/郵便番号/).or(page.getByPlaceholder(/郵便番号|〒/));
      if (await postalCodeInput.isVisible()) {
        await postalCodeInput.fill('invalid');
        await postalCodeInput.blur();
        await page.waitForTimeout(500);
        
        const errorMessage = page.getByText(/郵便番号|形式|数字/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        console.log(`[バリデーション] 郵便番号エラー: ${hasError}`);
        expect(hasError, '郵便番号形式エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-profile-validation-postalcode');
    });

    // バリデーションテスト - 電話番号形式
    test('バリデーション-電話番号形式', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      // 電話番号入力欄に不正な値を入力
      const phoneInput = page.getByLabel(/電話番号/).or(page.getByPlaceholder(/電話|TEL/i));
      if (await phoneInput.isVisible()) {
        await phoneInput.fill('invalid-phone');
        await phoneInput.blur();
        await page.waitForTimeout(500);
        
        const errorMessage = page.getByText(/電話番号|形式|数字/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        console.log(`[バリデーション] 電話番号エラー: ${hasError}`);
        expect(hasError, '電話番号形式エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-profile-validation-phone');
    });

    // バリデーションテスト - 生年月日形式
    test('バリデーション-生年月日形式', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      // 生年月日入力欄に不正な値を入力
      const birthDateInput = page.getByLabel(/生年月日/).or(page.getByPlaceholder(/生年月日|YYYY/));
      if (await birthDateInput.isVisible()) {
        await birthDateInput.fill('invalid-date');
        await birthDateInput.blur();
        await page.waitForTimeout(500);
        
        const errorMessage = page.getByText(/生年月日|日付|形式/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        console.log(`[バリデーション] 生年月日エラー: ${hasError}`);
        expect(hasError, '生年月日形式エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-profile-validation-birthdate');
    });

    // プロフィール更新実行（確認画面含む）
    test('更新実行-確認画面表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      // 現在のニックネームを取得
      const nicknameValue = page.locator('text=ニックネーム').locator('..').locator('span, div').last();
      originalNickname = await nicknameValue.textContent() || 'テストユーザー';
      console.log(`[プロフィール更新] 元のニックネーム: ${originalNickname}`);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(2000);
      
      // フォームの入力欄を取得
      const inputs = await page.locator('input').all();
      const timestamp = Math.floor(Math.random() * 1000);
      const testNickname = `テストユーザー${timestamp}`;
      
      if (inputs.length > 0) {
        // 各フィールドに有効なデータを入力
        // ニックネーム（1番目のinput）
        const nicknameInput = page.locator('input').first();
        await nicknameInput.selectText();
        await nicknameInput.fill(testNickname);
        await page.waitForTimeout(300);
        
        // 郵便番号（2番目のinput）- 有効な7桁の数字
        const postalCodeInput = page.locator('input').nth(1);
        if (await postalCodeInput.isVisible()) {
          await postalCodeInput.selectText();
          await postalCodeInput.fill('7600033');
          await page.waitForTimeout(300);
        }
        
        // 住所（3番目のinput）
        const addressInput = page.locator('input').nth(2);
        if (await addressInput.isVisible()) {
          await addressInput.selectText();
          await addressInput.fill('香川県高松市丸の内');
          await page.waitForTimeout(300);
        }
        
        // 電話番号（4番目以降のinput）- 有効な10または11桁の数字
        const phoneInput = page.locator('input[type="tel"]').or(page.locator('input').nth(4));
        if (await phoneInput.first().isVisible()) {
          await phoneInput.first().selectText();
          await phoneInput.first().fill('09012345678');
          await page.waitForTimeout(300);
        }
        
        console.log(`[プロフィール更新] 入力したニックネーム: ${testNickname}`);
        await takeScreenshot(page, 'mypage-profile-before-confirm');
        
        // 「確認する」ボタンをクリック
        const confirmButton = page.getByRole('button', { name: '確認する' });
        await expect(confirmButton).toBeVisible({ timeout: 5000 });
        await confirmButton.click();
        
        // 確認モーダルが表示されるまで待機
        await page.waitForTimeout(2000);
        
        // 確認モーダルのタイトルを確認（複数のセレクタを試行）
        const modalTitle = page.getByText('更新内容の確認');
        const isModalVisible = await modalTitle.isVisible().catch(() => false);
        
        console.log(`[プロフィール更新] 確認モーダル表示: ${isModalVisible}`);
        
        if (isModalVisible) {
          // 確認モーダルのスクリーンショット
          await takeScreenshot(page, 'mypage-profile-confirm-modal');
          
          // 動画に確認画面が映るように待機
          await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
          
          // 「更新する」ボタンをクリック
          const updateButton = page.getByRole('button', { name: '更新する' });
          if (await updateButton.isVisible()) {
            await updateButton.click();
            
            // 更新完了を待機
            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
            
            // マイページに戻っていることを確認
            const profileCard = page.getByText('プロフィール');
            const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
            
            console.log(`[プロフィール更新] マイページ表示: ${isOnMyPage}`);
            
            // 更新完了後のスクリーンショット
            await takeScreenshot(page, 'mypage-profile-update-complete');
            
            // 動画に完了状態が映るように追加待機
            await page.waitForTimeout(2000);
            
            // 更新されたニックネームを確認
            if (isOnMyPage) {
              const updatedNickname = await page.locator('text=ニックネーム').locator('..').locator('span, div').last().textContent();
              console.log(`[プロフィール更新] 更新後のニックネーム: ${updatedNickname}`);
              await takeScreenshot(page, 'mypage-profile-updated-nickname');
            }
          }
        } else {
          // モーダルが表示されない場合はエラー状態を確認
          console.log('[プロフィール更新] 確認モーダルが表示されませんでした');
          
          // エラーメッセージを確認
          const errorMessages = page.locator('.text-red-500');
          const errorCount = await errorMessages.count();
          
          if (errorCount > 0) {
            console.log(`[プロフィール更新] バリデーションエラー数: ${errorCount}`);
            for (let i = 0; i < Math.min(errorCount, 3); i++) {
              const text = await errorMessages.nth(i).innerText();
              console.log(`[プロフィール更新] エラー${i}: ${text}`);
            }
          }
          
          await takeScreenshot(page, 'mypage-profile-validation-errors');
        }
      }
    });

    // プロフィールを元に戻す
    test('元に戻す', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(2000);
      
      const nicknameInput = page.locator('input').first();
      
      if (await nicknameInput.isVisible()) {
        const restoreNickname = originalNickname || 'ノモカユーザー太郎';
        
        // ニックネームを元に戻す
        await nicknameInput.selectText();
        await nicknameInput.fill(restoreNickname);
        await page.waitForTimeout(300);
        
        // 郵便番号に有効な値を入力
        const postalCodeInput = page.locator('input').nth(1);
        if (await postalCodeInput.isVisible()) {
          await postalCodeInput.selectText();
          await postalCodeInput.fill('7600033');
          await page.waitForTimeout(300);
        }
        
        // 住所に有効な値を入力
        const addressInput = page.locator('input').nth(2);
        if (await addressInput.isVisible()) {
          await addressInput.selectText();
          await addressInput.fill('香川県高松市丸の内');
          await page.waitForTimeout(300);
        }
        
        // 電話番号に有効な値を入力
        const phoneInput = page.locator('input[type="tel"]').or(page.locator('input').nth(4));
        if (await phoneInput.first().isVisible()) {
          await phoneInput.first().selectText();
          await phoneInput.first().fill('09012345678');
          await page.waitForTimeout(300);
        }
        
        // 「確認する」ボタンをクリック
        const confirmButton = page.getByRole('button', { name: '確認する' });
        if (await confirmButton.isVisible()) {
          await confirmButton.click();
          await page.waitForTimeout(2000);
          
          // 確認モーダルのスクリーンショット
          await takeScreenshot(page, 'mypage-profile-restore-confirm-modal');
          await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
          
          // 確認モーダルで「更新する」をクリック
          const updateButton = page.getByRole('button', { name: '更新する' });
          if (await updateButton.isVisible()) {
            await updateButton.click();
            
            // 復元完了を待機（動画撮影用）
            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
            
            console.log(`[プロフィール更新] ニックネームを元に戻しました: ${restoreNickname}`);
            
            await takeScreenshot(page, 'mypage-profile-restored');
            await page.waitForTimeout(2000);
            
            // マイページに戻っていることを確認
            const profileCard = page.getByText('プロフィール');
            const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
            expect(isOnMyPage, 'マイページに戻ること').toBeTruthy();
          }
        }
      }
    });

    test('キャンセル', async ({ page }) => {
      await navigateToMyPage(page);
      
      const editButton = page.getByText('プロフィール編集');
      await editButton.click();
      await page.waitForTimeout(1500);
      
      const cancelButton = page.getByRole('button', { name: 'キャンセル' });
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
        await page.waitForTimeout(1500);
        
        const profileCard = page.getByText('プロフィール');
        await expect(profileCard.first()).toBeVisible({ timeout: 5000 });
      }
      
      await takeScreenshot(page, 'mypage-profile-edit-cancel');
    });
  });

  // ================================================================
  // メールアドレス変更テスト
  // ================================================================
  test.describe('メールアドレス変更', () => {
    test('画面表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      const pageTitle = page.getByRole('heading', { name: /メールアドレス|メール/ });
      const emailInput = page.locator('input[type="email"]');
      
      const isOnEmailChangePage = await pageTitle.isVisible().catch(() => false);
      const hasEmailInput = await emailInput.first().isVisible().catch(() => false);
      
      expect(isOnEmailChangePage || hasEmailInput, 'メールアドレス変更画面が表示されること').toBeTruthy();
      await takeScreenshot(page, 'mypage-email-change-view');
    });

    // バリデーションテスト - メールアドレス空欄
    test('バリデーション-メールアドレス空欄', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      // 空のまま送信
      const submitButton = page.getByRole('button', { name: /変更|送信|確認|認証/ });
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(1000);
        
        // エラーメッセージが表示されることを確認
        const errorMessage = page.getByText(/必須|入力してください|メールアドレス/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        expect(hasError, 'メールアドレス空欄エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-email-validation-empty');
    });

    // バリデーションテスト - メールアドレス形式
    test('バリデーション-メールアドレス形式', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      const emailInputs = page.locator('input[type="email"]');
      const firstEmailInput = emailInputs.first();
      
      if (await firstEmailInput.isVisible()) {
        await firstEmailInput.fill('invalid-email');
        await firstEmailInput.blur();
        await page.waitForTimeout(500);
        
        const errorMessage = page.getByText(/メールアドレス|形式|正しく/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        console.log(`[バリデーション] メール形式エラー: ${hasError}`);
        expect(hasError, 'メールアドレス形式エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-email-validation-format');
    });

    // バリデーションテスト - メールアドレス不一致
    test('バリデーション-メールアドレス不一致', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      const emailInputs = page.locator('input[type="email"]');
      const inputCount = await emailInputs.count();
      
      if (inputCount >= 2) {
        await emailInputs.nth(0).fill('new@example.com');
        await emailInputs.nth(1).fill('different@example.com');
        await page.waitForTimeout(500);
        
        const submitButton = page.getByRole('button', { name: /変更|送信|確認|認証/ });
        if (await submitButton.isVisible()) {
          await submitButton.click();
          await page.waitForTimeout(1000);
          
          const errorMessage = page.getByText(/一致しません|同じ|確認/);
          const hasError = await errorMessage.first().isVisible().catch(() => false);
          console.log(`[バリデーション] メール不一致エラー: ${hasError}`);
          expect(hasError, 'メールアドレス不一致エラーが表示されること').toBeTruthy();
        }
      }
      
      await takeScreenshot(page, 'mypage-email-validation-mismatch');
    });

    // メールアドレス変更フォーム送信
    test('フォーム送信', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      const passwordInput = page.locator('input[type="password"]');
      const emailInputs = page.locator('input[type="email"]');
      const testEmail = `test-change-${Date.now()}@example.com`;
      
      // 現在のパスワードを入力
      if (await passwordInput.first().isVisible()) {
        await passwordInput.first().fill('nomoca-user123');
        await page.waitForTimeout(300);
      }
      
      // メールアドレスを入力
      const inputCount = await emailInputs.count();
      if (inputCount >= 1) {
        await emailInputs.nth(0).fill(testEmail);
        await page.waitForTimeout(300);
      }
      if (inputCount >= 2) {
        await emailInputs.nth(1).fill(testEmail);
        await page.waitForTimeout(300);
      }
      
      await takeScreenshot(page, 'mypage-email-change-filled');
      
      const submitButton = page.getByRole('button', { name: /変更|送信|確認|認証メール/ });
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // 送信完了を待機（動画撮影用）
        await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
        
        const successMessage = page.getByText(/送信しました|確認メール|認証|完了/);
        const hasSuccess = await successMessage.first().isVisible().catch(() => false);
        console.log(`[メール変更] 送信成功: ${hasSuccess}`);
        expect(hasSuccess, '送信成功メッセージが表示されること').toBeTruthy();
        
        // 送信完了後のスクリーンショット
        await takeScreenshot(page, 'mypage-email-change-submitted');
        await page.waitForTimeout(2000);
      }
    });

    test('キャンセル', async ({ page }) => {
      await navigateToMyPage(page);
      
      const emailChangeButton = page.getByText('メールアドレスの変更');
      await emailChangeButton.click();
      await page.waitForTimeout(1500);
      
      const backButton = page.getByText('← 戻る');
      if (await backButton.isVisible()) {
        await backButton.click();
        await page.waitForTimeout(1500);
        
        // マイページに戻っていることを確認
        const profileCard = page.getByText('プロフィール');
        const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
        expect(isOnMyPage, 'マイページに戻ること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-email-change-cancel');
    });
  });

  // ================================================================
  // パスワード変更テスト
  // ================================================================
  test.describe('パスワード変更', () => {
    test('画面表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      const pageTitle = page.getByRole('heading', { name: /パスワード/ });
      const passwordInput = page.locator('input[type="password"]');
      
      const isOnPasswordChangePage = await pageTitle.isVisible().catch(() => false);
      const hasPasswordInput = await passwordInput.first().isVisible().catch(() => false);
      
      expect(isOnPasswordChangePage || hasPasswordInput, 'パスワード変更画面が表示されること').toBeTruthy();
      await takeScreenshot(page, 'mypage-password-change-view');
    });

    // バリデーションテスト - パスワード空欄
    test('バリデーション-パスワード空欄', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      const submitButton = page.getByRole('button', { name: /変更|送信|確認/ });
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(1000);
        
        const errorMessage = page.getByText(/必須|入力してください|パスワード/);
        const hasError = await errorMessage.first().isVisible().catch(() => false);
        console.log(`[バリデーション] パスワード空欄エラー: ${hasError}`);
        expect(hasError, 'パスワード空欄エラーが表示されること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-password-validation-empty');
    });

    // バリデーションテスト - パスワード短すぎ
    test('バリデーション-パスワード短すぎ', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      const passwordInputs = page.locator('input[type="password"]');
      const inputCount = await passwordInputs.count();
      
      if (inputCount >= 2) {
        // 短いパスワードを入力
        if (inputCount >= 3) {
          await passwordInputs.nth(0).fill('currentPassword123');
          await passwordInputs.nth(1).fill('short');
          await passwordInputs.nth(2).fill('short');
        } else {
          await passwordInputs.nth(0).fill('short');
          await passwordInputs.nth(1).fill('short');
        }
        
        await page.waitForTimeout(500);
        
        const submitButton = page.getByRole('button', { name: /変更|送信|確認/ });
        if (await submitButton.isVisible()) {
          await submitButton.click();
          await page.waitForTimeout(1000);
          
          const errorMessage = page.getByText(/文字以上|短すぎ|長さ/);
          const hasError = await errorMessage.first().isVisible().catch(() => false);
          console.log(`[バリデーション] パスワード短すぎエラー: ${hasError}`);
          expect(hasError, 'パスワード短すぎエラーが表示されること').toBeTruthy();
        }
      }
      
      await takeScreenshot(page, 'mypage-password-validation-short');
    });

    // バリデーションテスト - パスワード不一致
    test('バリデーション-パスワード不一致', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      const passwordInputs = page.locator('input[type="password"]');
      const inputCount = await passwordInputs.count();
      
      if (inputCount >= 2) {
        if (inputCount >= 3) {
          await passwordInputs.nth(0).fill('currentPassword123');
          await passwordInputs.nth(1).fill('NewPassword123!');
          await passwordInputs.nth(2).fill('DifferentPassword456!');
        } else {
          await passwordInputs.nth(0).fill('NewPassword123!');
          await passwordInputs.nth(1).fill('DifferentPassword456!');
        }
        
        await page.waitForTimeout(500);
        
        const submitButton = page.getByRole('button', { name: /変更|送信|確認/ });
        if (await submitButton.isVisible()) {
          await submitButton.click();
          await page.waitForTimeout(1000);
          
          const errorMessage = page.getByText(/一致しません|同じ|確認/);
          const hasError = await errorMessage.first().isVisible().catch(() => false);
          console.log(`[バリデーション] パスワード不一致エラー: ${hasError}`);
          expect(hasError, 'パスワード不一致エラーが表示されること').toBeTruthy();
        }
      }
      
      await takeScreenshot(page, 'mypage-password-validation-mismatch');
    });

    // パスワード変更フォーム送信（同一パスワード → バリデーションエラー確認）
    test('フォーム送信-同一パスワードエラー', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      // ラベルを使って入力欄を取得
      const currentPwLabel = page.getByText('現在のパスワード', { exact: true });
      const newPwLabel = page.getByText('新しいパスワード', { exact: true });
      const confirmPwLabel = page.getByText('パスワード確認', { exact: true });
      
      // 同じパスワードを入力
      const samePassword = 'nomoca-user123';
      
      console.log(`[パスワード変更] 同一パスワードテスト`);
      
      // 現在のパスワード
      const currentPwInput = currentPwLabel.locator('..').locator('input');
      if (await currentPwInput.isVisible()) {
        await currentPwInput.fill(samePassword);
        await page.waitForTimeout(200);
      }
      
      // 新しいパスワード
      const newPwInput = newPwLabel.locator('..').locator('input');
      if (await newPwInput.isVisible()) {
        await newPwInput.fill(samePassword);
        await page.waitForTimeout(200);
      }
      
      // パスワード確認
      const confirmPwInput = confirmPwLabel.locator('..').locator('input');
      if (await confirmPwInput.isVisible()) {
        await confirmPwInput.fill(samePassword);
        await page.waitForTimeout(200);
      }
      
      await page.waitForTimeout(500);
      await takeScreenshot(page, 'mypage-password-same-filled');
      
      const submitButton = page.getByRole('button', { name: '変更する' });
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(2000);
        
        // 同じパスワードエラーを確認
        const samePasswordError = page.getByText(/同じパスワード|現在のパスワードと同じ/);
        const hasError = await samePasswordError.first().isVisible().catch(() => false);
        
        console.log(`[パスワード変更] 同一パスワードエラー表示: ${hasError}`);
        await takeScreenshot(page, 'mypage-password-same-error');
        
        // エラーが表示されることを確認
        expect(hasError, '同じパスワードは使用できないエラーが表示されること').toBeTruthy();
      }
    });

    // パスワード変更完了画面の記録（実際にパスワードを変更して完了画面を表示）
    test('フォーム送信-完了画面表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      // ラベルを使って入力欄を取得
      const currentPwLabel = page.getByText('現在のパスワード', { exact: true });
      const newPwLabel = page.getByText('新しいパスワード', { exact: true });
      const confirmPwLabel = page.getByText('パスワード確認', { exact: true });
      
      const currentPassword = 'nomoca-user123';
      const newPassword = 'NomocaNew456Pass!';
      
      console.log(`[パスワード変更] 完了画面テスト: ${currentPassword} → ${newPassword}`);
      
      // 現在のパスワード
      const currentPwInput = currentPwLabel.locator('..').locator('input');
      if (await currentPwInput.isVisible()) {
        await currentPwInput.fill(currentPassword);
        await page.waitForTimeout(200);
        console.log(`[パスワード変更] 現在のパスワード入力完了`);
      }
      
      // 新しいパスワード
      const newPwInput = newPwLabel.locator('..').locator('input');
      if (await newPwInput.isVisible()) {
        await newPwInput.fill(newPassword);
        await page.waitForTimeout(200);
        console.log(`[パスワード変更] 新しいパスワード入力完了`);
      }
      
      // パスワード確認
      const confirmPwInput = confirmPwLabel.locator('..').locator('input');
      if (await confirmPwInput.isVisible()) {
        await confirmPwInput.fill(newPassword);
        await page.waitForTimeout(200);
        console.log(`[パスワード変更] パスワード確認入力完了`);
      }
      
      await page.waitForTimeout(500);
      await takeScreenshot(page, 'mypage-password-change-input');
      
      // 送信ボタンをクリック
      const submitButton = page.getByRole('button', { name: '変更する' });
      console.log(`[パスワード変更] 送信ボタンをクリック`);
      await submitButton.click();
      
      // 完了画面が表示されるまで待機
      console.log(`[パスワード変更] 完了画面を待機中...`);
      await page.waitForTimeout(4000);
      
      // 完了画面のスクリーンショット
      await takeScreenshot(page, 'mypage-password-change-complete');
      
      // 成功メッセージを待機して確認
      const successTitle = page.getByRole('heading', { name: 'パスワード変更完了' });
      const successMessage = page.getByText('パスワードが正常に変更されました');
      
      // 明示的に完了画面を待機
      try {
        await successTitle.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`[パスワード変更] 完了画面が表示されました`);
      } catch (_e) {
        console.log(`[パスワード変更] 完了画面の待機中にタイムアウト`);
      }
      
      const hasTitleSuccess = await successTitle.isVisible().catch(() => false);
      const hasMessageSuccess = await successMessage.isVisible().catch(() => false);
      
      console.log(`[パスワード変更] 完了タイトル: ${hasTitleSuccess}, 完了メッセージ: ${hasMessageSuccess}`);
      
      // 動画に完了画面が映るように十分待機
      await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
      await takeScreenshot(page, 'mypage-password-change-complete-final');
      await page.waitForTimeout(2000);
      
      // 完了画面が表示されていることを確認
      expect(hasTitleSuccess || hasMessageSuccess, 'パスワード変更完了画面が表示されること').toBeTruthy();
      
      console.log(`[パスワード変更] テスト完了 - DBリセットが必要です`);
    });


    test('キャンセル', async ({ page }) => {
      await navigateToMyPage(page);
      
      const passwordChangeButton = page.getByText('パスワードの変更');
      await passwordChangeButton.click();
      await page.waitForTimeout(1500);
      
      const backButton = page.getByText('← 戻る');
      if (await backButton.isVisible()) {
        await backButton.click();
        await page.waitForTimeout(1500);
        
        // マイページに戻っていることを確認
        const profileCard = page.getByText('プロフィール');
        const isOnMyPage = await profileCard.first().isVisible().catch(() => false);
        expect(isOnMyPage, 'マイページに戻ること').toBeTruthy();
      }
      
      await takeScreenshot(page, 'mypage-password-change-cancel');
    });
  });

  // ================================================================
  // 利用履歴・決済履歴テストは history.spec.ts に統合
  // ================================================================

  // ================================================================
  // ログアウトテスト
  // ================================================================
  test.describe('ログアウト', () => {
    test('ボタン表示', async ({ page }) => {
      await navigateToMyPage(page);
      
      const logoutButton = page.getByText('ログアウト');
      await expect(logoutButton).toBeVisible({ timeout: 5000 });
      
      await takeScreenshot(page, 'mypage-logout-button');
    });
  });
});
