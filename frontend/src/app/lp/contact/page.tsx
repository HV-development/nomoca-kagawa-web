'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  userContactFormSchema,
  merchantContactFormSchema,
  type UserContactFormData,
  type MerchantContactFormData,
} from '@hv-development/schemas'
type ContactFormData = UserContactFormData | MerchantContactFormData

function ContactFormContent() {
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    inquiryType: 'user',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false)
  const [privacyPolicyError, setPrivacyPolicyError] = useState<string>('')

  // LPページではグローバルのスマホ幅固定を解除して全幅表示にする
  useEffect(() => {
    const previousMaxWidth = document.body.style.maxWidth
    document.body.style.maxWidth = '100vw'
    return () => {
      document.body.style.maxWidth = previousMaxWidth
    }
  }, [])

  // 問い合わせ種別の自動判別（初期値のみ）
  useEffect(() => {
    const typeParam = searchParams.get('type')
    const referrer = document.referrer

    let detectedType: 'user' | 'merchant' = 'user'

    if (typeParam === 'merchant') {
      detectedType = 'merchant'
    } else if (referrer.includes('/lp/merchant')) {
      detectedType = 'merchant'
    }

    setFormData(prev => ({ ...prev, inquiryType: detectedType }))
  }, [searchParams])

  // バリデーション
  const validateForm = (): boolean => {
    try {
      const schema = formData.inquiryType === 'merchant' ? merchantContactFormSchema : userContactFormSchema

      schema.parse(formData)
      setErrors({})
      return true
    } catch (error: unknown) {
      console.error('❌ バリデーション失敗:', error)
      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path?: (string | number)[]; message: string }> }
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
        zodError.errors.forEach((err) => {
          const fieldName = err.path?.[0] as keyof ContactFormData
          if (fieldName) {
            newErrors[fieldName] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToPrivacyPolicy) {
      setPrivacyPolicyError('個人情報の取扱について同意してください')
      return
    }
    setPrivacyPolicyError('')

    if (!validateForm()) {
      // エラーをアラートで表示（デバッグ用）
      const errorMessages = Object.entries(errors).map(([key, value]) => `${key}: ${value}`).join('\n')
      if (errorMessages) {
        alert(`バリデーションエラー:\n\n${errorMessages}`)
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          message: '',
          inquiryType: formData.inquiryType,
        })
        setAgreedToPrivacyPolicy(false)
      } else {
        setSubmitError(data.message || 'お問い合わせの送信に失敗しました')
      }
    } catch (error: unknown) {
      console.error('❌ お問い合わせ送信エラー:', error)
      setSubmitError('お問い合わせの送信中にエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nameLabel = formData.inquiryType === 'merchant' ? '掲載店名' : '氏名'
  const namePlaceholder = formData.inquiryType === 'merchant' ? '例：居酒屋nomocaKagawa' : '例：山田 太郎'

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <header className="relative w-full bg-white border-b" style={{ zIndex: 100 }}>
        <div className="w-full px-4 py-4 md:px-8 md:py-6">
          <div className="flex items-center w-full max-w-6xl mx-auto">
            <Link href="/lp" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="TAMANOMI"
                width={576}
                height={96}
                className="w-24 h-auto md:w-32 lg:w-[320px]"
              />
            </Link>
            <div style={{ flex: 1 }}></div>
            <div className="flex items-center gap-4 md:gap-8">
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/lp#about" className="text-gray-700 hover:text-blue-600 transition-colors">nomocaKagawaとは</Link>
                <Link href="/lp#features" className="text-gray-700 hover:text-blue-600 transition-colors">魅力</Link>
                <Link href="/lp#howto" className="text-gray-700 hover:text-blue-600 transition-colors">使い方</Link>
                <Link href="/lp#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">利用料金</Link>
              </nav>

              <Link
                href="/lp/merchant"
                className="text-white font-bold hover:opacity-90 transition-opacity text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full"
                style={{
                  background: 'var(--main, #6FC8E5)'
                }}
              >
                お店の方はこちら
              </Link>

              <button
                className="md:hidden flex flex-col justify-center items-center cursor-pointer"
                style={{ gap: '6px' }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="メニュー"
              >
                <div style={{ width: '24px', height: '2px', background: '#333' }}></div>
                <div style={{ width: '24px', height: '2px', background: '#333' }}></div>
                <div style={{ width: '24px', height: '2px', background: '#333' }}></div>
              </button>
            </div>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 w-full h-full bg-white"
            style={{
              display: 'flex',
              paddingBottom: '184px',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '32px',
              zIndex: 9999
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="メニューを閉じる"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#007D4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <nav className="flex flex-col items-center gap-8 py-8">
              <Link
                href="/lp#about"
                className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                nomocaKagawaとは
              </Link>
              <Link
                href="/lp#features"
                className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                魅力
              </Link>
              <Link
                href="/lp#howto"
                className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                使い方
              </Link>
              <Link
                href="/lp#pricing"
                className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                利用料金
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="w-full bg-white py-12 md:py-20">
        <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 md:px-10 lg:px-12">
          {/* Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{
                color: '#2B7A78',
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '700',
              }}
            >
              お問い合わせ
            </h1>
            <p
              className="text-base md:text-lg"
              style={{
                color: '#666',
                fontFamily: '"Zen Kaku Gothic New"',
              }}
            >
              ご質問やご不明点がございましたら、お気軽にお問い合わせください
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div
              className="mb-8 p-6 rounded-lg border-2"
              style={{
                backgroundColor: '#f0fdf4',
                borderColor: '#22c55e',
              }}
            >
              <p
                className="text-center text-lg"
                style={{
                  color: '#16a34a',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                お問い合わせを受け付けました。<br />
                担当者より折り返しご連絡させていただきます。
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div
              className="mb-8 p-6 rounded-lg border-2"
              style={{
                backgroundColor: '#fef2f2',
                borderColor: '#ef4444',
              }}
            >
              <p
                className="text-center text-base"
                style={{
                  color: '#dc2626',
                  fontFamily: '"Zen Kaku Gothic New"',
                }}
              >
                {submitError}
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-4xl mx-auto w-full"
          >
            {/* Inquiry Type Radio Buttons */}
            <div className="space-y-3">
              <label
                className="block text-sm md:text-base"
                style={{
                  color: '#333',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                お問い合わせ種別 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="user"
                    checked={formData.inquiryType === 'user'}
                    onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value as 'user' | 'merchant' }))}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span
                    className="text-sm md:text-base"
                    style={{
                      color: '#333',
                      fontFamily: '"Zen Kaku Gothic New"',
                    }}
                  >
                    利用者
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="inquiryType"
                    value="merchant"
                    checked={formData.inquiryType === 'merchant'}
                    onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value as 'user' | 'merchant' }))}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span
                    className="text-sm md:text-base"
                    style={{
                      color: '#333',
                      fontFamily: '"Zen Kaku Gothic New"',
                    }}
                  >
                    掲載店
                  </span>
                </label>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm md:text-base"
                style={{
                  color: '#333',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                {nameLabel} <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={namePlaceholder}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
                style={{
                  borderColor: errors.name ? '#ef4444' : '#d1d5db',
                  fontFamily: '"Zen Kaku Gothic New"',
                }}
              />
              {errors.name && (
                <p className="text-sm" style={{ color: '#ef4444' }}>{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm md:text-base"
                style={{
                  color: '#333',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                メールアドレス <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="例：example@tamanomi.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
                style={{
                  borderColor: errors.email ? '#ef4444' : '#d1d5db',
                  fontFamily: '"Zen Kaku Gothic New"',
                }}
              />
              {errors.email && (
                <p className="text-sm" style={{ color: '#ef4444' }}>{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm md:text-base"
                style={{
                  color: '#333',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                お問い合わせ内容 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="お問い合わせ内容をご記入ください"
                rows={8}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78] resize-vertical"
                style={{
                  borderColor: errors.message ? '#ef4444' : '#d1d5db',
                  fontFamily: '"Zen Kaku Gothic New"',
                }}
              />
              {errors.message && (
                <p className="text-sm" style={{ color: '#ef4444' }}>{errors.message}</p>
              )}
            </div>

            {/* 個人情報の取扱について */}
            <div className="space-y-4">
              <label
                className="block text-sm md:text-base"
                style={{
                  color: '#333',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '700',
                }}
              >
                個人情報の取扱について <span style={{ color: '#ef4444' }}>*</span>
              </label>

              <p
                className="text-sm md:text-base mb-4"
                style={{
                  color: '#666',
                  fontFamily: '"Zen Kaku Gothic New"',
                }}
              >
                下記の個人情報の取扱いに関する事項についてご確認いただき、同意される方は「同意する」をチェックしてください。
              </p>

              <div
                className="border rounded-lg p-4 md:p-6 mb-4"
                style={{
                  borderColor: '#d1d5db',
                  backgroundColor: '#f9fafb',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <div
                  className="space-y-4 text-sm md:text-base"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New"',
                    lineHeight: '1.8',
                  }}
                >
                  <div>
                    <p className="font-bold mb-2">はじめに</p>
                    <p className="ml-4">株式会社サイテックアイ（以下「当社」といいます）は、お客さま・取引関係者・従業員等（以下「利用者」といいます）の個人情報を適切に取り扱い、その保護を図ることを社会的責務と考えています。</p>
                    <p className="ml-4">当社は、個人情報の保護に関する法令及びその他の規範を遵守し、以下のとおりプライバシーポリシーを定め、個人情報の保護・管理に努めます。</p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">1. 収集する情報の範囲</p>
                    <p className="ml-4">当社が取得する情報には、以下が含まれます。</p>
                    <ul className="ml-8 list-disc">
                      <li>氏名、住所、電話番号、メールアドレス、勤務先情報などの連絡先情報</li>
                      <li>決済情報（クレジットカード情報、口座情報等）</li>
                      <li>サービス利用に伴うログ情報（IPアドレス、端末識別子、ブラウザ情報、アクセス日時等）</li>
                      <li>クッキーや類似の技術を通じた行動履歴情報（閲覧ページ、クリック履歴等）</li>
                      <li>位置情報（利用者が許可した場合）</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold mb-2">2. 利用目的</p>
                    <p className="ml-4">当社は、取得した個人情報を以下の目的のために利用します。</p>
                    <ul className="ml-8 list-disc">
                      <li>当社製品・サービスの提供、改善、開発</li>
                      <li>お問い合わせ・ご要望への対応</li>
                      <li>資料や情報の送付、契約・取引の遂行</li>
                      <li>サービス利用状況の分析、利便性向上のための施策検討</li>
                      <li>キャンペーンやイベント、広告・マーケティングの案内</li>
                      <li>雇用管理・採用活動</li>
                      <li>法令に基づく対応</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold mb-2">3. 第三者提供および共同利用</p>
                    <p className="ml-4">当社は、利用者の同意なく個人情報を第三者に提供しません。ただし、以下の場合は例外とします。</p>
                    <ul className="ml-8 list-disc">
                      <li>法令に基づく場合</li>
                      <li>人の生命、身体又は財産の保護のために必要がある場合で本人の同意を得ることが困難な場合</li>
                      <li>公衆衛生の向上、児童の健全な育成に特に必要がある場合</li>
                      <li>国の機関、地方公共団体等が法令に基づき事務を遂行するために協力する必要がある場合</li>
                    </ul>
                    <p className="ml-4 mt-2">また、業務委託に伴いクラウドサービス事業者や広告配信事業者等に個人情報を預託する場合があります。この際は適切な契約を締結し、管理・監督を行います。</p>
                    <p className="ml-4">共同利用を行う場合には、利用目的・共同利用者・管理責任者をあらかじめ明示いたします。</p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">4. 安全管理措置</p>
                    <p className="ml-4">当社は、個人情報の漏洩・滅失・毀損を防止するため、以下の安全管理措置を実施します。</p>
                    <ul className="ml-8 list-disc">
                      <li>アクセス制御、暗号化通信（SSL/TLS）の採用</li>
                      <li>不正アクセス・不正利用の監視システム導入</li>
                      <li>個人情報管理責任者の設置と監督体制の整備</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold mb-2">5. 利用者の権利</p>
                    <p className="ml-4">利用者は、当社が保有するご自身の個人情報について、以下の権利を行使できます。</p>
                    <ul className="ml-8 list-disc">
                      <li>開示請求</li>
                      <li>訂正・追加・削除の請求</li>
                      <li>利用停止・消去の請求</li>
                      <li>第三者提供の停止請求</li>
                    </ul>
                    <p className="ml-4 mt-2">これらの権利行使については、当社所定の窓口にご連絡ください。合理的な範囲で速やかに対応いたします。</p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">6. クッキー等の利用について</p>
                    <p className="ml-4">当社は、利用者の利便性向上やサービス改善のため、クッキーや類似技術を使用することがあります。</p>
                    <p className="ml-4">利用者はブラウザの設定でクッキーを拒否することができますが、その場合一部サービスが利用できなくなる可能性があります。</p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">7. お問い合わせ窓口</p>
                    <p className="ml-4">当社の個人情報の取扱いに関するお問い合わせ・開示請求等は、以下の窓口までご連絡ください。</p>
                    <p className="ml-4"><a href="https://www.psytec-ai.com/contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.psytec-ai.com/contact</a></p>
                  </div>

                  <div>
                    <p className="font-bold mb-2">8. プライバシーポリシーの改定</p>
                    <p className="ml-4">本ポリシーは、必要に応じて改定することがあります。重要な変更がある場合は、当社ウェブサイト等で周知するとともに、必要に応じて個別通知いたします。</p>
                    <p className="ml-4 mt-2">最終改定日：2025年10月3日</p>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="ml-4">株式会社サイテックアイ</p>
                    <p className="ml-4">代表取締役社長 大澤 佳加</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    checked={agreedToPrivacyPolicy}
                    onChange={(e) => {
                      setAgreedToPrivacyPolicy(e.target.checked)
                      if (e.target.checked) {
                        setPrivacyPolicyError('')
                      }
                    }}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-[#2B7A78] border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="privacyPolicy"
                    className="ml-2 text-sm md:text-base cursor-pointer"
                    style={{
                      color: '#333',
                      fontFamily: '"Zen Kaku Gothic New"',
                    }}
                  >
                    同意する
                  </label>
                </div>
                {privacyPolicyError && (
                  <p className="text-sm ml-6" style={{ color: '#ef4444' }}>{privacyPolicyError}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative flex w-full md:w-auto px-12 py-4 justify-center items-center gap-2 rounded-full border-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: '#6FC8E5',
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#FFF',
                }}
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col justify-center items-center gap-8 md:gap-10 pt-8 md:pt-12">
            {/* Logo */}
            <div className="mb-4 md:mb-8">
              <Image
                src="/logo.svg"
                alt="TAMANOMI"
                width={576}
                height={96}
                className="w-24 h-auto md:w-32 lg:w-[320px]"
              />
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-8">
              <Link
                href="/lp/faq"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                よくあるご質問
              </Link>
              <Link
                href="/lp/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                お問い合わせ
              </Link>
              <a
                href="/プライバシーポリシー.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                プライバシーポリシー
              </a>
              <a
                href="/特定商取引法.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                特定商取引法に基づく表記
              </a>
              <a
                href="/terms-of-service.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                ご利用規約
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"' }}
              >
                運営会社
              </a>
            </div>

            {/* Copyright */}
            <div className="pb-6 md:pb-8">
              <p
                className="text-sm md:text-base"
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'Rubik',
                }}
              >
                ©2025 nomocaKagawa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  )
}

