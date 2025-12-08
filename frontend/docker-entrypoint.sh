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
if [ ! -d "node_modules/next" ] || [ ! -f "$HASH_FILE" ] || [ "$(cat $HASH_FILE 2>/dev/null)" != "$PACKAGE_JSON_HASH" ]; then
  echo "📦 Installing dependencies..."
  cd /app
  # @hv-development/schemasはローカルでビルドされるため、一時的にpackage.jsonとpnpm-lock.yamlから除外
  if [ -f "package.json" ]; then
    cp package.json package.json.backup
    # package.jsonから@hv-development/schemasの行を削除
    sed -i '/"@hv-development\/schemas"/d' package.json || \
    grep -v '"@hv-development/schemas"' package.json.backup > package.json || \
    cp package.json.backup package.json
  fi
  # pnpm-lock.yamlを一時的に削除（@hv-development/schemasの参照を避けるため）
  if [ -f "pnpm-lock.yaml" ]; then
    rm -f pnpm-lock.yaml.backup 2>/dev/null || true
    cp pnpm-lock.yaml pnpm-lock.yaml.backup || true
    rm -f pnpm-lock.yaml
  fi
  # 依存関係をインストール（@hv-development/schemasを除く、lockfileなし）
  pnpm install --no-frozen-lockfile --prefer-offline || pnpm install --no-frozen-lockfile || true
  # package.jsonとpnpm-lock.yamlを復元
  if [ -f "package.json.backup" ]; then
    mv package.json.backup package.json
  fi
  if [ -f "pnpm-lock.yaml.backup" ]; then
    mv pnpm-lock.yaml.backup pnpm-lock.yaml
  fi
  echo "$PACKAGE_JSON_HASH" > "$HASH_FILE"
  echo "✅ Dependencies installed"
else
  echo "✅ Dependencies already installed (skipping)"
fi

# schemas のビルドとコピー
echo "🔨 Building nomoca-kagawa-schemas..."
cd /app/nomoca-kagawa-schemas
# nomoca-kagawa-schemas ディレクトリにも .npmrc をコピー
if [ -f /app/.npmrc ]; then
  cp /app/.npmrc /app/nomoca-kagawa-schemas/.npmrc
fi
# node_modulesの中身を確認（空または不完全な場合は再インストール）
if [ ! -d "node_modules" ] || [ ! -d "node_modules/typescript" ]; then
  echo "📦 Installing nomoca-kagawa-schemas dependencies..."
  pnpm install --prefer-offline || pnpm install || {
    echo "❌ Failed to install nomoca-kagawa-schemas dependencies"
    exit 1
  }
  echo "✅ nomoca-kagawa-schemas dependencies installed"
fi
pnpm run build || {
  echo "❌ Failed to build nomoca-kagawa-schemas"
  exit 1
}

echo "📋 Copying schemas to node_modules..."
cd /app
mkdir -p /app/node_modules/@hv-development/schemas
cp -r /app/nomoca-kagawa-schemas/dist /app/node_modules/@hv-development/schemas/
cp /app/nomoca-kagawa-schemas/package.json /app/node_modules/@hv-development/schemas/
echo "✅ Schemas built and copied"

echo "🎉 Setup complete! Starting application..."
exec "$@"

