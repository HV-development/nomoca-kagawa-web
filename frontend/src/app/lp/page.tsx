/// <reference path="../../types/shims-next.d.ts" />
// @ts-nocheck
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LPPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // LPページ用：bodyの最大幅制限を解除
  useEffect(() => {
    document.body.style.maxWidth = '100vw'
    return () => {
      document.body.style.maxWidth = ''
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
      {/* First View */}
      <div
        className="relative w-full min-h-screen"
        style={{
          maxWidth: 'none',
          width: '100vw',
          margin: 0,
          padding: 0,
          overflow: 'visible',
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: 'var(--sub, #FAF8F4)'
        }}
      >
        {/* Header */}
        <header className="relative w-full" style={{ zIndex: 100 }}>
          <div className="w-full px-4 py-4 md:px-8 md:py-6" style={{ width: '100vw', margin: 0 }}>
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <Image
                  src="/lp/images/nomoca-logo.svg"
                  alt="nomoca"
                  width={244}
                  height={92}
                  className="w-32 h-12 md:w-[244px] md:h-[92px]"
                  style={{
                    flexShrink: 0
                  }}
                />
              </div>
              <div className="flex items-center gap-4 md:gap-11">
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
                  <a href="#about" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-base lg:text-lg font-medium">nomocaとは</a>
                  <a href="#features" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-base lg:text-lg font-medium">魅力</a>
                  <a href="#flow" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-base lg:text-lg font-medium">使い方</a>
                  <a href="#pricing" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-base lg:text-lg font-medium">利用料金</a>
                  <a href="#stores" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-base lg:text-lg font-medium">加盟店一覧</a>
                </nav>

                <Link
                  href="/lp/merchant"
                  className="text-white font-bold hover:opacity-90 transition-opacity text-xs md:text-sm lg:text-base px-4 py-2 md:px-6 md:py-3"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '9999px',
                    background: 'var(--main, #2B7A78)'
                  }}
                >
                  <span className="hidden md:inline">お店の方はこちら</span>
                  <span className="md:hidden">お店の方</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* ハンバーガーメニューアイコン（モバイルのみ表示） */}
                <button
                  className="md:hidden flex flex-col justify-center items-center cursor-pointer"
                  style={{
                    gap: '6px'
                  }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="メニュー"
                >
                  <div style={{ width: '24px', height: '2px', background: '#2B7A78' }}></div>
                  <div style={{ width: '24px', height: '2px', background: '#2B7A78' }}></div>
                  <div style={{ width: '24px', height: '2px', background: '#2B7A78' }}></div>
                </button>
              </div>
            </div>
          </div>

          {/* モバイルメニュー */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden fixed inset-0 w-full h-full"
              style={{
                background: '#FFF',
                display: 'flex',
                paddingBottom: '184px',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '32px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                zIndex: 9999
              }}
            >
              {/* 閉じるボタン */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="メニューを閉じる"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#2B7A78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <nav className="flex flex-col items-center gap-8 py-8">
                <a
                  href="#about"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  nomocaとは
                </a>
                <a
                  href="#features"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  魅力
                </a>
                <a
                  href="#flow"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  使い方
                </a>
                <a
                  href="#pricing"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  利用料金
                </a>
                <a
                  href="#stores"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  加盟店一覧
                </a>
                <Link
                  href="/lp/contact"
                  className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  お問い合わせ
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* FV Main Content */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center px-4 md:px-20 py-12 md:py-24 gap-8 md:gap-20">
          {/* 左コンテンツ */}
          <div className="flex flex-col items-center gap-6">
            {/* 1店舗 1日 1杯無料 テキスト - absoluteで重ねる */}
            <div className="flex flex-row items-center justify-center whitespace-nowrap">
              {/* 1店舗 */}
              <div className="relative flex items-center">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-5xl md:text-6xl lg:text-7xl font-bold pl-3 md:pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 店舗テキスト */}
                <span
                  className="relative text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  店舗
                </span>
              </div>

              {/* 1日 - absoluteで重ねる */}
              <div className="relative flex items-center -ml-4 md:-ml-6 lg:-ml-8">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-5xl md:text-6xl lg:text-7xl font-bold pl-3 md:pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 日テキスト */}
                <span
                  className="relative text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  日
                </span>
              </div>

              {/* 1杯無料 - absoluteで重ねる */}
              <div className="relative flex items-center -ml-4 md:-ml-6 lg:-ml-8">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-5xl md:text-6xl lg:text-7xl font-bold pl-3 md:pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 杯無料テキスト */}
                <span
                  className="relative text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  杯無料
                </span>
              </div>
            </div>

            {/* nomoca で */}
            <div className="flex items-end gap-4">
              <Image
                src="/lp/images/nomoca-logo.svg"
                alt="nomoca"
                width={410}
                height={57}
                className="w-48 md:w-[300px] h-auto"
              />
              <span
                className="text-3xl md:text-4xl"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
              >
                で
              </span>
            </div>

            {/* サブテキスト */}
            <p
              className="text-xl md:text-2xl font-bold text-center"
              style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
            >
              もっと気軽に、楽しく街歩き！
            </p>
          </div>

          {/* イラストとスマホ */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/lp/images/fv-illustration.svg"
              alt="街のイラスト"
              width={602}
              height={578}
              className="w-64 md:w-[400px] lg:w-[500px] h-auto"
            />
            <div className="absolute right-0 md:right-[-50px] bottom-0">
              <Image
                src="/lp/images/fv-phone.png"
                alt="スマホ画面"
                width={204}
                height={413}
                className="w-24 md:w-32 lg:w-[180px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div className="max-w-6xl mx-auto">
          {/* About Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--main, #2B7A78)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              ABOUT
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              nomocaとは？
            </p>
          </div>

          {/* About Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* テキストコンテンツ */}
            <div
              className="flex-1 p-8 md:p-12 lg:p-16"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <h3
                className="text-xl md:text-2xl lg:text-3xl font-bold mb-6"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: '#000',
                  lineHeight: '1.6'
                }}
              >
                nomocaを片手に、<br />
                気になるお店をハシゴしよう。
              </h3>
              <p
                className="text-sm md:text-base"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: '#000',
                  fontWeight: '500',
                  lineHeight: '1.8'
                }}
              >
                「nomoca」は、毎日1軒につきドリンクが1杯無料になる新しい&ldquo;Welcomeドリンク&rdquo;サービスです。<br />
                お酒でもソフトドリンクでもOK。<br />
                気になるお店をみつけたら、仲間と乾杯したり、自分だけの寄り道を楽しんだり。<br />
                今日の一杯をきっかけに、街の楽しさがどんどん広がる。<br />
                あなたの「今日はどこで飲もう？」をもっと自由に、もっとおトクにします。
              </p>
            </div>

            {/* 画像 */}
            <div className="flex-shrink-0">
              <Image
                src="/lp/images/about-image.png"
                alt="nomocaを楽しむ人々"
                width={510}
                height={440}
                className="w-full md:w-[400px] lg:w-[510px] h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--main, #2B7A78)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Features Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--accent, #FFD93B)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--accent, #FFD93B)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              FEATURES
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--accent, #FFD93B)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              nomocaの魅力
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Feature 01 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src="/lp/images/feature-01.png"
                  alt="1店舗につき1杯無料！"
                  width={558}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    lineHeight: '1.6'
                  }}
                >
                  1店舗につき1杯無料！
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  お酒でもソフトドリンクでもOK。<br />
                  「nomoca（ノモカ）」の加盟店なら、ドリンク1杯が無料に。<br />
                  ちょっと気になっていたお店に入ってみたり、気軽に一息ついたり。<br />
                  お財布にやさしく、気軽に乾杯を楽しめます。
                </p>
              </div>
            </div>

            {/* Feature 02 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src="/lp/images/feature-02.png"
                  alt="1日で複数店舗をハシゴできる！"
                  width={558}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    lineHeight: '1.6'
                  }}
                >
                  1日で複数店舗をハシゴできる！
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  1店舗ごとに1杯無料だから、1日で何軒もまわれるのが「nomoca」の魅力。<br />
                  今日は仲間とカジュアルに、明日はしっとり一人飲み。<br />
                  その日の気分に合わせて、自由にドリンクめぐり！
                </p>
              </div>
            </div>

            {/* Feature 03 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src="/lp/images/feature-03.png"
                  alt="お酒が苦手でも楽しめる！"
                  width={558}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    lineHeight: '1.6'
                  }}
                >
                  お酒が苦手でも楽しめる！
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  「nomoca」は&ldquo;飲める人だけ&rdquo;のサービスではありません。<br />
                  ソフトドリンクも対象だから、ノンアル派や飲めない人でも安心。<br />
                  友達との軽い寄り道にも、一人時間のリフレッシュにも使えて、<br />
                  誰でも気軽に&ldquo;乾杯&rdquo;をシェアできます。
                </p>
              </div>
            </div>

            {/* Feature 04 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src="/lp/images/feature-04.png"
                  alt="新しいお店との出会い！"
                  width={558}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    lineHeight: '1.6'
                  }}
                >
                  新しいお店との出会い！
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: 'var(--sub, #FAF8F4)',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  普段行かないお店でも、1杯無料なら試しやすい。<br />
                  地元で愛される居酒屋から、雰囲気のいいカフェバーまで。<br />
                  nomocaがあれば、お店との新しい出会いを見つかるかも。<br />
                  街歩きしながら、思いがけない発見を楽しもう！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Section */}
      <div id="flow" className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Flow Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--main, #2B7A78)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              FLOW
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              nomocaの使い方
            </p>
          </div>

          {/* Flow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Step 1 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/flow-step-01.png"
                      alt="お店を見つける"
                      width={350}
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-full -mt-8 z-10"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    STEP
                  </span>
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    1
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6 text-center">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    lineHeight: '1.6'
                  }}
                >
                  お店を見つける
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  今いる場所の近くや、行ってみたいお店をマップやリストからチェック。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/flow-step-02.png"
                      alt="スマホを見せる"
                      width={350}
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-full -mt-8 z-10"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    STEP
                  </span>
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    2
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6 text-center">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    lineHeight: '1.6'
                  }}
                >
                  スマホを見せる
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  お店でnomocaのクーポン画面を見せるだけ。<br />
                  対象ドリンクが&ldquo;その場で1杯無料&rdquo;に！
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col gap-6"
              style={{ backgroundColor: 'rgba(43, 122, 120, 0.1)' }}
            >
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/flow-step-03.png"
                      alt="ハシゴして楽しむ"
                      width={350}
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-full -mt-8 z-10"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    STEP
                  </span>
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '500',
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    3
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6 text-center">
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    lineHeight: '1.6'
                  }}
                >
                  ハシゴして楽しむ
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: '#000',
                    fontWeight: '500',
                    lineHeight: '1.8'
                  }}
                >
                  お店を変えれば、同じ日にまた1杯無料。<br />
                  あなたの&ldquo;ちょい飲み&rdquo;がもっと自由に。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="w-full py-0 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Pricing Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--main, #2B7A78)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              PRICING
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              利用料金
            </p>
          </div>

          {/* Pricing Subtitle */}
          <div className="text-center mb-8 md:mb-12">
            <p
              className="text-xl md:text-2xl font-bold"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              1日あたり約30円でちょい飲み体験！
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            className="relative p-8 md:p-12 lg:p-16 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/lp/images/pricing-bg.png)',
              backgroundColor: '#FFF'
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
              {/* 通常プラン */}
              <div
                className="flex flex-col items-center gap-4 p-6 md:p-8"
                style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}
              >
                {/* 1日1軒1杯無料 */}
                <div
                  className="flex items-center gap-4 px-6 py-2"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                >
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M1 1L11 10L1 19" stroke="#2B7A78" strokeWidth="2"/>
                  </svg>
                  <span
                    className="text-xl md:text-2xl font-bold"
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      color: 'var(--main, #2B7A78)'
                    }}
                  >
                    １日1軒1杯無料
                  </span>
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M11 1L1 10L11 19" stroke="#2B7A78" strokeWidth="2"/>
                  </svg>
                </div>

                {/* 価格 */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full"
                    style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        color: '#000'
                      }}
                    >
                      月額
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-6xl md:text-7xl lg:text-8xl font-semibold"
                      style={{
                        fontFamily: 'Oswald, sans-serif',
                        color: '#000',
                        letterSpacing: '-0.06em'
                      }}
                    >
                      980
                    </span>
                    <span
                      className="text-lg md:text-xl font-bold pb-2"
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        color: '#000'
                      }}
                    >
                      円（税込）
                    </span>
                  </div>
                </div>
              </div>

              {/* マイデジ会員プラン */}
              <div
                className="flex items-center gap-4 p-6 md:p-8"
                style={{ backgroundColor: 'var(--main, #2B7A78)' }}
              >
                <Image
                  src="/lp/images/mydigi-phone.png"
                  alt="マイデジアプリ"
                  width={152}
                  height={179}
                  className="w-24 md:w-32 lg:w-[152px] h-auto"
                />
                <div className="flex flex-col gap-2">
                  <div
                    className="px-4 py-1 text-center"
                    style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
                  >
                    <span
                      className="text-lg md:text-xl font-bold"
                      style={{
                        fontFamily: "'Zen Kaku Gothic New', sans-serif",
                        color: '#000'
                      }}
                    >
                      マイデジ会員なら
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full"
                      style={{ backgroundColor: '#FFF' }}
                    >
                      <span
                        className="text-sm md:text-base font-bold"
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          color: '#000'
                        }}
                      >
                        月額
                      </span>
                    </div>
                    <span
                      className="text-5xl md:text-6xl lg:text-7xl font-bold"
                      style={{
                        fontFamily: 'Oswald, sans-serif',
                        color: '#FFF'
                      }}
                    >
                      480
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="text-base md:text-lg font-bold"
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          color: '#FFF'
                        }}
                      >
                        円で
                      </span>
                      <span
                        className="text-base md:text-lg font-bold"
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          color: '#FFF'
                        }}
                      >
                        利用可能！
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="text-center mt-8">
            <p
              className="text-sm md:text-base mb-2"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                color: '#000',
                lineHeight: '1.6'
              }}
            >
              ※対象ドリンクは店舗により異なります。
            </p>
            <p
              className="text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                color: '#000',
                lineHeight: '1.6'
              }}
            >
              ※同一店舗での無料適用は1日お一人さま1杯までです。
            </p>
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div
        id="stores"
        className="relative w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-32"
      >
        {/* 背景画像 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/lp/images/stores-bg.svg)'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Stores Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--sub, #FAF8F4)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--sub, #FAF8F4)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              STORES
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--sub, #FAF8F4)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              加盟店
            </p>
          </div>

          {/* Stores Content */}
          <div className="text-center">
            <p
              className="text-xl md:text-2xl font-bold mb-8"
              style={{
                color: 'var(--sub, #FAF8F4)',
                fontFamily: "'Noto Sans JP', sans-serif",
                lineHeight: '1.6'
              }}
            >
              加盟店、ぞくぞく拡大中！
            </p>

            {/* Store List Button */}
            <button
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--accent, #FFD93B)'
              }}
              onClick={() => router.push('/home')}
            >
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: '#000'
                }}
              >
                店舗一覧はこちら
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div className="max-w-6xl mx-auto">
          {/* FAQ Title */}
          <div className="flex items-end gap-6 md:gap-10 mb-8 md:mb-12 pb-6 border-b" style={{ borderColor: 'var(--main, #2B7A78)' }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: '500',
                lineHeight: '1'
              }}
            >
              FAQ
            </h2>
            <p
              className="text-lg md:text-xl lg:text-2xl font-bold"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif"
              }}
            >
              よくあるご質問
            </p>
          </div>

          {/* FAQ Content */}
          <div className="text-center">
            <p
              className="text-lg md:text-xl font-bold mb-8"
              style={{
                color: 'var(--main, #2B7A78)',
                fontFamily: "'Noto Sans JP', sans-serif",
                lineHeight: '1.6'
              }}
            >
              お問い合わせの多い質問をまとめました。<br />
              お問い合わせの前に、ご確認ください。
            </p>

            <Link
              href="/lp/faq"
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--main, #2B7A78)'
              }}
            >
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: 'var(--sub, #FAF8F4)'
                }}
              >
                よくあるご質問はこちら
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#FAF8F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-16 md:py-20 px-4 md:px-8 lg:px-32" style={{ backgroundColor: 'var(--accent, #FFD93B)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
            style={{
              color: 'var(--main, #2B7A78)',
              fontFamily: "'Noto Sans JP', sans-serif"
            }}
          >
            掲載店募集中！
          </h2>

          <button
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: 'var(--main, #2B7A78)'
            }}
            onClick={() => router.push('/lp/merchant')}
          >
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                color: 'var(--sub, #FAF8F4)'
              }}
            >
              お店の方はこちら
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#FAF8F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full bg-white py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 md:gap-8">
          {/* Logo */}
          <Image
            src="/lp/images/footer-logo.svg"
            alt="nomoca"
            width={294}
            height={294}
            className="w-48 md:w-64 lg:w-[294px] h-auto"
          />

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-10">
            <Link
              href="/lp/faq"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              よくあるご質問
            </Link>
            <Link
              href="/lp/contact"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              お問い合わせ
            </Link>
            <a
              href="/プライバシーポリシー.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              プライバシーポリシー
            </a>
            <a
              href="/特定商取引法.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              特定商取引法に基づく表記
            </a>
            <Link
              href="/lp/terms"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              ご利用規約
            </Link>
            <a
              href="#"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm md:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500'
              }}
            >
              運営会社
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 md:pt-8 border-t border-gray-200 w-full text-center">
            <p
              className="text-sm md:text-base"
              style={{
                fontFamily: 'Oswald, sans-serif',
                color: '#000'
              }}
            >
              ©2025 nomoca Kagawa
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
