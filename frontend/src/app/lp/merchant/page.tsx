'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function MerchantLPPage() {
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
      {/* ===== PC用 Header (lg以上) ===== */}
      <header className="hidden lg:flex w-full justify-between items-center px-6 py-2" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div className="flex items-center">
          <Image
            src="/lp/images/logo-nomoca.svg"
            alt="nomoca"
            width={244}
            height={92}
            className="w-[244px] h-[92px]"
            style={{ flexShrink: 0 }}
          />
        </div>
        <div className="flex items-center gap-11">
          <nav className="flex items-center space-x-10">
            <a href="#about" className="text-black hover:text-[#2B7A78] transition-colors text-base font-medium">nomocaとは</a>
            <a href="#benefits" className="text-black hover:text-[#2B7A78] transition-colors text-base font-medium">メリット</a>
            <a href="#simple" className="text-black hover:text-[#2B7A78] transition-colors text-base font-medium">使い方</a>
            <a href="#how-to-apply" className="text-black hover:text-[#2B7A78] transition-colors text-base font-medium">お申し込み方法</a>
            <Link href="/lp/contact" className="text-black hover:text-[#2B7A78] transition-colors text-base font-medium">お問い合わせ</Link>
          </nav>
          <Link
            href="/lp"
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
            ユーザーの方はこちら
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none" className="w-2 h-3 md:w-3 md:h-4">
              <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </header>

      {/* ===== PC用FV (lg以上) ===== */}
      <div className="hidden lg:flex w-full" style={{ height: 'calc(100vh - 108px)' }}>
        {/* 左側: 背景画像 */}
        <div className="relative flex-1">
          <Image
            src="/lp/images/merchant-fv-bg.webp"
            alt="飲食店向けファーストビュー"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 右側: 緑背景 + コンテンツ */}
        <div
          className="flex flex-col justify-center items-center gap-16 px-16 py-[72px]"
          style={{ background: 'var(--main, #2B7A78)' }}
        >
          {/* nomoca 加盟店募集中 */}
          <div className="flex flex-col items-center gap-16">
            <div className="flex flex-col items-center gap-4">
              <span
                className="text-[120px] font-bold leading-none"
                style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}
              >
                nomoca
              </span>
              <span
                className="text-[56px] font-bold leading-none"
                style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}
              >
                加盟店募集中
              </span>
            </div>

            {/* 料金情報 */}
            <div className="flex items-center">
              {/* 左端の縦線 */}
              <div className="w-0.5 h-24 bg-[#FAF8F4] flex-shrink-0"></div>
              
              {/* 初期費用 */}
              <div className="flex items-center gap-2 px-4">
                <div className="flex px-4 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-lg font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    初期費用
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[80px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    0
                  </span>
                  <span className="text-[26px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 縦線 */}
              <div className="w-0.5 h-24 bg-[#FAF8F4] flex-shrink-0"></div>

              {/* 掲載料 */}
              <div className="flex items-center gap-2 px-4">
                <div className="flex px-4 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-lg font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    掲載料
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[80px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    0
                  </span>
                  <span className="text-[26px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 縦線 */}
              <div className="w-0.5 h-24 bg-[#FAF8F4] flex-shrink-0"></div>

              {/* 解約金 */}
              <div className="flex items-center gap-2 px-4">
                <div className="flex px-4 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-lg font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    解約金
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[80px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    0
                  </span>
                  <span className="text-[26px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 右端の縦線 */}
              <div className="w-0.5 h-24 bg-[#FAF8F4] flex-shrink-0"></div>
            </div>
          </div>

          {/* CTAボタン */}
          <Link
            href="/lp/merchant/apply"
            className="flex w-[320px] px-6 py-4 justify-center items-center gap-2 rounded-full"
            style={{ background: 'var(--accent, #FFD93B)' }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                今すぐ無料で
              </span>
              <span className="text-[26px] font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                お申し込み
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute right-6">
              <path d="M16.67 11.67L25 20L16.67 28.33" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ===== スマホ・タブレット用FV (lg未満) ===== */}
      <div className="lg:hidden w-full">
        {/* Header - スマホ・タブレット用 */}
        <header className="relative w-full z-[100]" style={{ background: 'var(--main, #2B7A78)' }}>
          <div className="w-full px-4 py-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Image
                  src="/lp/images/logo-nomoca.svg"
                  alt="nomoca"
                  width={130}
                  height={50}
                  className="w-[130px] h-[50px]"
                  style={{ flexShrink: 0 }}
                />
              </div>
              <div className="flex items-center gap-4">
                {/* ハンバーガーメニュー */}
                <button
                  className="flex flex-col justify-center items-center cursor-pointer"
                  style={{ gap: '6px' }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="メニュー"
                >
                  <div style={{ width: '20px', height: '2px', background: '#FFF' }}></div>
                  <div style={{ width: '20px', height: '2px', background: '#FFF' }}></div>
                  <div style={{ width: '20px', height: '2px', background: '#FFF' }}></div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 w-full h-full z-[9999]"
            style={{ background: '#FFF' }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="メニューを閉じる"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#2B7A78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <nav className="flex flex-col items-center justify-center h-full gap-8 py-8">
              <a href="#about" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                nomocaとは
              </a>
              <a href="#benefits" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                メリット
              </a>
              <a href="#simple" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                使い方
              </a>
              <a href="#how-to-apply" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                お申し込み方法
              </a>
              <Link href="/lp/contact" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                お問い合わせ
              </Link>
              <Link href="/lp" className="text-gray-800 hover:text-[#2B7A78] transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                ユーザーの方はこちら
              </Link>
            </nav>
          </div>
        )}

        {/* FVコンテンツ */}
        <div
          className="flex flex-col justify-end items-center gap-10 px-[39px] pb-10"
          style={{ background: 'var(--main, #2B7A78)' }}
        >
          {/* メインコンテンツ */}
          <div className="flex flex-col items-center gap-10 w-full">
            {/* テキスト */}
            <div className="flex flex-col items-center gap-2 w-full">
              {/* nomoca 掲載店募集中 */}
              <div className="flex flex-col items-center gap-4">
                <span
                  className="text-[75px] font-bold leading-none"
                  style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}
                >
                  nomoca
                </span>
                <span
                  className="text-[38px] font-bold leading-none"
                  style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}
                >
                  掲載店募集中
                </span>
              </div>
            </div>

            {/* 料金情報 */}
            <div className="flex items-center justify-center w-full">
              {/* 左端の縦線 */}
              <div className="w-0.5 h-24 bg-white flex-shrink-0"></div>

              {/* 初期費用 */}
              <div className="flex items-center gap-2 px-3">
                <div className="flex px-3 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-sm font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    初期費用
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[50px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: '#FFF' }}>
                    0
                  </span>
                  <span className="text-[18px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 縦線 */}
              <div className="w-0.5 h-24 bg-white flex-shrink-0"></div>

              {/* 掲載料 */}
              <div className="flex items-center gap-2 px-3">
                <div className="flex px-3 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-sm font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    掲載料
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[50px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: '#FFF' }}>
                    0
                  </span>
                  <span className="text-[18px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 縦線 */}
              <div className="w-0.5 h-24 bg-white flex-shrink-0"></div>

              {/* 解約金 */}
              <div className="flex items-center gap-2 px-3">
                <div className="flex px-3 py-1 justify-center items-center rounded-full" style={{ background: 'var(--accent, #FFD93B)' }}>
                  <span className="text-sm font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}>
                    解約金
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[50px] font-semibold leading-none" style={{ fontFamily: 'Commissioner, sans-serif', color: '#FFF' }}>
                    0
                  </span>
                  <span className="text-[18px] font-bold leading-none pb-1" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}>
                    円
                  </span>
                </div>
              </div>

              {/* 右端の縦線 */}
              <div className="w-0.5 h-24 bg-white flex-shrink-0"></div>
            </div>
          </div>

          {/* CTAボタン */}
          <Link
            href="/lp/merchant/apply"
            className="flex w-[320px] px-6 py-4 justify-center items-center gap-2 rounded-full relative"
            style={{ background: 'var(--accent, #FFD93B)' }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                今すぐ無料で
              </span>
              <span className="text-[26px] font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                お申し込み
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute right-4">
              <path d="M16.67 11.67L25 20L16.67 28.33" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ===== Overview Section (nomocaとは) ===== */}
      <div
        id="about"
        className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 px-5 lg:px-[210px] py-20"
        style={{ background: '#FFF' }}
      >
        {/* 画像 */}
        <div className="w-full lg:w-[540px] h-auto lg:h-[400px] flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src="/lp/images/merchant-overview.webp"
            alt="nomocaの仕組み"
            width={540}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>

        {/* テキスト */}
        <div className="flex flex-col gap-6 max-w-[480px]">
          <p
            className="text-lg leading-[160%]"
            style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
          >
            「nomoca」は、お店の負担を最小限にしながら新規のお客様を呼び込める、飲食店向け集客サービスです。導入費用も広告費も一切かかりません。お店が行うのは、来店されたお客様へ最初の1杯をサービスするだけ。あとは普段どおり営業していただければOKです。
          </p>
          <p
            className="text-lg leading-[160%]"
            style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
          >
            お客様にとっては&ldquo;試しやすさ&rdquo;が生まれ、お店にとっては新しい来店のきっかけが自然に生まれます。忙しいままでも、無理なく売上アップを狙える。そんなシンプルで続けやすい仕組みです。
          </p>
        </div>
      </div>

      {/* ===== Benefits Section (掲載店のメリット) ===== */}
      <div
        id="benefits"
        className="flex flex-col justify-center items-center gap-11 px-5 lg:px-[120px] py-20"
        style={{ background: '#EFECE8' }}
      >
        {/* タイトル */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-[28px] lg:text-[32px] font-bold leading-none text-center"
            style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
          >
            掲載店のメリット
          </h2>
        </div>

        {/* サブタイトル */}
        <p
          className="text-[18px] font-bold leading-[160%] text-center"
          style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}
        >
          &ldquo;nomoca&rdquo;に掲載することで、新しいお客様との出会いが広がります！
        </p>

        {/* メリットカード */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-4 lg:gap-10 w-full max-w-[1200px]">
          {/* Merit 1 */}
          <div
            className="flex flex-col lg:flex-row items-start gap-4 p-4 pr-6"
            style={{ background: 'var(--sub, #FAF8F4)', maxWidth: '580px' }}
          >
            <Image
              src="/lp/images/merchant-benefit-01.webp"
              alt="初期費用・掲載費無料"
              width={120}
              height={120}
              className="w-[68px] h-[68px] lg:w-[120px] lg:h-[120px] flex-shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-[17px] lg:text-lg font-bold leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                初期費用・掲載費【無料】
              </h3>
              <p className="text-base leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                導入コストは一切不要。月額費もかからず、すぐにスタートできます。
              </p>
            </div>
          </div>

          {/* Merit 2 */}
          <div
            className="flex flex-col lg:flex-row items-start gap-4 p-4 pr-6"
            style={{ background: 'var(--sub, #FAF8F4)', maxWidth: '580px' }}
          >
            <Image
              src="/lp/images/merchant-benefit-02.webp"
              alt="無料ドリンクで集客"
              width={120}
              height={120}
              className="w-[68px] h-[68px] lg:w-[120px] lg:h-[120px] flex-shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-[17px] lg:text-lg font-bold leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                無料ドリンクで集客＆回遊を促進
              </h3>
              <p className="text-base leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                「nomoca」をきっかけに来店したお客様が、料理や追加注文をすることで客単価がアップ。回遊性も高まり、新規顧客獲得につながります。
              </p>
            </div>
          </div>

          {/* Merit 3 */}
          <div
            className="flex flex-col lg:flex-row items-start gap-4 p-4 pr-6"
            style={{ background: 'var(--sub, #FAF8F4)', maxWidth: '580px' }}
          >
            <Image
              src="/lp/images/merchant-benefit-03.webp"
              alt="新しいお客様との接点づくり"
              width={120}
              height={120}
              className="w-[68px] h-[68px] lg:w-[120px] lg:h-[120px] flex-shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-[17px] lg:text-lg font-bold leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                新しいお客様との接点づくり
              </h3>
              <p className="text-base leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                普段来店しない層や若い世代など、これまで出会えなかったお客様に知ってもらうきっかけになります。
              </p>
            </div>
          </div>

          {/* Merit 4 */}
          <div
            className="flex flex-col lg:flex-row items-start gap-4 p-4 pr-6"
            style={{ background: 'var(--sub, #FAF8F4)', maxWidth: '580px' }}
          >
            <Image
              src="/lp/images/merchant-benefit-04.webp"
              alt="簡単導入＆安心サポート"
              width={120}
              height={120}
              className="w-[68px] h-[68px] lg:w-[120px] lg:h-[120px] flex-shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-[17px] lg:text-lg font-bold leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                簡単導入＆安心サポート
              </h3>
              <p className="text-base leading-[160%]" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                掲載店ステッカーを貼るだけで導入完了。nomocaスタッフが運用までしっかりサポートします。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Simple Process Section (お店の対応はシンプル) ===== */}
      <div
        id="simple"
        className="flex flex-col justify-center items-center gap-8 lg:gap-10 px-6 lg:px-[120px] py-20"
        style={{ background: 'var(--sub, #FAF8F4)' }}
      >
        {/* タイトル */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-[28px] lg:text-[32px] font-bold leading-[1.1] text-center"
            style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
          >
            お店の対応はシンプル！ 約3秒で完了
          </h2>
        </div>

        {/* サブタイトル */}
        <p
          className="text-[15px] lg:text-[18px] font-bold leading-[180%] text-center"
          style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}
        >
          お客様が提示する画面を確認するだけ。<br className="hidden lg:block" />シンプルな仕組みだから、忙しい時間帯でもスムーズに対応できます。
        </p>

        {/* プロセス画像（Figmaデザイン） */}
        <div className="w-full flex justify-center">
          <Image
            src="/lp/images/merchant-simple.webp"
            alt="お店の対応フロー（約3秒）"
            width={920}
            height={484}
            className="w-full max-w-[920px] h-auto"
          />
        </div>
      </div>

      {/* ===== How to Apply Section (お申し込み方法) ===== */}
      <div
        id="how-to-apply"
        className="flex flex-col justify-center items-center gap-11 px-5 lg:px-[120px] py-20"
        style={{ background: 'rgba(43, 122, 120, 0.15)' }}
      >
        {/* タイトル */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-[28px] lg:text-[32px] font-bold leading-none text-center"
            style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
          >
            お申し込み方法
          </h2>
        </div>

        {/* サブタイトル */}
        <p
          className="text-[18px] font-bold leading-[160%] text-center"
          style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}
        >
          「nomoca」のご利用を開始するまでのステップをご紹介します。
        </p>

        {/* ステップカード */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-4 w-full max-w-[1200px]">
          {/* Step 1 */}
          <div
            className="flex-1 flex flex-col items-center gap-4"
            style={{ background: 'var(--sub, #FAF8F4)' }}
          >
            <div className="relative w-full">
              <Image
                src="/lp/images/merchant-step-01.webp"
                alt="STEP.1 お申し込み"
                width={348}
                height={217}
                className="w-full h-auto"
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-sm"
                style={{ background: 'var(--main, #2B7A78)' }}
              >
                <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                  STEP.1
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 pb-6">
              <h3 className="text-2xl font-bold leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                お申し込み
              </h3>
              <p className="text-base font-medium leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                お申し込みフォームからお店の情報を入力して送信してください。
              </p>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="w-[46px] h-[46px] flex items-center justify-center rounded-full"
              style={{ background: 'var(--accent, #FFD93B)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Arrow 1 (Mobile/Tablet) */}
          <div className="lg:hidden flex items-center justify-center">
            <div
              className="w-[46px] h-[46px] flex items-center justify-center rounded-full"
              style={{ background: 'var(--accent, #FFD93B)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="flex-1 flex flex-col items-center gap-4"
            style={{ background: 'var(--sub, #FAF8F4)' }}
          >
            <div className="relative w-full">
              <Image
                src="/lp/images/merchant-step-02.webp"
                alt="STEP.2 掲載内容確認"
                width={348}
                height={217}
                className="w-full h-auto"
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-sm"
                style={{ background: 'var(--main, #2B7A78)' }}
              >
                <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                  STEP.2
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 pb-6">
              <h3 className="text-2xl font-bold leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                掲載内容確認
              </h3>
              <p className="text-base font-medium leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                申し込み内容をnomoca事務局で確認し、販促物を店舗に向けて発送します。
              </p>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="w-[46px] h-[46px] flex items-center justify-center rounded-full"
              style={{ background: 'var(--accent, #FFD93B)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Arrow 2 (Mobile/Tablet) */}
          <div className="lg:hidden flex items-center justify-center">
            <div
              className="w-[46px] h-[46px] flex items-center justify-center rounded-full"
              style={{ background: 'var(--accent, #FFD93B)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="flex-1 flex flex-col items-center gap-4"
            style={{ background: 'var(--sub, #FAF8F4)' }}
          >
            <div className="relative w-full">
              <Image
                src="/lp/images/merchant-step-03.webp"
                alt="STEP.3 ご利用開始"
                width={348}
                height={217}
                className="w-full h-auto"
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-sm"
                style={{ background: 'var(--main, #2B7A78)' }}
              >
                <span className="text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sub, #FAF8F4)' }}>
                  STEP.3
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 pb-6">
              <h3 className="text-2xl font-bold leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                ご利用開始
              </h3>
              <p className="text-base font-medium leading-[160%] text-center" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
                販促キットが到着したことを確認したのち、ご利用を開始していただけます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Final CTA Section ===== */}
      <div
        className="flex flex-col justify-center items-center gap-10 px-5 lg:px-[120px] py-16"
        style={{ background: 'var(--accent, #FFD93B)' }}
      >
        <h2
          className="text-[26px] lg:text-[28px] font-bold leading-[120%] text-center"
          style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--main, #2B7A78)' }}
        >
          あなたのお店も<br className="lg:hidden" />
          &ldquo;nomoca&rdquo;に<br className="lg:hidden" />
          参加しませんか？
        </h2>

        {/* CTAボタン */}
        <Link
          href="/lp/merchant/apply"
          className="flex px-10 py-6 justify-center items-center gap-2 rounded-full relative"
          style={{ background: 'var(--main, #2B7A78)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}>
              いますぐ
            </span>
            <span className="text-xl font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--accent, #FFD93B)' }}>
              無料
            </span>
            <span className="text-xl font-bold" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: 'var(--sub, #FAF8F4)' }}>
              で申し込む
            </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="ml-2">
            <path d="M13.33 9.33L20 16L13.33 22.67" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* ===== Footer ===== */}
      <footer
        className="flex flex-col justify-center items-center gap-6 pt-14 pb-0"
        style={{ background: 'var(--sub, #FAF8F4)' }}
      >
        {/* Logo */}
        <Image
          src="/lp/images/logo-footer.svg"
          alt="nomoca"
          width={294}
          height={294}
          className="w-[200px] lg:w-[294px] h-auto"
        />

        {/* Footer Links */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-6 lg:gap-10">
          <Link href="/lp/faq" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            よくあるご質問
          </Link>
          <Link href="/lp/contact" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            お問い合わせ
          </Link>
          <a href="/プライバシーポリシー.pdf" target="_blank" rel="noopener noreferrer" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            プライバシーポリシー
          </a>
          <Link href="/lp/commercial-law" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            特定商取引法に基づく表記
          </Link>
          <a href="/terms-of-service.pdf" target="_blank" rel="noopener noreferrer" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            ご利用規約
          </a>
          <a href="https://tsunagu.co.jp" target="_blank" rel="noopener noreferrer" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            運営会社
          </a>
        </div>

        {/* Copyright */}
        <div
          className="flex justify-center items-center w-full py-10"
          style={{ borderTop: '1px solid #000' }}
        >
          <span className="text-base" style={{ fontFamily: 'Oswald, sans-serif', color: '#000' }}>
            ©2025 nomoca
          </span>
        </div>
      </footer>
    </div>
  )
}
