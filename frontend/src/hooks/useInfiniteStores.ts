/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Store } from '@/types/store'
import { mapShopToStore } from '@/lib/shop-to-store'

interface UseInfiniteStoresOptions {
  limit?: number
  selectedAreas?: string[]
  selectedGenres?: string[]
  isNearbyFilter?: boolean
  currentLocation?: { latitude: number; longitude: number } | null
  isLocationLoading?: boolean
}

interface UseInfiniteStoresResult {
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  page: number
  hasMore: boolean
  sentinelRef: (node: Element | null) => void
  loadNext: () => Promise<{ items: Store[]; page: number; hasMore: boolean } | null>
  items: Store[]
}

export function useInfiniteStores(options: UseInfiniteStoresOptions = {}): UseInfiniteStoresResult {
  const {
    limit = 20,
    selectedAreas = [],
    selectedGenres = [],
    isNearbyFilter = false,
    currentLocation = null,
    isLocationLoading = false,
  } = options

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelElementRef = useRef<Element | null>(null)
  const isFirstLoadRef = useRef(true)
  const [items, setItems] = useState<Store[]>([])
  // 連続呼び出しを防ぐためのタイムスタンプ
  const lastLoadTimeRef = useRef<number>(0)

  // pageとhasMoreをrefで保持（loadNextのコールバックが古いステートを参照する問題を回避）
  const pageRef = useRef(page)
  const hasMoreRef = useRef(hasMore)

  // フィルターが変更されたときに再取得するためのキー
  const filterKeyRef = useRef<string>('')

  // 最新のfetchPageを保持するためのref（初期値は空の関数）
  const fetchPageRef = useRef<((targetPage: number) => Promise<{ items: Store[]; page: number; hasMore: boolean }>) | null>(null)

  const fetchPage = useCallback(
    async (targetPage: number) => {
      try {
        // Cookieベースの認証のみを使用（localStorageは廃止）
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }

        // フィルターパラメータを構築
        const queryParams = new URLSearchParams({
          page: targetPage.toString(),
          limit: limit.toString(),
        })

        // エリアフィルターを追加（複数エリアの場合はカンマ区切りでareaパラメータに設定）
        if (selectedAreas.length > 0) {
          // エリア名をそのまま送信（DBのareaカラムと直接比較するため）
          queryParams.append('area', selectedAreas.join(','))
        }

        // ジャンルフィルターを追加（複数ジャンルをカンマ区切りで送信）
        // 管理画面に合わせて、selectedGenresは直接ジャンルIDの配列として扱う
        if (selectedGenres.length > 0) {
          queryParams.append('genreId', selectedGenres.join(','))
        }

        // 近くのお店: サーバーサイドで距離順ソート（全件ソート→ページング）
        if (isNearbyFilter && currentLocation) {
          queryParams.append('sortBy', 'distance')
          queryParams.append('sortOrder', 'asc')
          queryParams.append('latitude', String(currentLocation.latitude))
          queryParams.append('longitude', String(currentLocation.longitude))
        }

        const url = `/api/shops?${queryParams.toString()}`

        let res: Response
        try {
          res = await fetch(url, {
            method: 'GET',
            headers,
            credentials: 'include', // Cookieを送信
          })
        } catch (fetchError) {
          console.error('[useInfiniteStores] Fetch error:', {
            error: fetchError,
            errorConstructor: fetchError?.constructor?.name,
            isTypeError: fetchError instanceof TypeError,
            errorType: typeof fetchError,
            errorName: fetchError instanceof Error ? fetchError.name : 'Unknown',
            errorMessage: fetchError instanceof Error ? fetchError.message : String(fetchError),
            errorStack: fetchError instanceof Error ? fetchError.stack : undefined,
            url,
          })
          
          // エラーの種類に応じて適切なメッセージを返す
          let errorMessage = 'ネットワークエラーが発生しました'
          
          // AbortError（タイムアウト）の場合はタイムアウトメッセージを返す
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            errorMessage = 'リクエストがタイムアウトしました。しばらくしてから再度お試しください。'
          }
          // TypeError（ネットワークエラー、接続失敗など）の場合はネットワークエラーメッセージを返す
          else if (fetchError instanceof TypeError) {
            errorMessage = 'ネットワークエラーが発生しました'
          }
          // エラーメッセージに'fetch'が含まれている場合もネットワークエラーとして扱う
          else if (fetchError instanceof Error && (fetchError.message.includes('fetch') || fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError'))) {
            errorMessage = 'ネットワークエラーが発生しました'
          }
          // その他のエラーもネットワークエラーとして扱う（Playwrightのroute.abort('failed')など）
          else {
            errorMessage = 'ネットワークエラーが発生しました'
          }
          
          console.log('[useInfiniteStores] Throwing error:', errorMessage)
          throw new Error(errorMessage)
        }
        // レスポンスをテキストとして取得（成功・失敗どちらの場合でも使用）
        let responseText = ''
        try {
          responseText = await res.text()
        } catch (textError) {
          console.error('[useInfiniteStores] Failed to read response text:', textError)
          responseText = ''
        }

        if (!res.ok) {
          // 401エラーの場合はログイン画面にリダイレクト
          if (res.status === 401) {
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
            throw new Error('認証が必要です')
          }

          interface ErrorData {
            error?: {
              message?: string;
              code?: string;
            };
            message?: string;
          }
          let data: ErrorData | string | null = null
          let errorMessage = ''

          if (responseText.trim()) {
            try {
              data = JSON.parse(responseText) as ErrorData
            } catch (jsonError) {
              console.error('[useInfiniteStores] Failed to parse JSON:', jsonError)
              console.error('[useInfiniteStores] Response text (first 500 chars):', responseText.substring(0, 500))
              // JSON解析に失敗した場合は、テキストをメッセージとして使用
              data = { message: responseText.substring(0, 200) || 'レスポンスの解析に失敗しました' }
            }
          } else {
            // レスポンスが空の場合
            console.error('[useInfiniteStores] Empty response body')
            data = { message: `レスポンスが空です (${res.status})` }
          }

          // エラーメッセージの抽出（複数の形式に対応）
          // 優先順位: error.message > message > error.code > デフォルトメッセージ
          console.log('[useInfiniteStores] Extracting error message from data:', {
            data,
            hasError: typeof data === 'object' && data !== null && 'error' in data,
            errorMessage: typeof data === 'object' && data !== null && 'error' in data ? data.error?.message : undefined,
            hasMessage: typeof data === 'object' && data !== null && 'message' in data,
            message: typeof data === 'object' && data !== null && 'message' in data ? data.message : undefined,
          })
          if (typeof data === 'object' && data !== null && 'error' in data && data.error?.message) {
            errorMessage = data.error.message
            console.log('[useInfiniteStores] Extracted error message from data.error.message:', errorMessage)
          } else if (typeof data === 'object' && data !== null && 'message' in data && data.message) {
            errorMessage = data.message
            console.log('[useInfiniteStores] Extracted error message from data.message:', errorMessage)
          } else if (typeof data === 'object' && data !== null && 'error' in data && data.error?.code) {
            // codeのみの場合は、500系エラーなら共通メッセージを使用
            if (res.status >= 500) {
              errorMessage = 'システムエラーが発生しました。しばらくしてから再度お試しください。'
            } else {
              errorMessage = data.error.code
            }
          } else if (typeof data === 'string') {
            errorMessage = data
          } else if (typeof data === 'object' && data !== null && Object.keys(data).length === 0) {
            // 空のオブジェクトの場合、500系エラーなら共通メッセージを使用
            if (res.status >= 500) {
              errorMessage = 'システムエラーが発生しました。しばらくしてから再度お試しください。'
            } else {
              errorMessage = `店舗情報の取得に失敗しました (${res.status} ${res.statusText})`
            }
          } else {
            // 500系エラーなら共通メッセージを使用
            if (res.status >= 500) {
              errorMessage = 'システムエラーが発生しました。しばらくしてから再度お試しください。'
            } else {
              errorMessage = `店舗情報の取得に失敗しました (${res.status})`
            }
          }

          console.error('[useInfiniteStores] Response error:', {
            status: res.status,
            statusText: res.statusText,
            url: res.url,
            requestUrl: url,
            data,
            dataStringified: JSON.stringify(data),
            responseTextLength: responseText.length,
            responseTextPreview: responseText.substring(0, 500),
            errorMessage,
          })
          console.log('[useInfiniteStores] About to throw error with message:', errorMessage)
          // エラーメッセージが空の場合はデフォルトメッセージを使用
          if (!errorMessage || errorMessage.trim() === '') {
            errorMessage = res.status >= 500 
              ? 'システムエラーが発生しました。しばらくしてから再度お試しください。'
              : `リクエストに失敗しました (${res.status})`
            console.log('[useInfiniteStores] Using default error message:', errorMessage)
          }
          throw new Error(errorMessage)
        }

        // 成功時はJSONとして解析
        let data: any = {}
        if (responseText.trim()) {
          try {
            data = JSON.parse(responseText)
          } catch (jsonError) {
            console.error('[useInfiniteStores] Failed to parse success response as JSON:', jsonError)
            console.error('[useInfiniteStores] Response text (first 500 chars):', responseText.substring(0, 500))
            throw new Error('レスポンスの解析に失敗しました')
          }
        } else {
          console.error('[useInfiniteStores] Empty success response body')
          throw new Error('レスポンスが空です')
        }

        const items: Store[] = (data?.shops || []).map(mapShopToStore)

        const pagination = data?.pagination || {}
        const totalPages = typeof pagination.totalPages === 'number' ? pagination.totalPages : targetPage

        return {
          items,
          page: targetPage,
          hasMore: targetPage < totalPages,
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : 'エラーが発生しました'
        throw new Error(message)
      }
    },
    [limit, selectedAreas, selectedGenres, isNearbyFilter, currentLocation]
  )

  // fetchPageが変更されたらrefを更新
  useEffect(() => {
    fetchPageRef.current = fetchPage
  }, [fetchPage])

  // pageとhasMoreが変更されたらrefを更新
  useEffect(() => {
    pageRef.current = page
  }, [page])

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  const loadNext = useCallback(async () => {
    // 直近でエラーが発生している場合や、ロード中/末尾到達時は再取得しない
    // refを使用することで、loadNextが再作成されずに最新の状態を参照できる
    if (isLoading || isLoadingMore || !hasMoreRef.current || error) return null
    
    // 連続呼び出しを防ぐ（1000ms以内の再呼び出しはスキップ）
    const now = Date.now()
    if (now - lastLoadTimeRef.current < 1000) {
      return null
    }
    lastLoadTimeRef.current = now
    
    setIsLoadingMore(true)
    setError(null)
    try {
      const currentPage = pageRef.current
      const result = await fetchPage(currentPage + 1)
      setPage(result.page)
      setHasMore(result.hasMore)
      if (result.items?.length) {
        setItems(prev => [...prev, ...result.items])
      }
      setIsLoadingMore(false)
      return result
    } catch (e) {
      setIsLoadingMore(false)
      const message = e instanceof Error ? e.message : 'エラーが発生しました'
      setError(message)
      return null
    }
  }, [error, fetchPage, isLoading, isLoadingMore])

  // 初回ロード完了を追跡するref
  const initialLoadCompletedRef = useRef(false)
  // 初回ロードの実行中フラグをrefで管理
  const initialLoadInProgressRef = useRef(false)

  // 初回ロード（マウント時のみ実行）
  useEffect(() => {
    // 初回ロードは一度だけ実行（filterKeyRef.currentが空で、まだ完了していない場合のみ）
    if (filterKeyRef.current !== '' || initialLoadCompletedRef.current || initialLoadInProgressRef.current) {
      return
    }

    // 近くのお店フィルタが有効な場合、位置情報が取得されるまで待機
    // isLocationLoadingがtrueの場合、またはcurrentLocationがnullの場合は待機
    if (isNearbyFilter && (isLocationLoading || !currentLocation)) {
      return
    }

    const nearbyKey = isNearbyFilter && currentLocation
      ? `${currentLocation.latitude.toFixed(6)},${currentLocation.longitude.toFixed(6)}`
      : 'off'
    const currentFilterKey = `${selectedAreas.join(',')}:${selectedGenres.join(',')}:${nearbyKey}`
    filterKeyRef.current = currentFilterKey
    initialLoadInProgressRef.current = true

    const fetchInitialData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchPage(1)
        // 初回ロードが完了しているかチェック
        if (initialLoadCompletedRef.current) {
          return
        }
        setPage(result.page)
        pageRef.current = result.page
        setHasMore(result.hasMore)
        hasMoreRef.current = result.hasMore
        setItems(result.items)
        isFirstLoadRef.current = true
        initialLoadCompletedRef.current = true
        setIsLoading(false)
      } catch (e) {
        if (initialLoadCompletedRef.current) return
        const message = e instanceof Error ? e.message : 'エラーが発生しました'
        console.error('[useInfiniteStores] Initial load error:', {
          message,
          error: e,
          errorType: typeof e,
          errorName: e instanceof Error ? e.name : 'Unknown',
          errorStack: e instanceof Error ? e.stack : undefined,
        })
        setError(message)
      } finally {
        initialLoadInProgressRef.current = false
        if (!initialLoadCompletedRef.current) {
          setIsLoading(false)
        }
      }
    }

    fetchInitialData()

    // クリーンアップ関数は不要（refで管理しているため）
    // 依存配列にisNearbyFilter, currentLocation, isLocationLoadingを追加し、位置情報取得後に初回ロードを実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNearbyFilter, currentLocation, isLocationLoading])

  // フィルター変更時のデータ取得
  useEffect(() => {
    // 初回ロードが完了するまでスキップ
    if (!initialLoadCompletedRef.current) {
      return
    }

    const nearbyKey = isNearbyFilter && currentLocation
      ? `${currentLocation.latitude.toFixed(6)},${currentLocation.longitude.toFixed(6)}`
      : 'off'
    const currentFilterKey = `${selectedAreas.join(',')}:${selectedGenres.join(',')}:${nearbyKey}`

    // フィルターが変更された場合のみ再取得
    if (filterKeyRef.current !== currentFilterKey) {
      filterKeyRef.current = currentFilterKey

      // 状態をリセット
      setPage(1)
      pageRef.current = 1
      setHasMore(true)
      hasMoreRef.current = true
      setIsLoading(true)
      setError(null)
      setItems([])
      isFirstLoadRef.current = true

      // 再取得を実行
      // 注意: fetchPageRef.currentではなく、直接fetchPageを使用する
      // fetchPageはselectedAreasとselectedGenresを依存関係として持っているため、
      // フィルター変更時には最新の値を参照している
      // fetchPageRef.currentは別のuseEffectで更新されるため、
      // 同じレンダリングサイクル内では古い値を参照している可能性がある
      let aborted = false
        ; (async () => {
          try {
            const result = await fetchPage(1)
            if (aborted) {
              return
            }
            setPage(result.page)
            pageRef.current = result.page
            setHasMore(result.hasMore)
            hasMoreRef.current = result.hasMore
            setItems(result.items)
          } catch (e) {
            if (aborted) return
            const message = e instanceof Error ? e.message : 'エラーが発生しました'
            console.error('[useInfiniteStores] Fetch error:', message, e)
            setError(message)
          } finally {
            if (!aborted) setIsLoading(false)
          }
        })()

      return () => {
        aborted = true
      }
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAreas, selectedGenres, isNearbyFilter, currentLocation])

  // IntersectionObserver 設定
  const sentinelRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      sentinelElementRef.current = node

      if (!node) return

      observerRef.current = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          // 初回のマウント時はスキップ（既に初回ロード済み）
          if (isFirstLoadRef.current) {
            isFirstLoadRef.current = false
            return
          }
          // hasMoreがfalseの場合はスキップ
          if (!hasMoreRef.current) {
            return
          }
          if (entry.isIntersecting) {
            // 連続呼び出しを防ぐ追加チェック
            const now = Date.now()
            if (now - lastLoadTimeRef.current < 1000) {
              return
            }
            void loadNext()
          }
        },
        {
          root: null,
          // 画面の半分の位置で次のページを取得開始（500px ≒ 50vh相当）
          rootMargin: '500px 0px',
          threshold: 0,
        }
      )

      observerRef.current.observe(node)
    },
    [loadNext]
  )

  return {
    isLoading,
    isLoadingMore,
    error,
    page,
    hasMore,
    sentinelRef,
    loadNext,
    items,
  }
}
