# nomoca-kagawa-web

香川県の飲食店向けサブスクリプションサービス ユーザー向けWebアプリケーション - Next.js 15 + TypeScript

## 🚀 特徴

- **Next.js 15**: App Routerを使用したモダンなNext.jsアプリケーション
- **TypeScript**: 型安全性を確保
- **Tailwind CSS + shadcn/ui**: 美しいUIコンポーネント
- **QR決済**: AEON Pay / PayPay連携
- **ポイントシステム**: Yomsubi連携によるポイント付与
- **API統合**: `@hv-development/schemas`パッケージを使用した型安全なAPI通信

## 🛠️ ローカル開発

### 単独での開発サーバー起動

```bash
cd nomoca-kagawa-web/frontend

# 開発サーバー起動
pnpm dev
# → http://localhost:3000

# 本番ビルド
pnpm build

# 本番サーバー起動
pnpm start
```

### コード品質

```bash
# リント実行
pnpm lint
```

## 📦 主な機能

### ユーザー向け機能

- 会員登録・ログイン（OTP認証）
- プラン申込み・管理
- 店舗検索・お気に入り
- クーポン取得・利用
- QRコード決済
- マイページ（利用履歴、支払い履歴）

### 技術スタック

- **フロントエンド**: Next.js 15, React 18, TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui
- **UIコンポーネント**: Radix UI
- **フォーム**: React Hook Form + Zod
- **状態管理**: Zustand
- **アイコン**: Lucide React

## 🚀 デプロイ (Vercel)

Vercelへのデプロイを推奨します。

### 環境変数

```bash
# API設定
API_BASE_URL=https://your-api-domain.railway.app
NEXT_PUBLIC_API_URL=https://your-api-domain.railway.app

# セッション暗号化
SESSION_SECRET=your-secure-session-secret-key-here-min-32-chars

# マイページ機能制御
NEXT_PUBLIC_MYPAGE_SHOW_USAGE_HISTORY=true
NEXT_PUBLIC_MYPAGE_SHOW_PAYMENT_HISTORY=true
NEXT_PUBLIC_MYPAGE_SHOW_PLAN_MANAGEMENT=true
```

詳細は [env.example](./frontend/env.example) を参照。

## 📝 ライセンス

ISC License
