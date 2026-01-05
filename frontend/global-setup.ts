/**
 * Playwright グローバルセットアップ
 * 
 * 全テスト実行前に一度だけ実行されます。
 * テストデータの初期化を行います。
 */

import { setupAllTestData, isLocalEnvironment } from './e2e/utils/test-data-setup';

async function globalSetup() {
    console.log('\n========================================');
    console.log('E2E Test Global Setup');
    console.log('========================================\n');
    
    if (!isLocalEnvironment()) {
        console.log('[Global Setup] Skipping test data setup (not local environment)');
        return;
    }
    
    try {
        setupAllTestData();
        console.log('\n[Global Setup] Test data setup completed successfully\n');
    } catch (error) {
        console.error('[Global Setup] Error setting up test data:', error);
        // エラーでもテストは続行する
    }
}

export default globalSetup;

