'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function CampaignPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F5F9FB' }}>
      {/* Hero Section */}
      <div 
        className="relative w-full py-12 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #6FC8E5 0%, #4BA8C5 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 
            className="text-2xl md:text-4xl font-bold mb-4"
            style={{
              color: '#FFF',
              fontFamily: '"Zen Kaku Gothic New", sans-serif',
              lineHeight: '140%'
            }}
          >
            モニター会員登録方法
          </h1>
          <p 
            className="text-base md:text-lg"
            style={{
              color: '#FFF',
              fontFamily: '"Zen Kaku Gothic New", sans-serif'
            }}
          >
            nomocaKagawaを始めましょう！
          </p>
        </div>
        
        {/* 装飾的な波形 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill="#F5F9FB" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Step 1: サイトへアクセス */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: '#6FC8E5' }}
            >
              1
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold"
              style={{
                color: '#333',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              サイトへアクセス
            </h2>
          </div>
          <div className="text-center">
            <Link
              href="/email-registration"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: '#FF6F61',
                fontFamily: '"Zen Kaku Gothic New", sans-serif',
                boxShadow: '0 4px 14px rgba(255, 111, 97, 0.4)'
              }}
            >
              nomocaKagawa 新規登録
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                className="ml-3"
              >
                <path
                  d="M0.999838 14.3333L7.6665 7.66667L0.999838 1"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Step 2: 新規登録 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: '#6FC8E5' }}
            >
              2
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold"
              style={{
                color: '#333',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              新規登録
            </h2>
          </div>
          <div 
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: '#FFF9E6' }}
          >
            <p 
              className="text-sm md:text-base"
              style={{
                color: '#666',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              ※お支払い方法の登録が必要です。モニター期間終了後、月額料金の自動請求が開始します。
            </p>
          </div>
        </div>

        {/* Step 3: キャンペーンコード入力 */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-6 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FFD93B 0%, #FFC107 100%)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: '#6FC8E5' }}
            >
              3
            </div>
            <h2 
              className="text-xl md:text-2xl font-bold"
              style={{
                color: '#333',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              キャンペーンコード入力
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 md:p-8 text-center">
            <p 
              className="text-sm md:text-base mb-4"
              style={{
                color: '#666',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              新規登録ページ内コード入力欄に下記4桁の数字を入力ください。
            </p>
            <div 
              className="inline-block px-8 py-4 rounded-xl mb-4"
              style={{ 
                backgroundColor: '#6FC8E5',
                boxShadow: '0 4px 14px rgba(111, 200, 229, 0.4)'
              }}
            >
              <span 
                className="text-4xl md:text-6xl font-bold tracking-wider"
                style={{
                  color: '#FFF',
                  fontFamily: 'Rubik, sans-serif',
                  letterSpacing: '0.2em'
                }}
              >
                5959
              </span>
            </div>
            <div className="space-y-2">
              <p 
                className="text-sm"
                style={{
                  color: '#FF6F61',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif',
                  fontWeight: '700'
                }}
              >
                有効期限：2026年3月31日(火)
              </p>
              <p 
                className="text-sm"
                style={{
                  color: '#666',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif'
                }}
              >
                お一人様1回限り有効
              </p>
            </div>
          </div>
        </div>

        {/* マイデジアプリ連携セクション */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
          <div 
            className="text-center mb-6 pb-6"
            style={{ borderBottom: '2px dashed #E0E0E0' }}
          >
            <h2 
              className="text-xl md:text-2xl font-bold mb-2"
              style={{
                color: '#6FC8E5',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              「高松市みんなのアプリ」ダウンロードはこちら
            </h2>
            <p 
              className="text-sm"
              style={{
                color: '#888',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              （登録無料）
            </p>
          </div>
          
          <p 
            className="text-center text-sm md:text-base mb-6"
            style={{
              color: '#666',
              fontFamily: '"Zen Kaku Gothic New", sans-serif',
              lineHeight: '1.8'
            }}
          >
            「高松市みんなのアプリ」は、行政手続きや地域サービス、地域通貨が使える便利な生活アプリです。<br />
            市内在住の方はもちろん、市外の方も使える！
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://apps.apple.com/jp/app/id6504632498"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/app-store.svg" alt="App Storeからダウンロード" width={140} height={42} className="h-12 w-auto" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=jp.mydigi.kagawa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/google-play.svg" alt="Google Playからダウンロード" width={140} height={42} className="h-12 w-auto" />
            </a>
          </div>

          {/* 紐づけ方法 */}
          <div 
            className="rounded-xl p-6"
            style={{ backgroundColor: '#F5F9FB' }}
          >
            <h3 
              className="text-lg font-bold mb-4 text-center"
              style={{
                color: '#6FC8E5',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              「nomocaKagawa」と紐づけよう！
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: '#6FC8E5' }}
                >
                  1
                </span>
                <p 
                  className="text-sm md:text-base"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New", sans-serif'
                  }}
                >
                  「高松市みんなのアプリ」を開く
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: '#6FC8E5' }}
                >
                  2
                </span>
                <p 
                  className="text-sm md:text-base"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New", sans-serif'
                  }}
                >
                  メニュー内「ユーザーID」をコピー
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: '#6FC8E5' }}
                >
                  3
                </span>
                <p 
                  className="text-sm md:text-base"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New", sans-serif'
                  }}
                >
                  「nomocaKagawa」マイページ内「アカウント」にコピーしたユーザーIDを入力
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* キャンペーン条件セクション */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-6"
          style={{
            background: 'linear-gradient(135deg, #6FC8E5 0%, #4BA8C5 100%)'
          }}
        >
          <div className="text-center mb-6">
            <p 
              className="text-white text-sm md:text-base mb-2"
              style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
            >
              条件①②を2026年2月28日(土)までに達成すると
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* 条件1 */}
            <div className="bg-white rounded-xl p-5 text-center">
              <div 
                className="inline-block px-4 py-1 rounded-full mb-3"
                style={{ backgroundColor: '#FFD93B' }}
              >
                <span 
                  className="font-bold text-sm"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New", sans-serif'
                  }}
                >
                  条件①
                </span>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  color: '#6FC8E5',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif'
                }}
              >
                3店舗利用
              </h3>
              <p 
                className="text-sm"
                style={{
                  color: '#666',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif'
                }}
              >
                期間中3店舗でnomocaKagawaを利用しよう！
              </p>
            </div>

            {/* 条件2 */}
            <div className="bg-white rounded-xl p-5 text-center">
              <div 
                className="inline-block px-4 py-1 rounded-full mb-3"
                style={{ backgroundColor: '#FFD93B' }}
              >
                <span 
                  className="font-bold text-sm"
                  style={{
                    color: '#333',
                    fontFamily: '"Zen Kaku Gothic New", sans-serif'
                  }}
                >
                  条件②
                </span>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  color: '#6FC8E5',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif'
                }}
              >
                掲載店1店舗リクエスト
              </h3>
              <p 
                className="text-sm"
                style={{
                  color: '#666',
                  fontFamily: '"Zen Kaku Gothic New", sans-serif'
                }}
              >
                掲載店になって欲しいお店をリクエスト！
              </p>
            </div>
          </div>

          {/* 特典 */}
          <div 
            className="bg-white rounded-xl p-6 text-center"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <p 
              className="text-lg md:text-xl font-bold mb-2"
              style={{
                color: '#FF6F61',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              2026年
            </p>
            <h3 
              className="text-3xl md:text-4xl font-bold"
              style={{
                color: '#6FC8E5',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              4月末まで無料期間延長!!
            </h3>
          </div>
        </div>

        {/* 詳細ボタン */}
        <div className="text-center mb-8">
          <Link
            href="/lp"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-bold text-base md:text-lg transition-all hover:opacity-90 hover:scale-105"
            style={{
              backgroundColor: '#6FC8E5',
              fontFamily: '"Zen Kaku Gothic New", sans-serif',
              boxShadow: '0 4px 14px rgba(111, 200, 229, 0.4)'
            }}
          >
            詳しくはWEBページをCHECK!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              className="ml-3"
            >
              <path
                d="M0.999838 14.3333L7.6665 7.66667L0.999838 1"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* 注意事項 */}
        <div 
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: '#F0F0F0' }}
        >
          <p 
            className="text-xs leading-relaxed"
            style={{
              color: '#666',
              fontFamily: '"Zen Kaku Gothic New", sans-serif'
            }}
          >
            ※「nomocaKagawa」は、高松市を中心に&ldquo;Welcomeドリンク&rdquo;を楽しめる月額制（サブスク）サービスです。nomocaKagawa掲載店でサイト内クーポンを提示すると、各店舗につき1日に1杯の対象ドリンクが無料になります。※対象ドリンクや利用条件等は店舗・キャンペーンにより異なります。※本チラシのクーポンコードを入力した日から、2026年3月31日（火）までの期間、月額料金が無料でご利用いただけます。※無料期間が終了すると、通常の月額料金（一般会員980円／高松市みんなのアプリ会員480円）が自動的に課金されます。無料期間終了前であれば、いつでも無料でキャンセル可能です。※本キャンペーンは予告なく内容の変更、中止もしくは延長させていただく場合があります。あらかじめご了承ください。※本チラシの記載内容は、2026年1月1日時点の情報です。最新情報は公式サイトをご確認ください。
          </p>
        </div>

        {/* お問い合わせ */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 
            className="text-lg font-bold mb-4 text-center"
            style={{
              color: '#333',
              fontFamily: '"Zen Kaku Gothic New", sans-serif'
            }}
          >
            nomocaKagawaに関するお問い合わせ
          </h3>
          <p 
            className="text-sm text-center mb-4"
            style={{
              color: '#666',
              fontFamily: '"Zen Kaku Gothic New", sans-serif'
            }}
          >
            サイト内「ヘルプ・お問い合わせ」より受け付けております。
          </p>
          <div className="text-center">
            <Link
              href="/lp/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: '#F5F9FB',
                color: '#6FC8E5',
                fontFamily: '"Zen Kaku Gothic New", sans-serif',
                border: '2px solid #6FC8E5'
              }}
            >
              お問い合わせはこちら
            </Link>
          </div>
          <div className="text-center mt-4">
            <p 
              className="text-xs"
              style={{
                color: '#888',
                fontFamily: '"Zen Kaku Gothic New", sans-serif'
              }}
            >
              運営会社 株式会社つなぐ
            </p>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div 
        className="w-full py-6 text-center"
        style={{ backgroundColor: '#6FC8E5' }}
      >
        <Image
          src="/lp/images/horizon-color-white.png"
          alt="nomocaKagawa"
          width={200}
          height={50}
          className="mx-auto mb-4"
        />
        <p 
          className="text-sm"
          style={{
            color: '#FFF',
            fontFamily: 'Rubik, sans-serif'
          }}
        >
          ©2025 nomocaKagawa
        </p>
      </div>
    </div>
  )
}

