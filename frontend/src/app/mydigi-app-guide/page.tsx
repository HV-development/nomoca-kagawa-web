"use client"

import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ApiClient } from "../../lib/api-client"
import { Modal } from "../../components/atoms/Modal"

export default function MydigiAppGuidePage() {
  const router = useRouter()
  const [isSignupFlow, setIsSignupFlow] = useState<boolean>(false)
  const [mydigiAppId, setMydigiAppId] = useState<string>("")
  const [isLinking, setIsLinking] = useState<boolean>(false)
  const [linkError, setLinkError] = useState<string>("")
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [grantedPoints, setGrantedPoints] = useState<number>(0)

  useEffect(() => {
    setIsSignupFlow(new URLSearchParams(window.location.search).get('flow') === 'signup')
  }, [])

  const buildPlanRegistrationHref = (extraParams?: Record<string, string>) => {
    const params = new URLSearchParams(extraParams)
    if (isSignupFlow) params.set('flow', 'signup')
    const query = params.toString()
    return query ? `/plan-registration?${query}` : '/plan-registration'
  }

  const handleLinkMydigiApp = async () => {
    if (!mydigiAppId || mydigiAppId.trim() === "") {
      setLinkError("ユーザーIDを入力してください")
      return
    }

    setIsLinking(true)
    setLinkError("")

    try {
      const result = await ApiClient.post<{ success: boolean; message: string; pointsGranted?: number }>(
        '/api/user/link-mydigi-app',
        { mydigiAppId: mydigiAppId.trim() }
      )

      if (result.data?.success) {
        const points = result.data.pointsGranted || 0
        setGrantedPoints(points)
        setShowSuccessModal(true)
        setMydigiAppId("")
      } else if (result.error) {
        setLinkError(result.error.message || "連携に失敗しました")
      } else {
        setLinkError(result.data?.message || "連携に失敗しました")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLinkError(error.message || "連携中にエラーが発生しました")
      } else {
        setLinkError("連携中にエラーが発生しました")
      }
    } finally {
      setIsLinking(false)
    }
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    // プラン登録画面に戻る（再レンダリングを促すためにタイムスタンプを追加）
    router.push(buildPlanRegistrationHref({ refresh: String(Date.now()) }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <Link
            href={buildPlanRegistrationHref()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            プラン登録に戻る
          </Link>
          <h1 className="text-base font-bold text-gray-900 mb-2">
            マイデジアプリ 使い方ガイド
          </h1>
          <p className="text-sm text-gray-600">
            ID連携の方法についてご説明します。
          </p>
        </div>

        {/* Step 1: アプリのダウンロード */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 text-center">Step 1: アプリのダウンロード</h2>
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://apps.apple.com/jp/app/id6504632498"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/app-store.svg" alt="App Storeからダウンロード" width={48} height={48} className="h-12" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=jp.mydigi.kagawa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/google-play.svg" alt="Google Playからダウンロード" width={48} height={48} className="h-12" />
            </a>
          </div>
          <p className="text-center text-sm text-gray-600">
            上記のボタンからアプリをダウンロードしてください
          </p>
        </div>

        {/* Step 2: IDの確認 */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 text-center">Step 2: IDの確認</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">1. アプリを開く</h3>
              <p className="text-gray-700 text-xs">
                ダウンロードした「マイデジ」アプリを開いてください。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">2. マイページにアクセス</h3>
              <p className="text-gray-700 text-xs">
                画面下部のメニューバーから「メニュー」をタップしてください。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">3. ユーザーIDを確認</h3>
              <p className="text-gray-700 text-xs">
                メニュー内に「ユーザーID」が表示されます。
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">4. IDをコピー</h3>
              <p className="text-gray-700 text-xs">
                ユーザーIDをタップしてコピーしてください。
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: IDの登録 */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 text-center">Step 3: IDの登録</h2>
          <div className="space-y-4">
            {/* エラー表示 */}
            {linkError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{linkError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                マイデジアプリ ユーザーID
              </label>
              <input
                type="text"
                value={mydigiAppId}
                onChange={(e) => {
                  setMydigiAppId(e.target.value)
                  setLinkError("")
                }}
                placeholder="ユーザーIDを入力してください"
                disabled={isLinking}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleLinkMydigiApp}
              disabled={isLinking || !mydigiAppId}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 text-sm font-bold flex items-center justify-center gap-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLinking ? (
                <>
                  <span className="animate-spin">⏳</span>
                  連携中...
                </>
              ) : (
                <>
                  <span>🔗</span>
                  連携して480円で申し込む
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-600">
              ※ 連携後、すぐに割引価格が適用されます
            </p>
          </div>
        </div>

        {/* 成功モーダル */}
        <Modal
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          title="🎉 連携完了"
        >
          <div className="text-center py-4">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              マイデジアプリとの連携が完了しました！
            </h3>
            <p className="text-gray-600 mb-4">
              {grantedPoints > 0 ? `${grantedPoints}ポイントを獲得しました！` : '連携が完了しました。'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              割引価格でプランをご利用いただけます
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-bold transition-colors"
            >
              プラン登録画面に戻る
            </button>
          </div>
        </Modal>

        {/* フッター */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <Link
            href={buildPlanRegistrationHref()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            プラン登録に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}





