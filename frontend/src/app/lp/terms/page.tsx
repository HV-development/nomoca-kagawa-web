'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-[120px] md:py-8">
          <div className="flex items-center justify-between">
            <Link href="/lp">
              <Image
                src="/lp/images/horizon-color-white.png"
                alt="nomocaKagawa"
                width={1312}
                height={320}
                className="w-32 h-8 md:w-[246px] md:h-[60px]"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-[120px]">
          {/* Page Title */}
          <div className="text-center mb-12 md:mb-16">
            <h1
              className="text-4xl md:text-5xl mb-4"
              style={{
                color: '#000',
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '700',
                lineHeight: '100%'
              }}
            >
              ご利用規約
            </h1>
            <p
              className="text-base md:text-lg"
              style={{
                color: '#666',
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400',
                lineHeight: '160%'
              }}
            >
              nomocaKagawaサービスのご利用規約です。
            </p>
          </div>

          {/* PDF Link */}
          <div className="text-center py-12">
            <div className="mb-8">
              <svg
                className="w-24 h-24 mx-auto text-green-600 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p
                className="text-gray-600 mb-8"
                style={{
                  fontFamily: '"Zen Kaku Gothic New"',
                  fontWeight: '400',
                  lineHeight: '160%'
                }}
              >
                下記ボタンをクリックすると、利用規約のPDFが表示されます。
              </p>
            </div>
            <a
              href="/terms-of-service.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors shadow-md"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '500'
              }}
            >
              利用規約を表示する
            </a>
          </div>

          {/* Footer Note */}
          <div
            className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200"
            style={{
              fontFamily: '"Zen Kaku Gothic New"',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '160%',
              color: '#666',
              textAlign: 'center'
            }}
          >
            <p>※本規約は2025年1月時点の情報です。内容は予告なく変更される場合があります。</p>
            <p className="mt-2">最新の情報はお問い合わせフォームよりご確認ください。</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto px-4 py-8 md:px-[120px] md:py-12">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-8">
            <Link
              href="/lp/faq"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400'
              }}
            >
              よくあるご質問
            </Link>
            <Link
              href="/lp/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400'
              }}
            >
              お問い合わせ
            </Link>
            <a
              href="/プライバシーポリシー.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400'
              }}
            >
              プライバシーポリシー
            </a>
            <Link
              href="/lp/commercial-law"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400'
              }}
            >
              特定商取引法に基づく表記
            </Link>
            <Link
              href="/lp/terms"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{
                fontFamily: '"Zen Kaku Gothic New"',
                fontWeight: '400'
              }}
            >
              ご利用規約
            </Link>
          </div>

          {/* Copyright */}
          <div className="pb-6 md:pb-8">
            <p
              className="text-sm md:text-base"
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Rubik',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '100%'
              }}
            >
              ©2025 nomocaKagawa
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
