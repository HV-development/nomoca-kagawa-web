'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function CampaignPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#6FC8E5' }}>
      {/* ヘッダー */}
      <div className="w-full py-4 px-4 text-center" style={{ backgroundColor: '#6FC8E5' }}>
        <h1 
          className="text-xl font-bold"
          style={{
            color: '#FFF',
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
          }}
        >
          モニター会員登録方法
        </h1>
      </div>

      {/* 3ステップセクション - PDFと同様の横並び */}
      <div className="px-3 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="flex items-stretch justify-center gap-1">
          {/* Step 1: サイトへアクセス */}
          <div className="bg-white rounded-lg p-2 flex-1 max-w-[110px] text-center">
            <h2 
              className="text-xs font-bold mb-2 leading-tight"
              style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
            >
              サイトへ<br />アクセス
            </h2>
            <div 
              className="rounded-lg p-2 mb-2"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <Image
                src="/main-logo.jpg"
                alt="nomocaKagawa"
                width={60}
                height={60}
                className="mx-auto"
              />
              <p className="text-[8px] mt-1" style={{ color: '#6FC8E5' }}>nomocaKagawa</p>
            </div>
            <Link
              href="/email-registration"
              className="block w-full py-1 rounded text-[9px] font-bold text-white"
              style={{ backgroundColor: '#FF6F61' }}
            >
              新規登録 →
            </Link>
          </div>

          {/* 矢印 */}
          <div className="flex items-center px-1">
            <span className="text-white text-xl">▶</span>
          </div>

          {/* Step 2: 新規登録 */}
          <div className="bg-white rounded-lg p-2 flex-1 max-w-[110px] text-center">
            <h2 
              className="text-xs font-bold mb-2 leading-tight"
              style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
            >
              新規登録
            </h2>
            <p 
              className="text-[8px] leading-tight mb-2"
              style={{ color: '#666' }}
            >
              ※お支払い方法の登録が必要です。モニター期間終了後、月額料金の自動請求が開始します。
            </p>
          </div>

          {/* 矢印 */}
          <div className="flex items-center px-1">
            <span className="text-white text-xl">▶</span>
          </div>

          {/* Step 3: コード入力 */}
          <div 
            className="rounded-lg p-2 flex-1 max-w-[110px] text-center"
            style={{ backgroundColor: '#FFD93B' }}
          >
            <h2 
              className="text-xs font-bold mb-1 leading-tight"
              style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
            >
              nomocaKagawa<br />コード入力
            </h2>
            <div 
              className="rounded py-2 px-1 mb-1"
              style={{ backgroundColor: '#6FC8E5' }}
            >
              <span 
                className="text-2xl font-bold tracking-wide"
                style={{ color: '#FFF', fontFamily: 'Rubik, sans-serif' }}
              >
                5959
              </span>
            </div>
            <p className="text-[7px]" style={{ color: '#333' }}>
              新規登録ページ内コード入力欄に<br />上記4桁の数字を入力ください。
            </p>
            <p className="text-[7px] mt-1" style={{ color: '#FF6F61', fontWeight: 700 }}>
              有効期限：2026年3月31日(火)
            </p>
            <p className="text-[7px]" style={{ color: '#666' }}>
              お一人様1回限り有効
            </p>
          </div>
        </div>
      </div>

      {/* アプリダウンロードセクション */}
      <div className="px-3 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h2 
                className="text-sm font-bold leading-tight"
                style={{ color: '#6FC8E5', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
              >
                「マイデジ」ダウンロードはこちら
                <span className="text-[10px] font-normal ml-1" style={{ color: '#888' }}>（登録無料）</span>
              </h2>
              <p className="text-[9px] mt-1 leading-relaxed" style={{ color: '#666' }}>
                「マイデジ」は、行政手続きや地域サービス、地域通貨が使える便利な生活アプリです。
              </p>
              <p 
                className="text-[10px] font-bold mt-1"
                style={{ color: '#FF6F61' }}
              >
                市内在住の方はもちろん、市外の方も使える！
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-3 mb-3">
            <a
              href="https://apps.apple.com/jp/app/id6504632498"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/app-store.svg" alt="App Store" width={100} height={30} className="h-8 w-auto" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=jp.mydigi.kagawa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/google-play.svg" alt="Google Play" width={100} height={30} className="h-8 w-auto" />
            </a>
          </div>

          {/* 紐づけ方法 */}
          <div 
            className="rounded-lg p-3 mt-2"
            style={{ backgroundColor: '#F0F8FA', border: '2px solid #6FC8E5' }}
          >
            <h3 
              className="text-sm font-bold mb-3 text-center"
              style={{ color: '#6FC8E5' }}
            >
              「nomocaKagawa」と紐づけよう！
            </h3>
            <div className="space-y-3 text-[10px]">
              <div className="flex items-center gap-3">
                <span 
                  className="inline-flex w-6 h-6 rounded-full items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >1</span>
                <p style={{ color: '#333' }}>「マイデジ」を開く</p>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className="inline-flex w-6 h-6 rounded-full items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >2</span>
                <p style={{ color: '#333' }}>メニュー内「ユーザーID」をコピー</p>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className="inline-flex w-6 h-6 rounded-full items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#6FC8E5' }}
                >3</span>
                <p style={{ color: '#333' }}>「nomocaKagawa」マイページ内「アカウント」にコピーしたユーザーIDを入力</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* キャンペーン条件セクション */}
      <div className="px-3 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        {/* 達成条件ヘッダー */}
        <div className="text-center mb-3 relative">
          <div 
            className="absolute -top-2 -left-1 w-12 h-12 flex items-center justify-center"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpolygon points=\'50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35\' fill=\'%23FFD93B\'/%3E%3C/svg%3E")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <span className="text-[8px] font-bold" style={{ color: '#333' }}>達成!</span>
          </div>
          <p 
            className="text-sm font-bold py-2 px-4 rounded-full inline-block"
            style={{ backgroundColor: '#FFF', color: '#333' }}
          >
            条件<span style={{ color: '#FF6F61' }}>①</span><span style={{ color: '#FF6F61' }}>②</span>を2026年2月28日(土)までに達成すると
          </p>
        </div>

        {/* 条件カード */}
        <div className="flex gap-2 mb-3">
          {/* 条件1 */}
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div 
              className="inline-block px-3 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: '#FF6F61' }}
            >
              <span className="text-white text-xs font-bold">❶</span>
              <span className="text-white text-xs font-bold ml-1">3店舗利用</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              </div>
            </div>
            <p className="text-[9px]" style={{ color: '#666' }}>
              期間中3店舗で<br />nomocaKagawaを<br />利用しよう！
            </p>
          </div>

          {/* 条件2 */}
          <div className="flex-1 bg-white rounded-lg p-3 text-center">
            <div 
              className="inline-block px-3 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: '#FF6F61' }}
            >
              <span className="text-white text-xs font-bold">❷</span>
              <span className="text-white text-xs font-bold ml-1">掲載店1店舗リクエスト</span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                <span className="text-lg">🏪</span>
              </div>
            </div>
            <p className="text-[9px]" style={{ color: '#666' }}>
              掲載店になって欲しい<br />お店をリクエスト！
            </p>
          </div>
        </div>

        {/* 特典 */}
        <div 
          className="rounded-lg p-4 text-center"
          style={{ backgroundColor: '#FFD93B' }}
        >
          <p 
            className="text-sm font-bold"
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
      <div className="px-3 py-4 text-center" style={{ backgroundColor: '#6FC8E5' }}>
        <Link
          href="/lp"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-sm"
          style={{ backgroundColor: '#333' }}
        >
          詳しくはWEBページをCHECK!
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* 注意事項 */}
      <div className="px-3 py-3" style={{ backgroundColor: '#6FC8E5' }}>
        <div 
          className="p-3 rounded-lg text-[8px] leading-relaxed"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#666' }}
        >
          ※「nomocaKagawa」は、高松市を中心に&ldquo;Welcomeドリンク&rdquo;を楽しめる月額制（サブスク）サービスです。nomocaKagawa掲載店でサイト内クーポンを提示すると、各店舗につき1日に1杯の対象ドリンクが無料になります。※対象ドリンクや利用条件等は店舗・キャンペーンにより異なります。※本チラシのクーポンコードを入力した日から、2026年3月31日（火）までの期間、月額料金が無料でご利用いただけます。※無料期間が終了すると、通常の月額料金（一般会員980円／高松市みんなのアプリ会員480円）が自動的に課金されます。無料期間終了前であれば、いつでも無料でキャンセル可能です。※本キャンペーンは予告なく内容の変更、中止もしくは延長させていただく場合があります。あらかじめご了承ください。※本チラシの記載内容は、2026年1月1日時点の情報です。最新情報は公式サイトをご確認ください。
        </div>
      </div>

      {/* お問い合わせ */}
      <div className="px-3 py-4" style={{ backgroundColor: '#6FC8E5' }}>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 
                className="text-sm font-bold mb-2"
                style={{ color: '#333', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
              >
                nomocaKagawaに関するお問い合わせ
              </h3>
              <p className="text-[10px] mb-3" style={{ color: '#666' }}>
                サイト内「ヘルプ・お問い合わせ」より受け付けております。
              </p>
              <p className="text-[9px]" style={{ color: '#888' }}>
                運営会社 株式会社つなぐ
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] mb-1" style={{ color: '#6FC8E5' }}>公式サイト</p>
              <div 
                className="w-16 h-16 rounded flex items-center justify-center"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <Image
                  src="/main-logo.jpg"
                  alt="QRコード"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div 
        className="w-full py-4 text-center"
        style={{ backgroundColor: '#6FC8E5' }}
      >
        <p 
          className="text-xs"
          style={{ color: '#FFF', fontFamily: 'Rubik, sans-serif' }}
        >
          ©2025 nomocaKagawa
        </p>
      </div>
    </div>
  )
}
