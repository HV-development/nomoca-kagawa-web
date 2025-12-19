#!/bin/sh
set -e

echo "🚀 Starting Web app setup..."

# GitHub Packagesへの認証設定（実行時）
echo "🔍 Checking GITHUB_TOKEN..."
if [ -n "$GITHUB_TOKEN" ]; then
  echo "🔐 Setting up GitHub Packages authentication..."
  # /app/.npmrc を作成
  echo "@hv-development:registry=https://npm.pkg.github.com" > /app/.npmrc
  echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> /app/.npmrc
  echo "//npm.pkg.github.com/:always-auth=true" >> /app/.npmrc
  # /root/.npmrc にも作成（pnpmが使用する可能性があるため）
  mkdir -p /root
  echo "@hv-development:registry=https://npm.pkg.github.com" > /root/.npmrc
  echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> /root/.npmrc
  echo "//npm.pkg.github.com/:always-auth=true" >> /root/.npmrc
  # デバッグ: .npmrcファイルの内容を確認（トークンは一部のみ表示）
  echo "📋 /app/.npmrc contents:"
  cat /app/.npmrc | sed 's/\(_authToken=\).*/\1***/' || true
  echo "✅ GitHub Packages authentication configured"
else
  echo "⚠️  GITHUB_TOKEN not set, GitHub Packages may fail"
  echo "Environment variables:"
  env | grep -i github || echo "No GITHUB_TOKEN found in environment"
fi

# package.jsonの変更を検出して必要に応じて再インストール
PACKAGE_JSON_HASH=""
HASH_FILE="/tmp/package_json_hash.txt"

if [ -f "package.json" ]; then
  PACKAGE_JSON_HASH=$(md5sum package.json | cut -d' ' -f1)
fi

# node_modulesが存在しない、またはpackage.jsonが変更された場合にインストール
if [ ! -d "node_modules/next" ] || [ ! -f "$HASH_FILE" ] || [ "$(cat "$HASH_FILE" 2>/dev/null)" != "$PACKAGE_JSON_HASH" ]; then
  echo "📦 Installing dependencies..."
  cd /app
  # ホストからマウントされているpackage.json / pnpm-lock.yamlを直接書き換えると
  # WSL2 + Docker環境で「Resource busy」になることがあるため、ここでは編集せずに
  # そのままインストールのみ行う
  pnpm install --no-frozen-lockfile --prefer-offline || pnpm install --no-frozen-lockfile || true
  echo "$PACKAGE_JSON_HASH" > "$HASH_FILE"
  echo "✅ Dependencies installed"
else
  echo "✅ Dependencies already installed (skipping)"
fi

# schemas のビルドとコピー
echo "🔨 Building tamanomi-schemas..."
cd /app/tamanomi-schemas
# tamanomi-schemas ディレクトリにも .npmrc をコピー
if [ -f /app/.npmrc ]; then
  cp /app/.npmrc /app/tamanomi-schemas/.npmrc
fi
# node_modulesの中身を確認（空または不完全な場合は再インストール）
if [ ! -d "node_modules" ] || [ ! -d "node_modules/typescript" ]; then
  echo "📦 Installing tamanomi-schemas dependencies..."
  pnpm install --prefer-offline || pnpm install || {
    echo "❌ Failed to install tamanomi-schemas dependencies"
    exit 1
  }
  echo "✅ tamanomi-schemas dependencies installed"
fi
pnpm run build || {
  echo "❌ Failed to build tamanomi-schemas"
  exit 1
}

echo "📋 Copying schemas to node_modules..."
cd /app
mkdir -p /app/node_modules/@hv-development/schemas
cp -r /app/tamanomi-schemas/dist /app/node_modules/@hv-development/schemas/
cp /app/tamanomi-schemas/package.json /app/node_modules/@hv-development/schemas/
echo "✅ Schemas built and copied"

echo "🎉 Setup complete! Starting application..."
exec "$@"

