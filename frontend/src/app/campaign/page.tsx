'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function CampaignPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#6FC8E5' }}>
      {/* ヘッダー */}
      <div className="w-full py-6 px-4 text-center" style={{ backgroundColor: '#6FC8E5' }}>
        <h1 
          className="text-2xl font-bold"
          style={{
            color: '#FFF',
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
          }}
        >
          モニター会員登録方法
        </h1>
      </div>

      {/* 3ステップセクション - 縦並び */}
      <div className="px-4 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="space-y-3">
          {/* Step 1: サイトへアクセス */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: '#6FC8E5' }}
              >
                1
              </div>
              <div className="flex-1">
                <h2 
                  className="text-lg font-bold mb-1"
                  style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                >
                  サイトへアクセス
                </h2>
                <p className="text-sm" style={{ color: '#666' }}>
                  下のボタンから新規登録ページへ
                </p>
              </div>
              <Image
                src="/main-logo.jpg"
                alt="nomocaKagawa"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* 矢印 */}
          <div className="flex justify-center">
            <span className="text-white text-2xl">▼</span>
          </div>

          {/* Step 2: 新規登録 */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: '#6FC8E5' }}
              >
                2
              </div>
              <div className="flex-1">
                <h2 
                  className="text-lg font-bold mb-1"
                  style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                >
                  新規登録
                </h2>
                <p className="text-sm" style={{ color: '#666' }}>
                  必要事項を入力して登録
                </p>
                <p className="text-xs mt-1" style={{ color: '#FF6F61' }}>
                  ※お支払い方法の登録が必要です
                </p>
              </div>
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <div className="relative">
                  <div 
                    className="w-10 h-12 rounded border-2 flex flex-col items-center pt-2"
                    style={{ borderColor: '#6FC8E5', backgroundColor: '#FFF' }}
                  >
                    <div className="w-6 h-1 rounded mb-1" style={{ backgroundColor: '#6FC8E5' }}></div>
                    <div className="w-6 h-1 rounded mb-1" style={{ backgroundColor: '#6FC8E5' }}></div>
                    <div className="w-6 h-1 rounded" style={{ backgroundColor: '#6FC8E5' }}></div>
                  </div>
                  <div 
                    className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FF6F61' }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 矢印 */}
          <div className="flex justify-center">
            <span className="text-white text-2xl">▼</span>
          </div>

          {/* Step 3: コード入力 */}
          <div 
            className="rounded-xl p-4"
            style={{ backgroundColor: '#FFD93B' }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: '#6FC8E5' }}
              >
                3
              </div>
              <div className="flex-1">
                <h2 
                  className="text-lg font-bold mb-1"
                  style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                >
                  コード入力
                </h2>
                <p className="text-sm" style={{ color: '#333' }}>
                  登録時に右のコードを入力
                </p>
                <p className="text-xs mt-1" style={{ color: '#FF6F61', fontWeight: 700 }}>
                  期限: 2026年3月31日
                </p>
              </div>
              <div 
                className="rounded-lg py-3 px-4"
                style={{ backgroundColor: '#6FC8E5' }}
              >
                <span 
                  className="text-3xl font-bold tracking-wide"
                  style={{ color: '#FFF', fontFamily: 'Rubik, sans-serif' }}
                >
                  5959
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 新規登録ボタン（上部） */}
        <div className="mt-4 text-center">
          <Link
            href="/email-registration"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-lg"
            style={{ backgroundColor: '#FF6F61' }}
          >
            新規登録はこちら
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* アプリダウンロードセクション */}
      <div className="px-4 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="bg-white rounded-xl p-5">
          <div className="text-center">
            <h2 
              className="text-lg font-bold leading-tight"
              style={{ color: '#6FC8E5', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
            >
              「マイデジ」ダウンロードはこちら
            </h2>
            <p className="text-xs mt-1" style={{ color: '#888' }}>（登録無料）</p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: '#666' }}>
              「マイデジ」は、行政手続きや地域サービス、<br />
              地域通貨が使える便利な生活アプリです。
            </p>
            <p 
              className="text-sm font-bold mt-2"
              style={{ color: '#FF6F61' }}
            >
              市内在住の方はもちろん、市外の方も使える！
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-4 mb-4">
            <a
              href="https://apps.apple.com/jp/app/id6504632498"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/app-store.svg" alt="App Store" width={130} height={40} className="h-10 w-auto" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=jp.mydigi.kagawa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/google-play.svg" alt="Google Play" width={130} height={40} className="h-10 w-auto" />
            </a>
          </div>

          {/* 紐づけ方法 */}
          <div 
            className="rounded-xl p-4 mt-3"
            style={{ backgroundColor: '#F0F8FA', border: '2px solid #6FC8E5' }}
          >
            <h3 
              className="text-base font-bold mb-4 text-center"
              style={{ color: '#6FC8E5' }}
            >
              「nomocaKagawa」と紐づけよう！
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span 
                  className="inline-flex w-8 h-8 rounded-full items-center justify-center text-white text-base font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >1</span>
                <p className="text-sm" style={{ color: '#333' }}>「マイデジ」を開く</p>
              </div>
              <div className="flex items-center gap-4">
                <span 
                  className="inline-flex w-8 h-8 rounded-full items-center justify-center text-white text-base font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >2</span>
                <p className="text-sm" style={{ color: '#333' }}>メニュー内「ユーザーID」をコピー</p>
              </div>
              <div className="flex items-center gap-4">
                <span 
                  className="inline-flex w-8 h-8 rounded-full items-center justify-center text-white text-base font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >3</span>
                <p className="text-sm" style={{ color: '#333' }}>「マイデジID」にコピーしたユーザーIDを入力</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* キャンペーン条件セクション */}
      <div className="px-4 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        {/* 達成条件ヘッダー */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2">
            <div 
              className="w-10 h-10 flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpolygon points=\'50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35\' fill=\'%23FFD93B\'/%3E%3C/svg%3E")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span className="text-[8px] font-bold" style={{ color: '#333' }}>達成!</span>
            </div>
            <p 
              className="text-sm font-bold py-2 px-4 rounded-full"
              style={{ backgroundColor: '#FFF', color: '#333' }}
            >
              条件<span style={{ color: '#FF6F61' }}>①②</span>を2026年2月28日までに達成すると
            </p>
          </div>
        </div>

        {/* 条件カード - 縦並び */}
        <div className="space-y-3 mb-4">
          {/* 条件1 */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div 
                className="px-3 py-1 rounded-full flex-shrink-0 text-center"
                style={{ backgroundColor: '#FF6F61', width: '135px' }}
              >
                <span className="text-white text-xs font-bold whitespace-nowrap">❶ 3店舗利用</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: '#666' }}>
                  期間中3店舗で利用しよう！
                </p>
              </div>
              {/* クーポンアイコン */}
              <div className="relative flex-shrink-0" style={{ width: '50px', height: '40px' }}>
                <div className="absolute flex items-center" style={{ width: '45px', height: '12px', top: '0px', left: '5px' }}>
                  <div className="w-full h-full flex items-center justify-center rounded-sm" style={{ backgroundColor: '#4BA8C5' }}>
                    <span className="text-[6px] font-bold text-white">COUPON</span>
                  </div>
                </div>
                <div className="absolute flex items-center" style={{ width: '45px', height: '12px', top: '9px', left: '2.5px' }}>
                  <div className="w-full h-full flex items-center justify-center rounded-sm" style={{ backgroundColor: '#5BB8D5' }}>
                    <span className="text-[6px] font-bold text-white">COUPON</span>
                  </div>
                </div>
                <div className="absolute flex items-center" style={{ width: '45px', height: '12px', top: '18px', left: '0px' }}>
                  <div className="w-full h-full flex items-center justify-center rounded-sm" style={{ backgroundColor: '#6FC8E5' }}>
                    <span className="text-[6px] font-bold text-white">COUPON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 条件2 */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div 
                className="px-3 py-1 rounded-full flex-shrink-0 text-center"
                style={{ backgroundColor: '#FF6F61', width: '135px' }}
              >
                <span className="text-white text-xs font-bold whitespace-nowrap">❷ 掲載店リクエスト</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: '#666' }}>
                  お店をリクエスト！
                </p>
              </div>
              {/* チェックリストアイコン */}
              <div className="relative flex-shrink-0" style={{ width: '50px', height: '40px' }}>
                <div 
                  className="w-9 h-10 rounded border-2 flex flex-col items-start p-1 gap-0.5"
                  style={{ backgroundColor: '#FFF', borderColor: '#6FC8E5' }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#6FC8E5' }}></div>
                    <div className="w-3 h-0.5 rounded" style={{ backgroundColor: '#DDD' }}></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#6FC8E5' }}></div>
                    <div className="w-3 h-0.5 rounded" style={{ backgroundColor: '#DDD' }}></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm border" style={{ borderColor: '#FF6F61' }}></div>
                    <div className="w-3 h-0.5 rounded" style={{ backgroundColor: '#DDD' }}></div>
                  </div>
                </div>
                <div 
                  className="absolute right-0 bottom-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FF6F61' }}
                >
                  <span className="text-[8px] text-white">✎</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特典 */}
        <div 
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: '#FFD93B' }}
        >
          <p 
            className="text-base font-bold"
            style={{ color: '#FF6F61' }}
          >
            2026年
          </p>
          <h3 
            className="text-2xl font-bold"
            style={{ color: '#6FC8E5', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
          >
            4月末まで無料期間延長!!
          </h3>
        </div>
      </div>

      {/* 詳しくはWEBページをCHECK */}
      <div className="px-4 py-4 text-center" style={{ backgroundColor: '#6FC8E5' }}>
        <Link
          href="/lp"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold text-base"
          style={{ backgroundColor: '#333' }}
        >
          詳しくはWEBページをCHECK!
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* 新規登録ボタン（下部） */}
      <div className="px-4 py-4 text-center" style={{ backgroundColor: '#6FC8E5' }}>
        <Link
          href="/email-registration"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-lg"
          style={{ backgroundColor: '#FF6F61' }}
        >
          新規登録はこちら
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* 注意事項 */}
      <div className="px-4 py-3" style={{ backgroundColor: '#6FC8E5' }}>
        <div 
          className="p-4 rounded-xl text-xs leading-relaxed"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#666' }}
        >
          ※「nomocaKagawa」は、高松市を中心に&ldquo;Welcomeドリンク&rdquo;を楽しめる月額制（サブスク）サービスです。nomocaKagawa掲載店でサイト内クーポンを提示すると、各店舗につき1日に1杯の対象ドリンクが無料になります。※対象ドリンクや利用条件等は店舗・キャンペーンにより異なります。※本チラシのクーポンコードを入力した日から、2026年3月31日（火）までの期間、月額料金が無料でご利用いただけます。※無料期間が終了すると、通常の月額料金（一般会員980円／高松市みんなのアプリ会員480円）が自動的に課金されます。無料期間終了前であれば、いつでも無料でキャンセル可能です。※本キャンペーンは予告なく内容の変更、中止もしくは延長させていただく場合があります。あらかじめご了承ください。※本チラシの記載内容は、2026年1月1日時点の情報です。最新情報は公式サイトをご確認ください。
        </div>
      </div>

      {/* お問い合わせ */}
      <div className="px-4 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 
                className="text-base font-bold mb-2"
                style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
              >
                nomocaKagawaに関するお問い合わせ
              </h3>
              <p className="text-sm mb-3" style={{ color: '#666' }}>
                サイト内のお問い合わせより受け付けております。
              </p>
              <p className="text-xs" style={{ color: '#888' }}>
                運営会社 株式会社 PSYTEC AI
              </p>
            </div>
            <Link href="/lp" className="text-right block">
              <p className="text-xs mb-1" style={{ color: '#6FC8E5' }}>公式サイト</p>
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <Image
                  src="/main-logo.jpg"
                  alt="公式サイト"
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div 
        className="w-full py-6 text-center"
        style={{ backgroundColor: '#6FC8E5' }}
      >
        <p 
          className="text-sm"
          style={{ color: '#FFF', fontFamily: 'Rubik, sans-serif' }}
        >
          ©2025 nomocaKagawa
        </p>
      </div>
    </div>
  )
}
