'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * クライアント側の未捕捉例外をキャッチし、フォールバックUIを表示する。
 * 「Application error: a client-side exception has occurred」の代わりに
 * 実際のエラー内容を表示して原因調査を可能にする。
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 本番ではログ送信などに利用可能
    console.error('[Error Boundary]', error.message, error.stack)
  }, [error])

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold text-red-600 mb-2">エラーが発生しました</h1>
        <p className="text-gray-700 mb-4">
          申し訳ございません。ページの読み込み中に問題が発生しました。
        </p>
        {isDev && (
          <div className="mb-4 p-3 bg-gray-100 rounded text-sm overflow-auto max-h-48">
            <p className="font-mono text-red-700 break-words">{error.message}</p>
            {error.stack && (
              <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap break-words">
                {error.stack}
              </pre>
            )}
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            再試行
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            トップへ
          </Link>
        </div>
      </div>
    </div>
  )
}
