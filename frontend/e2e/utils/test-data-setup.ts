import { execSync } from 'child_process';
import { randomUUID } from 'crypto';

/**
 * E2Eテスト用データセットアップユーティリティ
 * 
 * ローカル環境でのみ実行され、テストに必要なデータを準備します。
 */

const DB_CONTAINER = 'tamanomi-db';
const DB_USER = 'user';
const DB_NAME = 'tamanomi';
const APP_NAME = 'nomoca-kagawa';

// テストユーザー定義
export const TEST_USERS = {
    // プラン登録済みユーザー（メインテストユーザー）
    WITH_PLAN: {
        email: 'nomoca-user@example.com',
        password: 'nomoca-user123',
        userId: '8d16502c-9339-4e92-be4e-6b36b48deec6',
    },
    // プラン未登録ユーザー
    NO_PLAN: {
        email: 'nomoca-user2@example.com',
        password: 'nomoca-user2-123',
        userId: 'a7cb1f83-7f4b-4940-94cc-b6536409da32',
    },
    // 未成年ユーザー（アルコールクーポンテスト用）
    UNDERAGE: {
        email: 'nomoca-underage@example.com',
        password: 'nomoca-underage123',
        userId: '22d7ff4f-5604-4c02-846b-8173021a8560',
    },
};

/**
 * ローカル環境かどうかを判定
 */
export function isLocalEnvironment(): boolean {
    const e2eEnv = process.env.E2E_ENV || 'local';
    const baseUrl = process.env.E2E_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3004';
    if (e2eEnv !== 'local') return false;
    if (!baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) return false;
    return true;
}

/**
 * SQLコマンドを実行
 */
function execSql(sql: string, options: { silent?: boolean } = {}): string {
    try {
        const result = execSync(
            `docker exec ${DB_CONTAINER} psql -U ${DB_USER} -d ${DB_NAME} -t -c "${sql.replace(/"/g, '\\"')}"`,
            { stdio: options.silent ? 'pipe' : 'pipe' }
        );
        return result.toString().trim();
    } catch (error) {
        if (!options.silent) {
            console.warn('[Test Data Setup] SQL execution warning:', error);
        }
        return '';
    }
}

/**
 * アプリケーションIDを取得
 */
function getApplicationId(): string {
    const result = execSql(`SELECT id FROM applications WHERE name = '${APP_NAME}'`);
    return result.trim();
}

/**
 * プランIDを取得（月額プラン）
 */
function getSubscriptionPlanId(appId: string): string {
    const result = execSql(`SELECT id FROM plans WHERE application_id = '${appId}' AND is_subscription = true AND status = 'active' LIMIT 1`);
    return result.trim();
}

/**
 * ユーザーにプランを登録
 */
export function ensureUserHasPlan(userId: string): void {
    if (!isLocalEnvironment()) return;
    
    console.log(`[Test Data Setup] Ensuring user ${userId} has an active plan...`);
    
    const appId = getApplicationId();
    if (!appId) {
        console.warn('[Test Data Setup] Application not found');
        return;
    }
    
    // 既存のアクティブプランがあるか確認
    const existingPlan = execSql(`SELECT id FROM user_plans WHERE user_id = '${userId}' AND status = 'active' AND (valid_until IS NULL OR valid_until > NOW())`);
    
    if (existingPlan) {
        console.log('[Test Data Setup] User already has an active plan');
        return;
    }
    
    // プランIDを取得
    const planId = getSubscriptionPlanId(appId);
    if (!planId) {
        console.warn('[Test Data Setup] No subscription plan found');
        return;
    }
    
    // プランを登録
    const userPlanId = randomUUID();
    const sql = `INSERT INTO user_plans (id, user_id, plan_id, status, created_at, updated_at, application_id) 
                 VALUES ('${userPlanId}', '${userId}', '${planId}', 'active', NOW(), NOW(), '${appId}')
                 ON CONFLICT DO NOTHING`;
    execSql(sql);
    console.log('[Test Data Setup] User plan registered');
}

/**
 * ユーザーのプランを削除（プラン未登録テスト用）
 */
export function ensureUserHasNoPlan(userId: string): void {
    if (!isLocalEnvironment()) return;
    
    console.log(`[Test Data Setup] Ensuring user ${userId} has no active plan...`);
    
    execSql(`UPDATE user_plans SET status = 'cancelled', deleted_at = NOW() WHERE user_id = '${userId}' AND status = 'active'`);
    console.log('[Test Data Setup] User plans deactivated');
}

/**
 * クーポン使用履歴をクリア
 */
export function clearCouponUsageHistory(userId?: string): void {
    if (!isLocalEnvironment()) return;
    
    console.log('[Test Data Setup] Clearing coupon usage history...');
    
    if (userId) {
        execSql(`DELETE FROM coupon_usage_history WHERE user_id = '${userId}'`);
    } else {
        // 全テストユーザーの履歴をクリア
        const userIds = Object.values(TEST_USERS).map(u => `'${u.userId}'`).join(',');
        execSql(`DELETE FROM coupon_usage_history WHERE user_id IN (${userIds})`);
    }
    console.log('[Test Data Setup] Coupon usage history cleared');
}

/**
 * テストクーポンを作成
 */
export function ensureTestCouponsExist(): void {
    if (!isLocalEnvironment()) return;
    
    console.log('[Test Data Setup] Ensuring test coupons exist...');
    
    const appId = getApplicationId();
    if (!appId) {
        console.warn('[Test Data Setup] Application not found');
        return;
    }
    
    // 既存のクーポンを有効化
    execSql(`UPDATE coupons SET status = 'approved', is_public = true 
             WHERE shop_id IN (SELECT id FROM shops WHERE application_id = '${appId}') 
             AND deleted_at IS NULL`);
    
    // クーポンがない店舗にテストクーポンを作成
    const shopsWithoutCoupons = execSql(`
        SELECT s.id, s.name FROM shops s 
        LEFT JOIN coupons c ON c.shop_id = s.id AND c.deleted_at IS NULL AND c.status = 'approved'
        WHERE s.application_id = '${appId}' AND c.id IS NULL
        GROUP BY s.id, s.name
    `);
    
    if (shopsWithoutCoupons) {
        const shops = shopsWithoutCoupons.split('\n').filter(Boolean);
        for (const shopLine of shops) {
            const [shopId, shopName] = shopLine.split('|').map(s => s.trim());
            if (!shopId) continue;
            
            // ソフトドリンクのクーポンを作成
            const softDrinkCouponId = randomUUID();
            execSql(`INSERT INTO coupons (id, shop_id, title, description, conditions, status, is_public, "drinkType", created_at, updated_at) 
                     VALUES ('${softDrinkCouponId}', '${shopId}', '【テスト】${shopName} ソフトドリンク無料', 'E2Eテスト用', 'テスト専用', 'approved', true, 'soft_drink', NOW(), NOW())`, { silent: true });
            
            // アルコールのクーポンを作成
            const alcoholCouponId = randomUUID();
            execSql(`INSERT INTO coupons (id, shop_id, title, description, conditions, status, is_public, "drinkType", created_at, updated_at) 
                     VALUES ('${alcoholCouponId}', '${shopId}', '【テスト】${shopName} ビール無料', 'E2Eテスト用', 'テスト専用', 'approved', true, 'alcohol', NOW(), NOW())`, { silent: true });
            
            console.log(`[Test Data Setup] Created test coupons for ${shopName}`);
        }
    }
    
    // クーポン数を確認
    const couponCount = execSql(`SELECT COUNT(*) FROM coupons 
                                  WHERE shop_id IN (SELECT id FROM shops WHERE application_id = '${appId}') 
                                  AND deleted_at IS NULL AND status = 'approved'`);
    console.log(`[Test Data Setup] Total active coupons: ${couponCount}`);
}

/**
 * マイデジ連携データをリセット
 */
export function resetMydigiLinkData(mydigiAppId?: string): void {
    if (!isLocalEnvironment()) return;
    
    console.log('[Test Data Setup] Resetting mydigi link data...');
    
    if (mydigiAppId) {
        execSql(`DELETE FROM mydigi_app_links WHERE mydigi_app_id = '${mydigiAppId}'`);
    } else {
        // テストユーザーの連携データをクリア
        const userIds = Object.values(TEST_USERS).map(u => `'${u.userId}'`).join(',');
        execSql(`DELETE FROM mydigi_app_links WHERE user_id IN (${userIds})`);
    }
    console.log('[Test Data Setup] Mydigi link data cleared');
}

/**
 * 全テストデータをセットアップ（メインセットアップ関数）
 */
export function setupAllTestData(): void {
    if (!isLocalEnvironment()) {
        console.log('[Test Data Setup] Skipping - not in local environment');
        return;
    }
    
    console.log('[Test Data Setup] === Starting full test data setup ===');
    
    // 1. テストクーポンを確保
    ensureTestCouponsExist();
    
    // 2. メインテストユーザーにプランを登録
    ensureUserHasPlan(TEST_USERS.WITH_PLAN.userId);
    
    // 3. プラン未登録ユーザーのプランを削除
    ensureUserHasNoPlan(TEST_USERS.NO_PLAN.userId);
    
    // 4. クーポン使用履歴をクリア
    clearCouponUsageHistory();
    
    // 5. マイデジ連携データをリセット
    resetMydigiLinkData();
    
    console.log('[Test Data Setup] === Test data setup completed ===');
}

/**
 * テスト後のクリーンアップ
 */
export function cleanupTestData(): void {
    if (!isLocalEnvironment()) return;
    
    console.log('[Test Data Setup] Cleaning up test data...');
    
    // クーポン使用履歴をクリア
    clearCouponUsageHistory();
    
    // マイデジ連携データをリセット
    resetMydigiLinkData();
    
    console.log('[Test Data Setup] Cleanup completed');
}

