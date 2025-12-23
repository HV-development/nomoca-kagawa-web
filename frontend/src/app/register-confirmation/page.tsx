'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterConfirmationContainer } from '@/components/organisms/RegisterConfirmationContainer'
import { UserRegistrationComplete } from "@hv-development/schemas"
import { Modal } from '@/components/atoms/Modal'
import { Button } from '@/components/atoms/Button'
import { useRegisterStore } from '@/stores/register-store'

export default function RegisterConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingEmail, setIsLoadingEmail] = useState(true)
  const [formData, setFormData] = useState<UserRegistrationComplete | null>(null)
  // セキュリティ改善：メールアドレスはAPIから取得せず、表示も不要
  const [email] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [isClient, setIsClient] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showMydigiFailedModal, setShowMydigiFailedModal] = useState(false)
  const [pointsGranted, setPointsGranted] = useState<number | null>(null)
  const [shopId, setShopId] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const clearFormData = useRegisterStore((state) => state.clearFormData)
  const initializedRef = useRef(false)

  // クライアントサイドでのみ searchParams を取得
  useEffect(() => {
    // React Strict Modeでの二重実行を防ぐ
    if (initializedRef.current) {
      return
    }
    initializedRef.current = true

    setIsClient(true)

    const initializePage = async () => {
      if (typeof window === 'undefined') return

      const urlParams = new URLSearchParams(window.location.search)
      const tokenParam = urlParams.get('token') || ''
      const shopIdParam = urlParams.get('shop_id') || undefined

      // shopIdをstateに保存
      setShopId(shopIdParam)

      // トークンがない場合は登録画面にリダイレクト
      if (!tokenParam) {
        router.push('/email-registration')
        return
      }

      setToken(tokenParam)

      // セキュリティ改善：メールアドレスはAPIから取得せず、トークンの有効性のみをチェック
      try {
        // トークンの有効性をチェック
        const tokenResponse = await fetch(`/api/auth/register/token-info?token=${encodeURIComponent(tokenParam)}`)

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json().catch(() => ({}))
          if (errorData.error?.code === 'REGISTRATION_TOKEN_EXPIRED') {
            setError('トークンの有効期限が切れています。再度メール登録からやり直してください。')
          } else {
            setError('トークンが無効です。再度メール登録からやり直してください。')
          }
          setTimeout(() => router.push('/email-registration'), 3000)
          setIsLoadingEmail(false)
          return
        }

        // トークンが有効であることを確認（メールアドレスは取得しない）
        const tokenData = await tokenResponse.json()
        if (!tokenData.valid) {
          setError('トークンが無効です。再度メール登録からやり直してください。')
          setTimeout(() => router.push('/email-registration'), 3000)
          setIsLoadingEmail(false)
          return
        }

        // Zustandストアからフォームデータを取得
        // 直接インポートしたストアから取得（動的インポートでは異なるインスタンスになる可能性があるため）
        // 少し待ってから取得することで、前のページからのデータ保存が確実に完了する
        // 最大3回までリトライ（React Strict Modeでの二重実行に対応）
        let currentFormData = null
        for (let i = 0; i < 3; i++) {
          await new Promise(resolve => setTimeout(resolve, 50 * (i + 1)))
          currentFormData = useRegisterStore.getState().formData
          if (currentFormData) {
            break
          }
        }

        // デバッグ: 取得したデータを確認

        if (!currentFormData) {
          // フォームデータがない場合は登録画面に戻す
          console.warn('[register-confirmation/page] No form data found in Zustand store, redirecting to register page')
          const shopIdParamForRedirect = shopIdParam ? `&shop_id=${encodeURIComponent(shopIdParam)}` : ''
          router.push(`/register?token=${encodeURIComponent(tokenParam)}${shopIdParamForRedirect}`)
          setIsLoadingEmail(false)
          return
        }

        // ローカルstateに保存してから、セキュリティ: データ取得後、即座にストアから削除（メモリからも削除）
        setFormData(currentFormData)
        clearFormData()
      } catch {
        setError('エラーが発生しました。再度お試しください。')
        setTimeout(() => router.push('/email-registration'), 3000)
      } finally {
        setIsLoadingEmail(false)
      }
    }

    initializePage()
  }, [router, clearFormData])

  const handleRegister = async () => {
    // 連続押下を防ぐ
    if (isLoading) {
      return
    }

    if (!formData || !token) return

    setIsLoading(true)

    try {
      const mydigiAppIdValue = formData.saitamaAppId && formData.saitamaAppId.trim() !== '' ? formData.saitamaAppId.trim() : undefined;

      // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない
      // referrerUserIdはURLパラメータから取得するか、Cookieから取得する
      // 必要に応じてCookieから取得する実装を追加
      const referrerUserId: string | undefined = undefined

      // バックエンドAPIに登録リクエストを送信
      // セキュリティ改善：メールアドレスはリクエストボディに含めず、トークンから取得される
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          nickname: formData.nickname,
          postalCode: formData.postalCode,
          address: formData.address,
          birthDate: formData.birthDate,
          gender: formData.gender,
          phone: formData.phone,
          // 空文字列の場合はundefinedとして送信しない
          mydigiAppId: mydigiAppIdValue,
          // 紹介者IDを追加
          referrerUserId: referrerUserId,
          token: token,
          shopId: shopId,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // セキュリティ: 登録成功後、Zustandストアからフォームデータを削除（既に削除済みだが念のため）
        clearFormData()

        // Cookieベースの認証のみを使用（localStorageは廃止）
        // トークンはサーバー側でCookieに設定されるため、フロントエンドでの保存は不要
        // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない

        // マイデジアプリ連携が失敗した場合（ポイント付与API失敗）
        if (result.mydigiAppLinkFailed) {
          setShowMydigiFailedModal(true)
          return
        }

        // マイデジアプリ連携でポイント付与があった場合はモーダルを表示
        if (result.pointsGranted) {
          setPointsGranted(result.pointsGranted)
          setShowSuccessModal(true)
        } else {
          // ポイント付与がない場合は直接プラン登録画面に遷移
          // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない
          // window.location.hrefを使用して強制的に遷移
          if (typeof window !== 'undefined') {
            window.location.href = '/plan-registration'
          } else {
            router.push('/plan-registration')
          }
        }
      } else {
        // エラーハンドリング
        const errorMessage = result.message || result.error?.message || '登録に失敗しました'

        // 409エラー（既存アカウント）の場合は特別な処理
        if (response.status === 409 && result.errorCode === 'USER_ALREADY_EXISTS') {
          // ログイン画面にリダイレクト
          router.push(`/?error=already_registered`)
        } else {
          alert(errorMessage)
        }
      }
    } catch {
      alert('ネットワークエラーが発生しました。再度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない
    // 編集モードで登録画面に戻る（フォームデータは再入力してもらう）
    const shopIdParam = formData?.shopId ? `&shop_id=${encodeURIComponent(formData?.shopId)}` : ''
    router.push(`/register?token=${encodeURIComponent(token)}&edit=true${shopIdParam}`)
  }

  const handleLogoClick = () => router.push('/')

  const handleModalClose = () => {
    setShowSuccessModal(false)
    // モーダルを閉じた後、プラン登録画面に遷移
    // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない
    // window.location.hrefを使用して強制的に遷移
    if (typeof window !== 'undefined') {
      window.location.href = '/plan-registration?mydigiAppLinked=true'
    } else {
      router.push('/plan-registration?mydigiAppLinked=true')
    }
  }

  const handleMydigiFailedModalClose = () => {
    setShowMydigiFailedModal(false)
    // マイデジアプリ連携なしでプラン登録画面に遷移
    // Cookieベースのセッション管理に変更したため、sessionStorageは使用しない
    if (typeof window !== 'undefined') {
      window.location.href = '/plan-registration'
    } else {
      router.push('/plan-registration')
    }
  }

  // クライアントサイドでの初期化が完了するまでローディング表示
  if (!isClient || isLoadingEmail || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  // エラー表示
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">メール登録画面にリダイレクトします...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <RegisterConfirmationContainer
        data={formData}
        email={email}
        onRegister={handleRegister}
        onEdit={handleEdit}
        onLogoClick={handleLogoClick}
        isLoading={isLoading}
        backgroundColorClass="bg-gradient-to-br from-green-50 to-green-100"
      />

      {/* ポイント付与成功モーダル */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="🎉 登録完了"
      >
        <div className="space-y-4">
          <p className="text-gray-700 whitespace-pre-line">
            {`マイデジアプリとの連携が完了しました。\n\n${pointsGranted}ポイントを付与しました！\n\nお得なプランが表示されます。`}
          </p>
          <Button
            onClick={handleModalClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          >
            確認
          </Button>
        </div>
      </Modal>

      {/* マイデジアプリ連携失敗モーダル */}
      <Modal
        isOpen={showMydigiFailedModal}
        onClose={handleMydigiFailedModalClose}
        title="⚠️ 登録完了（連携エラー）"
      >
        <div className="space-y-4">
          <p className="text-gray-700 whitespace-pre-line">
            {`会員登録は完了しましたが、マイデジアプリとの連携に失敗しました。\n\nプラン登録画面で再度連携をお試しください。`}
          </p>
          <Button
            onClick={handleMydigiFailedModalClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          >
            連携なしで続行
          </Button>
        </div>
      </Modal>
    </>
  )
}
