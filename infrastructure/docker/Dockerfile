# Next.jsアプリケーション用Dockerfile
FROM node:22-alpine

WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係ファイルのコピー
COPY frontend/package.json frontend/pnpm-lock.yaml* ./

# パッケージのインストール
RUN pnpm install --no-frozen-lockfile

# ソースコードをコピー
COPY frontend ./

# 開発サーバーのポート
EXPOSE 3000

# 開発サーバー起動（デフォルトコマンド）
CMD ["pnpm", "dev"]

