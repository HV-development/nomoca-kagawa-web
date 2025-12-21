import { NextRequest } from 'next/server'
import { buildApiUrl } from '@/lib/api-config'
import { secureFetchWithCommonHeaders } from '@/lib/fetch-utils'
import { createNoCacheResponse } from '@/lib/response-utils'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mydigiAppId } = body

    if (!mydigiAppId || mydigiAppId.trim() === '') {
      return createNoCacheResponse(
        { error: 'マイデジアプリIDを入力してください' },
        { status: 400 }
      )
    }

    const fullUrl = buildApiUrl('/users/me/link-mydigi-app')

    const response = await secureFetchWithCommonHeaders(request, fullUrl, {
      method: 'POST',
      headerOptions: {
        requireAuth: true, // 認証が必要
      },
      body: JSON.stringify({ mydigiAppId }),
    })

    // 認証エラーの場合は401を返す
    if (response.status === 401) {
      return createNoCacheResponse(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const data = await response.json()

    if (!response.ok) {
      console.error('Backend API error:', data)
      return createNoCacheResponse(
        { error: data.error?.message || 'マイデジアプリ連携に失敗しました' },
        { status: response.status }
      )
    }

    return createNoCacheResponse(data)

  } catch (error) {
    console.error('Link mydigi app route error:', error)
    return createNoCacheResponse(
      { error: 'マイデジアプリ連携中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

