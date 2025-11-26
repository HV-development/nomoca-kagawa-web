# nomoca kagawa

香川県向けの nomoca サービスのティザーサイトです。

## 技術スタック

- **フレームワーク**: Next.js 15.5.6
- **言語**: TypeScript 5.9
- **スタイリング**: Tailwind CSS 3.4
- **パッケージマネージャー**: pnpm 8.15.8
- **Node.js**: 22.x

## ディレクトリ構成

```
nomoca-kagawa/
├── frontend/                # Next.js フロントエンド
│   ├── src/
│   │   ├── app/            # App Router ページ
│   │   │   ├── page.tsx    # ルートページ
│   │   │   └── lp/         # ランディングページ
│   │   └── components/
│   │       └── templates/  # ページテンプレート
│   ├── public/             # 静的ファイル
│   ├── package.json
│   └── tsconfig.json
├── infrastructure/
│   └── docker/             # Docker 設定
│       ├── Dockerfile
│       └── docker-compose.yml
└── README.md
```

## セットアップ

### 前提条件

- Node.js 22.x
- pnpm 8.15.8+

### ローカル開発（通常）

```bash
cd frontend
pnpm install
pnpm dev
```

### Docker を使用した開発

```bash
cd infrastructure/docker
docker-compose up --build
```

開発サーバーは http://localhost:3000 で起動します。

## ページ構成

| パス | 説明 |
|------|------|
| `/` | ティザーページ（ルート） |
| `/lp` | ランディングページ |

## ビルド

```bash
cd frontend
pnpm build
```

## ライセンス

Private

