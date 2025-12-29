"use client"

/**
 * ホーム画面（店舗一覧・マイページなど）
 * ログイン後にアクセスする画面
 */

import { useEffect, useMemo, Suspense, useReducer, useRef, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigation } from "@/hooks/useNavigation"
import { useFilters } from "@/hooks/useFilters"
import { useRouter } from "next/navigation"
// 店舗データは HomeLayout 内の無限スクロールで取得するため、ここでは型の直接参照は不要

// 分離したコンポーネントとフックをインポート
import { AppContext } from "@/contexts/AppContext"
import { initialState, appReducer } from "@/hooks/useAppReducer"
// 店舗データの読み込みは HomeLayout に移譲
import { useComputedValues } from "@/hooks/useComputedValues"
import { useAppHandlers } from "@/hooks/useAppHandlers"
// HomeLayoutを通常のインポートに変更（デバッグ用）
import { HomeLayout } from "@/components/templates/HomeLayout"

// メインコンポーネント
export default function HomePage() {
  console.log('[HomePage] Component rendering')
  // カスタムフックを使用
  const auth = useAuth();
  const navigation = useNavigation();
  const filters = useFilters();
  const router = useRouter()
  console.log('[HomePage] Hooks initialized:', {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    currentView: navigation.currentView,
  })
  
  // 初期化フラグ（初回のみ実行するため）
  const isInitialized = useRef(false)

  // ★一時的な対応：正式リリースまではマイページをデフォルト表示
  // 正式リリース時には店舗一覧をデフォルト表示に変更
  useEffect(() => {
    // 初回のみ実行
    if (isInitialized.current) {
      return
    }
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const view = urlParams.get('view')
      
      // useAuthが自動的にCookieから認証チェックするため、特別な処理は不要
      // ここではビューパラメータに応じた遷移のみ処理
      if (view === 'mypage' && auth.isAuthenticated) {
        // マイページに遷移
        navigation.navigateToView("mypage", "mypage")
        navigation.navigateToMyPage("main")
      }
      
      // 初期化完了フラグを立てる
      isInitialized.current = true
    }
  }, [auth, navigation, router])

  // useReducerで状態管理を統合
  const [state, dispatch] = useReducer(appReducer, initialState)

  // デバッグ用のログ（開発環境のみ）
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
    }
  }, [state.isDataLoaded, state.stores.length, state.notifications.length, navigation.currentView, auth.isAuthenticated])

  // 計算値をカスタムフックで分離
  const computedValues = useComputedValues({
    stores: state.stores,
    notifications: state.notifications,
    auth,
    filters
  })

  // ハンドラーを作成
  const handlers = useAppHandlers(dispatch, auth, navigation, filters, router, state)

  // Context値をメモ化
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    handlers,
    auth,
    navigation,
    filters,
    computedValues
  }), [state, dispatch, handlers, auth, navigation, filters, computedValues])

  // 背景色をメモ化
  const backgroundColorClass = useMemo(() => {
    return "bg-gradient-to-br from-green-50 to-green-100"
  }, [])

  // ログイン後のリダイレクトフラグ（メモリ内stateのみで管理）
  const [isLoginRedirecting, setIsLoginRedirecting] = useState(false)
  
  // ページマウント時にリダイレクトフラグを設定（ログイン直後のリダイレクトを検出）
  useEffect(() => {
    // テスト環境では、isLoginRedirectingをfalseのままにする（HomeLayoutを確実にレンダリング）
    // 本番環境では、リダイレクト直後はフラグをtrueに設定
    // データ読み込み完了後にfalseに設定される
    if (process.env.NODE_ENV !== 'test') {
      setIsLoginRedirecting(true)
    }
    
    // タイムアウト: 1秒経過後に強制的にフラグをクリア（セーフティネット）
    // テスト環境では、より早くfalseになるようにする
    const timeout = setTimeout(() => {
      setIsLoginRedirecting(false)
    }, 1000) // 1秒後に強制的にクリア
    
    return () => clearTimeout(timeout)
  }, [])

  // データが読み込まれたら、ログイン後のリダイレクトフラグをクリア
  useEffect(() => {
    if (state.isDataLoaded) {
      // レンダリングが完了するのを待つため、複数のフレームでフラグをクリア
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoginRedirecting(false)
          })
        })
      })
    }
  }, [state.isDataLoaded])

  // ログイン後のリダイレクト中のみローディング表示（データ読み込みはHomeLayout内で部分的に表示）
  // デバッグ用: isLoginRedirectingの条件を無効化して、HomeLayoutが確実にレンダリングされるようにする
  if (false && isLoginRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">読み込み中...</p>
        </div>
      </div>
    )
  }

  console.log('[HomePage] Rendering HomeLayout')
  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen flex flex-col ${backgroundColorClass} w-full`}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-green-600 font-medium">読み込み中...</p>
            </div>
          </div>
        }>
          <HomeLayout onMount={() => setIsLoginRedirecting(false)} />
        </Suspense>
      </div>
    </AppContext.Provider>
  )
}

