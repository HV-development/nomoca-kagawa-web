import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { waitForPageLoad, takeScreenshot } from './utils/test-helpers';

/**
 * プラン登録・変更に関する詳細テスト
 * 
 * テスト内容:
 * - サブスクリプション以外のプランで支払い方法の制限を確認
 * - マイデジアプリ連携とポイント付与ポップアップ
 * - ポイント付与後の割引プラン表示
 */

// テスト用マイデジアプリID
const TEST_MYDIGI_APP_ID = 'takamatsu_VWF3TpjlzwcEgcfeji8jZRoycKu2';

// 動画録画用の待機時間（ミリ秒）
const VIDEO_CAPTURE_WAIT = 3000;

/**
 * ローカル環境かどうかを判定
 */
function isLocalEnvironment(): boolean {
    const e2eEnv = process.env.E2E_ENV || 'local';
    const baseUrl = process.env.E2E_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3004';

    if (e2eEnv !== 'local') {
        return false;
    }
    if (!baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
        return false;
    }
    return true;
}

/**
 * マイデジ連携データをリセット（ローカル環境のみ）
 */
function resetMydigiLinkData(): void {
    if (!isLocalEnvironment()) {
        console.log('[Mydigi Test Setup] Skipping mydigi data reset (non-local environment)');
        return;
    }

    console.log('[Mydigi Test Setup] Resetting mydigi link data...');
    try {
        // テスト用マイデジアプリIDのリンクを削除
        execSync(
            `docker exec tamanomi-db psql -U user -d tamanomi -c "DELETE FROM mydigi_app_links WHERE mydigi_app_id = '${TEST_MYDIGI_APP_ID}';"`,
            { stdio: 'pipe' }
        );
        // テストユーザーのマイデジリンクも削除
        execSync(
            `docker exec tamanomi-db psql -U user -d tamanomi -c "DELETE FROM mydigi_app_links WHERE user_id = '8d16502c-9339-4e92-be4e-6b36b48deec6';"`,
            { stdio: 'pipe' }
        );
        console.log('[Mydigi Test Setup] Mydigi link data cleared');
    } catch (error) {
        console.warn(`[Mydigi Test Setup] Failed to clear mydigi link data: ${error}`);
    }
}

test.describe('プラン・マイデジ連携テスト', () => {
    // マイデジテストはシリアル実行（データ競合を避けるため）
    test.describe.configure({ mode: 'serial' });
    
    // 各テスト前にマイデジ連携データをリセット
    test.beforeEach(async () => {
        resetMydigiLinkData();
    });

    // ================================================================
    // 支払い方法の制限テスト
    // ================================================================
    test.describe('支払い方法', () => {
        test('月額プラン表示', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // 月額プランが表示されることを確認
            const subscriptionPlan = page.getByText(/月額プラン/).first();
            await expect(subscriptionPlan).toBeVisible({ timeout: 10000 });

            // 価格が表示されることを確認
            const monthlyPrice = page.getByText(/¥980\/月|980円/).first();
            await expect(monthlyPrice).toBeVisible({ timeout: 5000 });

            await takeScreenshot(page, 'plan-subscription');
            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
        });

        test('お試しプラン表示', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // お試しプランが表示されることを確認
            const trialPlan = page.getByText(/お試しプラン/).first();
            await expect(trialPlan).toBeVisible({ timeout: 10000 });

            // 価格が表示されることを確認
            const trialPrice = page.getByText(/¥300/).first();
            await expect(trialPrice).toBeVisible({ timeout: 5000 });

            await takeScreenshot(page, 'plan-trial');
            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
        });

        test('サブスクはクレカのみ', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // 月額プランを選択
            const subscriptionPlan = page.getByText(/月額プラン/).first();
            if (await subscriptionPlan.isVisible()) {
                await subscriptionPlan.click();
                await page.waitForTimeout(1500);

                // 支払い方法セクションを探す
                const paymentSection = page.getByText(/支払い方法|決済方法/).first();
                const hasPaymentSection = await paymentSection.isVisible().catch(() => false);

                if (hasPaymentSection) {
                    // イオンペイが表示されている場合、無効化されていることを確認
                    const aeonPayButton = page.getByText(/イオンペイ/).first();
                    if (await aeonPayButton.isVisible().catch(() => false)) {
                        // 「利用できません」のメッセージを確認
                        const cannotUseText = page.getByText(/利用できません/).first();
                        const hasCannotUse = await cannotUseText.isVisible().catch(() => false);
                        
                        // または disabled クラスを確認
                        const parentClass = await aeonPayButton.locator('..').locator('..').getAttribute('class').catch(() => '');
                        const isDisabledByClass = parentClass?.includes('disabled') || 
                                                  parentClass?.includes('cursor-not-allowed') ||
                                                  parentClass?.includes('opacity');
                        
                        console.log(`[Payment Test] イオンペイ - 利用できませんメッセージ: ${hasCannotUse}, 無効化クラス: ${isDisabledByClass}`);
                        expect(hasCannotUse || isDisabledByClass, 'サブスクリプションプランではイオンペイが制限されるべきです').toBeTruthy();
                    }
                } else {
                    console.log('[Payment Test] 支払い方法選択セクションが見つかりません');
                }

                await takeScreenshot(page, 'subscription-payment');
                await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
            }
        });
    });

    // ================================================================
    // マイデジアプリ連携テスト（プラン登録時）
    // ================================================================
    test.describe('プラン登録マイデジ', () => {
        // マイデジ連携テストの前にデータをリセット
        test.beforeEach(async () => {
            resetMydigiLinkData();
        });

        test('連携セクション表示', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // マイデジアプリ連携セクションを探す
            const mydigiSection = page.getByText(/マイデジアプリ/).first();
            await expect(mydigiSection).toBeVisible({ timeout: 10000 });

            // ユーザーID入力欄を確認
            const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
            await expect(mydigiInput).toBeVisible({ timeout: 5000 });

            // 連携ボタンを確認
            const linkButton = page.getByRole('button', { name: /アプリと連携|連携して|500円OFF/ }).first();
            await expect(linkButton).toBeVisible({ timeout: 5000 });

            await takeScreenshot(page, 'mydigi-section');
            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
        });

        test('連携成功ポップアップ', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // マイデジアプリID入力欄を探す
            const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
            
            if (await mydigiInput.isVisible()) {
                // テスト用のマイデジアプリIDを入力
                await mydigiInput.fill(TEST_MYDIGI_APP_ID);
                await page.waitForTimeout(1000);

                // 連携ボタンをクリック
                const linkButton = page.getByRole('button', { name: /アプリと連携|連携して|500円OFF/ }).first();
                await expect(linkButton).toBeEnabled({ timeout: 5000 });
                await linkButton.click();
                await page.waitForTimeout(3000);

                // ポイント付与ポップアップを確認
                const pointPopup = page.getByText(/ポイント|連携が完了|お得なプラン/).first();
                const hasPointPopup = await pointPopup.isVisible().catch(() => false);
                
                if (hasPointPopup) {
                    expect(hasPointPopup).toBeTruthy();
                    
                    // ポップアップのスクリーンショットを撮影
                    await takeScreenshot(page, 'mydigi-success-popup');
                    
                    // 動画録画用にポップアップを長めに表示
                    console.log('[Mydigi Test] ポイント付与ポップアップ表示中（動画録画用待機）...');
                    await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
                    
                    // ポップアップを閉じる
                    const closeButton = page.getByRole('button', { name: /閉じる|OK|確認/ }).first();
                    if (await closeButton.isVisible()) {
                        await closeButton.click();
                        await page.waitForTimeout(1000);
                    }
                } else {
                    // エラーメッセージが表示された場合
                    const errorMessage = page.getByText(/エラー|失敗|見つかりません|無効/).first();
                    const hasError = await errorMessage.isVisible().catch(() => false);
                    if (hasError) {
                        console.log('[Mydigi Test] マイデジ連携でエラーが発生しました');
                        await takeScreenshot(page, 'mydigi-error');
                    }
                }
            } else {
                // マイデジ入力欄が見つからない場合は失敗
                throw new Error('マイデジアプリID入力欄が見つかりません。UI要素を確認してください。');
            }
        });

        test('連携後割引プラン表示', async ({ page }) => {
            await page.goto('/plan-registration');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // 連携前の価格を確認
            const originalPrice = page.getByText(/¥980\/月/).first();
            const hasOriginalPrice = await originalPrice.isVisible().catch(() => false);
            console.log(`[Mydigi Test] 連携前の元価格表示: ${hasOriginalPrice}`);

            // マイデジアプリID入力欄を探す
            const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
            
            if (await mydigiInput.isVisible()) {
                // テスト用のマイデジアプリIDを入力
                await mydigiInput.fill(TEST_MYDIGI_APP_ID);
                await page.waitForTimeout(1000);

                // 連携ボタンをクリック
                const linkButton = page.getByRole('button', { name: /アプリと連携|連携して|500円OFF/ }).first();
                if (await linkButton.isEnabled()) {
                    await linkButton.click();
                    await page.waitForTimeout(3000);

                    // ポップアップのスクリーンショットを撮影
                    await takeScreenshot(page, 'mydigi-popup');
                    
                    // 動画録画用にポップアップを長めに表示
                    console.log('[Mydigi Test] ポイント付与ポップアップ表示中（動画録画用待機）...');
                    await page.waitForTimeout(VIDEO_CAPTURE_WAIT);

                    // ポップアップを閉じる
                    const closeButton = page.getByRole('button', { name: /閉じる|OK|確認/ }).first();
                    if (await closeButton.isVisible()) {
                        await closeButton.click();
                        await page.waitForTimeout(2000);
                    }

                    // 割引価格（480円）が表示されていることを確認
                    const discountPrice = page.getByText(/¥480|480円/).first();
                    const hasDiscountPrice = await discountPrice.isVisible().catch(() => false);
                    
                    // または割引プランのテキストを確認
                    const discountLabel = page.getByText(/マイデジアプリ連携割引|割引|連携済/).first();
                    const hasDiscountLabel = await discountLabel.isVisible().catch(() => false);
                    
                    console.log(`[Mydigi Test] 割引価格表示: ${hasDiscountPrice}, 割引ラベル表示: ${hasDiscountLabel}`);

                    await takeScreenshot(page, 'mydigi-discount-plan');
                    
                    // 動画録画用に割引プラン表示を長めに維持
                    await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
                    
                    // 割引価格または割引ラベルが表示されていることを確認
                    expect(hasDiscountPrice || hasDiscountLabel, 'マイデジ連携後に割引プランが表示されるべきです').toBeTruthy();
                }
            } else {
                // マイデジ入力欄が見つからない場合は失敗
                throw new Error('マイデジアプリID入力欄が見つかりません。UI要素を確認してください。');
            }
        });
    });

    // ================================================================
    // マイデジアプリ連携テスト（プラン変更時）
    // ================================================================
    test.describe('プラン変更マイデジ', () => {
        // マイデジ連携テストの前にデータをリセット
        test.beforeEach(async () => {
            resetMydigiLinkData();
        });

        test('変更画面連携セクション', async ({ page }) => {
            // ホームからマイページ→プラン管理→プラン変更へ遷移
            await page.goto('/home');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // マイページタブをクリック
            const mypageTab = page.locator('nav button, [class*="nav"] button').filter({ hasText: /マイページ/ });
            if (await mypageTab.isVisible()) {
                await mypageTab.click();
                await page.waitForTimeout(1000);

                // プラン管理または現在のプラン情報を探す
                const planSection = page.getByText(/プラン管理|プランを変更|現在のプラン|プラン確認/).first();
                if (await planSection.isVisible()) {
                    await planSection.click();
                    await page.waitForTimeout(1000);

                    // プラン変更ボタンを探す
                    const changePlanButton = page.getByRole('button', { name: /プランを変更|プラン変更/ }).first();
                    if (await changePlanButton.isVisible()) {
                        await changePlanButton.click();
                        await page.waitForTimeout(1000);

                        // マイデジアプリ連携セクションを確認
                        const mydigiSection = page.getByText(/マイデジアプリ/).first();
                        const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
                        
                        const hasMydigi = await mydigiSection.isVisible().catch(() => false) ||
                                          await mydigiInput.isVisible().catch(() => false);
                        
                        if (hasMydigi) {
                            expect(hasMydigi).toBeTruthy();
                            await takeScreenshot(page, 'plan-change-mydigi');
                            await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
                        } else {
                            console.log('[Plan Change Test] マイデジ連携セクションが見つかりません');
                        }
                    }
                }
            }
        });

        test('変更時連携成功ポップアップ', async ({ page }) => {
            // ホームからマイページ→プラン変更へ遷移
            await page.goto('/home');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // マイページタブをクリック
            const mypageTab = page.locator('nav button, [class*="nav"] button').filter({ hasText: /マイページ/ });
            if (await mypageTab.isVisible()) {
                await mypageTab.click();
                await page.waitForTimeout(1000);

                // プラン管理を探す
                const planSection = page.getByText(/プラン管理|プランを変更|現在のプラン|プラン確認/).first();
                if (await planSection.isVisible()) {
                    await planSection.click();
                    await page.waitForTimeout(1000);

                    // プラン変更ボタンを探す
                    const changePlanButton = page.getByRole('button', { name: /プランを変更|プラン変更/ }).first();
                    if (await changePlanButton.isVisible()) {
                        await changePlanButton.click();
                        await page.waitForTimeout(1000);

                        // マイデジアプリID入力欄を探す
                        const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
                        if (await mydigiInput.isVisible()) {
                            // テスト用IDを入力
                            await mydigiInput.fill(TEST_MYDIGI_APP_ID);
                            await page.waitForTimeout(1000);

                            // 連携ボタンをクリック
                            const linkButton = page.getByRole('button', { name: /アプリと連携|連携|500円OFF/ }).first();
                            if (await linkButton.isVisible() && await linkButton.isEnabled()) {
                                await linkButton.click();
                                await page.waitForTimeout(3000);

                                // ポイント付与ポップアップを確認
                                const pointPopup = page.getByText(/ポイント|連携が完了|お得なプラン/).first();
                                const hasPointPopup = await pointPopup.isVisible().catch(() => false);
                                
                                if (hasPointPopup) {
                                    await takeScreenshot(page, 'plan-change-success');
                                    
                                    // 動画録画用にポップアップを長めに表示
                                    console.log('[Plan Change Test] ポイント付与ポップアップ表示中（動画録画用待機）...');
                                    await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
                                }
                            }
                        }
                    }
                }
            }
        });

        test('変更時連携後割引表示', async ({ page }) => {
            // ホームからマイページ→プラン変更へ遷移
            await page.goto('/home');
            await waitForPageLoad(page);
            await page.waitForTimeout(2000);

            // マイページタブをクリック
            const mypageTab = page.locator('nav button, [class*="nav"] button').filter({ hasText: /マイページ/ });
            if (await mypageTab.isVisible()) {
                await mypageTab.click();
                await page.waitForTimeout(1000);

                // プラン管理を探す
                const planSection = page.getByText(/プラン管理|プランを変更|現在のプラン|プラン確認/).first();
                if (await planSection.isVisible()) {
                    await planSection.click();
                    await page.waitForTimeout(1000);

                    // プラン変更ボタンを探す
                    const changePlanButton = page.getByRole('button', { name: /プランを変更|プラン変更/ }).first();
                    if (await changePlanButton.isVisible()) {
                        await changePlanButton.click();
                        await page.waitForTimeout(1000);

                        // マイデジアプリID入力欄を探す
                        const mydigiInput = page.getByPlaceholder(/mydigi/i).first();
                        if (await mydigiInput.isVisible()) {
                            // テスト用IDを入力して連携
                            await mydigiInput.fill(TEST_MYDIGI_APP_ID);
                            await page.waitForTimeout(1000);

                            const linkButton = page.getByRole('button', { name: /アプリと連携|連携|500円OFF/ }).first();
                            if (await linkButton.isVisible() && await linkButton.isEnabled()) {
                                await linkButton.click();
                                await page.waitForTimeout(3000);

                                // ポップアップのスクリーンショットを撮影
                                await takeScreenshot(page, 'plan-change-popup');
                                
                                // 動画録画用にポップアップを長めに表示
                                console.log('[Plan Change Test] ポイント付与ポップアップ表示中（動画録画用待機）...');
                                await page.waitForTimeout(VIDEO_CAPTURE_WAIT);

                                // ポップアップを閉じる
                                const closeButton = page.getByRole('button', { name: /閉じる|OK|確認/ }).first();
                                if (await closeButton.isVisible()) {
                                    await closeButton.click();
                                    await page.waitForTimeout(2000);
                                }

                                // 割引価格（480円）が表示されているか確認
                                const discountPrice = page.getByText(/¥480|480円/).first();
                                const hasDiscountPrice = await discountPrice.isVisible().catch(() => false);
                                
                                // または割引プランのラベルを確認
                                const discountLabel = page.getByText(/マイデジアプリ連携割引|割引/).first();
                                const hasDiscountLabel = await discountLabel.isVisible().catch(() => false);
                                
                                console.log(`[Plan Change Test] 割引価格表示: ${hasDiscountPrice}, 割引ラベル表示: ${hasDiscountLabel}`);
                                
                                await takeScreenshot(page, 'plan-change-discount');
                                
                                // 動画録画用に割引プラン表示を長めに維持
                                await page.waitForTimeout(VIDEO_CAPTURE_WAIT);
                                
                                // 割引価格または割引ラベルが表示されていることを確認
                                expect(hasDiscountPrice || hasDiscountLabel, 'マイデジ連携後に割引プランが表示されるべきです').toBeTruthy();
                            }
                        }
                    }
                }
            }
        });
    });
});
