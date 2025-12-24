/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      // 開発環境（MinIO）
      { protocol: 'http', hostname: 'localhost', port: '9000', pathname: '/nomoca-kagawa/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '9000', pathname: '/nomoca-kagawa/**' },
      // Docker 内部名でのアクセスにも対応
      { protocol: 'http', hostname: process.env.MINIO_HOST || 'minio', port: process.env.MINIO_PORT || '9000', pathname: '/nomoca-kagawa/**' },
      // 本番環境（Cloudflare R2）
      { protocol: 'https', hostname: 'dev-images.nomoca-kagawa.com' },
      { protocol: 'https', hostname: 'images.nomoca-kagawa.com' },
      { protocol: 'https', hostname: 'prod-images.nomoca-kagawa.com' },
    ],
  },
  // 静的ファイル配信の設定
  assetPrefix: '',
  trailingSlash: false,
  // セキュリティヘッダー設定
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
    
    const securityHeaders = [
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          isDev
            ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live"
            : "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          isDev
            ? `connect-src 'self' ws: wss: https://zipcloud.ibsnet.co.jp ${apiUrl} http://localhost:3002 http://localhost:9000 http://127.0.0.1:9000`
            : `connect-src 'self' https://zipcloud.ibsnet.co.jp ${apiUrl}`,
          isDev
            ? "img-src 'self' data: blob: https: http: http://localhost:9000 http://127.0.0.1:9000 http://minio:9000"
            : "img-src 'self' data: blob: https://dev-images.nomoca-kagawa.com https://images.nomoca-kagawa.com https://prod-images.nomoca-kagawa.com",
          "object-src 'none'",
          "worker-src 'self' blob:",
          "child-src 'self' blob:",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join('; ')
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self)'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
      },
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, private',
      },
      {
        key: 'Pragma',
        value: 'no-cache',
      },
    ];

    if (process.env.VERCEL_ENV === 'preview') {
      securityHeaders.push({
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow, noarchive'
      });
    }

    return [
      {
        // 全てのルートに適用（静的ファイルを除く）
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // APIルートにも明示的に適用
        source: '/api/:path*',
        headers: securityHeaders,
      },
      {
        // 静的ファイル（画像、フォント、CSS、JS）はキャッシュを有効化
        source: '/:path*\\.(svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$',
        headers: [
          ...securityHeaders.filter(h =>
            h.key !== 'Cache-Control' && h.key !== 'Pragma'
          ),
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // 静的ファイルのリライト設定
  async rewrites() {
    return [
      {
        source: '/:path*.png',
        destination: '/:path*.png',
      },
    ];
  },
};

export default nextConfig;
