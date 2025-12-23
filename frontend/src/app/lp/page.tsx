/// <reference path="../../types/shims-next.d.ts" />
// @ts-nocheck
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// カルーセル用のプレースホルダー（実際の画像がある場合は置き換えてください）
const bannerImages = [
  null, // プレースホルダー1
  null, // プレースホルダー2
  null, // プレースホルダー3
];

export default function LPPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(bannerImages.length * 7)
  const [carouselImageWidth, setCarouselImageWidth] = useState(303)

  // 無限ループ用：画像を15回複製
  const extendedImages = [
    ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages,
    ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages,
    ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages, ...bannerImages,
  ]

  const handleScroll = (direction: 'left' | 'right') => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    const delta = direction === 'right' ? 1 : -1
    setCurrentSlide(prev => prev + delta)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setCurrentSlide((prev) => {
        if (prev >= bannerImages.length * 11) {
          return prev - bannerImages.length * 5
        }
        if (prev < bannerImages.length * 3) {
          return prev + bannerImages.length * 5
        }
        return prev
      })
    }, 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(bannerImages.length * 7 + index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // LPページ用：bodyの最大幅制限を解除
  useEffect(() => {
    document.body.style.maxWidth = '100vw'
    return () => {
      document.body.style.maxWidth = ''
    }
  }, [])

  // メディアクエリでカルーセル画像サイズを動的に変更
  useEffect(() => {
    const updateCarouselSize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setCarouselImageWidth(375)
      } else {
        setCarouselImageWidth(303)
      }
    }
    updateCarouselSize()
    window.addEventListener('resize', updateCarouselSize)
    return () => window.removeEventListener('resize', updateCarouselSize)
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
                  src="/lp/images/logo-nomoca.svg"
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
                  お店の方はこちら
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none" className="w-2 h-3 md:w-3 md:h-4">
                    <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

        {/* FV Main Content - Mobile */}
        <div className="md:hidden flex flex-col items-center justify-center px-8 pt-[100px] pb-6 gap-6">
          {/* 左コンテンツ - Mobile */}
          <div className="flex flex-col items-center gap-4">
            {/* 毎日 1店舗 1日 1杯無料 - Mobile用 */}
            <div className="relative flex items-center" style={{ width: '320px', height: '70px' }}>
              {/* 毎日 - 最前面 z-index: 40 */}
              <span
                className="absolute text-xl font-bold flex items-center"
                style={{ 
                  fontFamily: "'Noto Sans JP', sans-serif", 
                  color: '#000',
                  left: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 40
                }}
              >
                毎日
              </span>
              
              {/* 1店舗 - z-index: 30 */}
              <div className="absolute flex items-center" style={{ left: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 30 }}>
                <div
                  className="absolute w-[70px] h-[70px] rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', left: '-14px', top: '50%', transform: 'translateY(-50%)', zIndex: -1 }}
                />
                <span
                  className="relative text-[54px] font-bold"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', lineHeight: '1' }}
                >
                  1
                </span>
                <span
                  className="relative text-[24px] font-bold flex items-center"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', lineHeight: '1', height: '54px' }}
                >
                  店舗
                </span>
              </div>

              {/* 1日 - z-index: 20 */}
              <div className="absolute flex items-center" style={{ left: '125px', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
                <div
                  className="absolute w-[70px] h-[70px] rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', left: '-14px', top: '50%', transform: 'translateY(-50%)', zIndex: -1 }}
                />
                <span
                  className="relative text-[54px] font-bold"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', lineHeight: '1' }}
                >
                  1
                </span>
                <span
                  className="relative text-[24px] font-bold flex items-center"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', lineHeight: '1', height: '54px' }}
                >
                  日
                </span>
              </div>

              {/* 1杯無料 - z-index: 10 */}
              <div className="absolute flex items-center" style={{ left: '200px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                <div
                  className="absolute w-[70px] h-[70px] rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', left: '-14px', top: '50%', transform: 'translateY(-50%)', zIndex: -1 }}
                />
                <span
                  className="relative text-[54px] font-bold"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', lineHeight: '1' }}
                >
                  1
                </span>
                <span
                  className="relative text-[24px] font-bold flex items-center"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', lineHeight: '1', height: '54px' }}
                >
                  杯無料
                </span>
              </div>
            </div>

            {/* nomoca で - Mobile */}
            <div className="flex items-end justify-center gap-2 w-full">
              <Image
                src="/lp/images/logo-nomoca-text.png"
                alt="nomoca"
                width={292}
                height={40}
                className="h-[40px] w-auto"
              />
              <span
                className="text-2xl"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
              >
                で
              </span>
            </div>

            {/* サブテキスト - Mobile */}
            <p
              className="text-[21px] font-bold text-center"
              style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', lineHeight: '1' }}
            >
              ちょっとお得に、ちょっと楽しく
            </p>
          </div>

          {/* ビールとスマホ - Mobile (緑背景) */}
          <div 
            className="relative flex flex-col items-center w-[100vw] -mx-8 px-4 pt-4 pb-0 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--main, #2B7A78)',
              height: '486px'
            }}
          >
            {/* ビール画像 */}
            <div className="w-full flex-shrink-0 rounded-lg overflow-hidden" style={{ maxWidth: '358px', height: '224px' }}>
              <Image
                src="/lp/images/user-fv-beer-mobile.png"
                alt="乾杯"
                width={358}
                height={224}
                className="w-full h-full object-cover"
              />
            </div>
            {/* スマホ画像（ビール画像に重ねる） */}
            <div className="flex-shrink-0" style={{ marginTop: '-52px' }}>
              <Image
                src="/lp/images/user-fv-phone.png"
                alt="スマホ画面"
                width={206}
                height={418}
                className="w-[206px] h-auto"
              />
            </div>
          </div>

          {/* CTAボタン - Mobile */}
          <Link
            href="/register"
            className="flex items-center justify-between w-full py-4 px-6 rounded-full"
            style={{ backgroundColor: 'var(--accent, #FFD93B)' }}
          >
            <div className="flex-1" />
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
              >
                今すぐはじめる
              </span>
              <span
                className="text-[26px] font-bold"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
              >
                &ldquo;一杯無料&rdquo;
              </span>
            </div>
            <div className="flex-1 flex justify-end">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M16.67 11.67L25 20L16.67 28.33" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>

        {/* FV Main Content - Desktop */}
        <div className="hidden md:flex relative w-full flex-row items-center justify-center px-20 py-24 gap-20">
          {/* 左コンテンツ - Desktop */}
          <div className="flex flex-col items-center gap-6">
            {/* 1店舗 1日 1杯無料 テキスト - absoluteで重ねる */}
            <div className="flex flex-row items-center justify-center whitespace-nowrap">
              {/* 1店舗 */}
              <div className="relative flex items-center">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-6xl lg:text-7xl font-bold pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 店舗テキスト */}
                <span
                  className="relative text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  店舗
                </span>
              </div>

              {/* 1日 - absoluteで重ねる */}
              <div className="relative flex items-center -ml-2 lg:-ml-3">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-6xl lg:text-7xl font-bold pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 日テキスト */}
                <span
                  className="relative text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  日
                </span>
              </div>

              {/* 1杯無料 - absoluteで重ねる */}
              <div className="relative flex items-center ml-1 lg:ml-2">
                {/* 黄色い丸（背面） */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  style={{ backgroundColor: 'var(--accent, #FFD93B)', zIndex: 0 }}
                />
                {/* 1の数字 */}
                <span
                  className="relative text-6xl lg:text-7xl font-bold pl-4 lg:pl-5"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#000', zIndex: 1 }}
                >
                  1
                </span>
                {/* 杯無料テキスト */}
                <span
                  className="relative text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000', zIndex: 2 }}
                >
                  杯無料
                </span>
              </div>
            </div>

            {/* nomoca で - Desktop */}
            <div className="flex items-end gap-4">
              <Image
                src="/lp/images/logo-nomoca-text.png"
                alt="nomoca"
                width={410}
                height={57}
                className="w-[300px] h-auto"
              />
              <span
                className="text-4xl"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
              >
                で
              </span>
            </div>

            {/* サブテキスト - Desktop */}
            <p
              className="text-2xl font-bold text-center"
              style={{ fontFamily: "'Noto Sans JP', sans-serif", color: '#000' }}
            >
              もっと気軽に、楽しく街歩き！
            </p>
          </div>

          {/* イラストとスマホ - Desktop */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/lp/images/user-fv-illustration.svg"
              alt="街のイラスト"
              width={602}
              height={578}
              className="w-[400px] lg:w-[500px] h-auto"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[25%]">
              <Image
                src="/lp/images/user-fv-phone.png"
                alt="スマホ画面"
                width={204}
                height={413}
                className="w-32 lg:w-[180px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Banner Carousel Section */}
      <div className="w-full py-10 md:py-20" style={{ backgroundColor: 'var(--sub, #FAF8F4)' }}>
        <div 
          className="w-full px-4 md:px-8 lg:px-20"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            alignSelf: 'stretch'
          }}
        >
          {/* Carousel Container */}
          <div className="relative w-full max-w-6xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Banner Images Container */}
            <div className="relative overflow-hidden w-full max-w-[375px] h-[170px] md:max-w-[1157px] md:h-[210px]">
              <div 
                className="flex absolute left-1/2"
                style={{ 
                  gap: '16px',
                  transform: `translateX(calc(-50% - ${currentSlide * (carouselImageWidth + 16)}px))`,
                  transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                }}
              >
                {extendedImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 overflow-hidden w-[303px] h-[170px] md:w-[375px] md:h-[210px]"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      aspectRatio: '303/170',
                      borderRadius: '20px',
                      background: '#D9D9D9'
                    }}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={`banner-${i}`}
                        fill
                        className="object-cover"
                        priority={i < 2}
                      />
                    ) : (
                      <p style={{ color: '#999', fontSize: '16px', fontWeight: 400 }}>準備中</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Left Arrow */}
            <button 
              className="absolute z-10 hover:opacity-80 transition-opacity left-[12px] top-[69px] md:left-[70px] md:top-[89px] w-8 h-8 md:w-12 md:h-12"
              onClick={() => handleScroll('left')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                aspectRatio: '1/1',
                borderRadius: '9999px',
                background: 'var(--main, #2B7A78)',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right Arrow */}
            <button 
              className="absolute z-10 hover:opacity-80 transition-opacity right-[12px] top-[69px] md:right-[70px] md:top-[89px] w-8 h-8 md:w-12 md:h-12"
              onClick={() => handleScroll('right')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                aspectRatio: '1/1',
                borderRadius: '9999px',
                background: 'var(--main, #2B7A78)',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 md:space-x-3">
            {bannerImages.map((_, index) => {
              const actualIndex = ((currentSlide % bannerImages.length) + bannerImages.length) % bannerImages.length
              return (
                <button 
                  key={index} 
                  className="p-1 hover:opacity-80 transition-opacity"
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className="w-3 h-3 md:w-4 md:h-4"
                    style={{
                      borderRadius: '50%',
                      backgroundColor: actualIndex === index ? '#2B7A78' : '#D9D9D9',
                      transition: 'background-color 0.3s ease'
                    }}
                  />
                </button>
              )
            })}
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
          <div className="relative flex flex-col-reverse md:flex-row items-stretch justify-center">
            {/* テキストコンテンツ */}
            <div
              className="flex flex-col justify-center items-start gap-6 relative z-0 px-4 py-8 md:py-[150px] md:pr-[150px] md:pl-[120px]"
              style={{ 
                backgroundColor: 'rgba(43, 122, 120, 0.1)',
                maxWidth: '620px',
                minHeight: '480px'
              }}
            >
              <h3
                className="text-xl md:text-2xl font-bold"
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
                className="text-xs md:text-sm"
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: '#000',
                  fontWeight: '500',
                  lineHeight: '2'
                }}
              >
                「nomoca」は、毎日1軒につきドリンクが1杯無料になる新しい&ldquo;Welcomeドリンク&rdquo;サービスです。<br />
                お酒でもソフトドリンクでもOK。<br />
                気になるお店をみつけたら、仲間と乾杯したり、自分だけの寄り道を楽しんだり。<br />
                今日の一杯をきっかけに、街の楽しさがどんどん広がる。<br />
                あなたの「今日はどこで飲もう？」をもっと自由に、もっとおトクにします。
              </p>
            </div>

            {/* 画像 - テキスト背景に重なるように配置 */}
            <div className="flex-shrink-0 md:-ml-8 lg:-ml-12 relative z-10 self-center">
              <Image
                src="/lp/images/user-about.png"
                alt="nomocaを楽しむ人々"
                width={510}
                height={440}
                className="w-full md:w-[380px] lg:w-[480px] h-auto rounded-lg"
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
                  src="/lp/images/user-feature-01.png"
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
                  src="/lp/images/user-feature-02.png"
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
                  src="/lp/images/user-feature-03.png"
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
                  src="/lp/images/user-feature-04.png"
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-72 h-72 md:w-72 md:h-72 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/user-flow-01.png"
                      alt="お店を見つける"
                      width={350}
                      height={400}
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-72 h-72 md:w-72 md:h-72 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/user-flow-02.png"
                      alt="スマホを見せる"
                      width={350}
                      height={400}
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-full flex justify-center">
                  <div className="w-72 h-72 md:w-72 md:h-72 lg:w-72 lg:h-72  rounded-full overflow-hidden">
                    <Image
                      src="/lp/images/user-flow-03.png"
                      alt="ハシゴして楽しむ"
                      width={350}
                      height={400}
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
              backgroundImage: 'url(/lp/images/user-pricing-bg.png)',
              backgroundColor: '#FFF'
            }}
          >
            <div className="flex flex-col gap-6 md:gap-8 justify-center items-center">
              {/* 通常プラン */}
              <div
                className="flex flex-col items-center gap-4 p-6 md:p-8"
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
                className="flex flex-col md:flex-row items-center gap-4 p-6 md:p-8 relative overflow-visible"
                style={{ backgroundColor: 'var(--main, #2B7A78)' }}
              >
                {/* PC: 左にスマホ画像 */}
                <Image
                  src="/lp/images/user-pricing-phone.png"
                  alt="マイデジアプリ"
                  width={200}
                  height={236}
                  className="hidden md:block w-32 md:w-40 lg:w-[200px] h-auto -mt-8 -mb-16 md:-mb-20"
                />
                {/* 金額情報 */}
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <div
                    className="px-4 py-1 text-center"
                    style={{ backgroundColor: 'var(--accent, #FFD93B)', borderRadius: '9999px' }}
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
                {/* スマホ: 下にスマホ画像 */}
                <Image
                  src="/lp/images/user-pricing-phone.png"
                  alt="マイデジアプリ"
                  width={152}
                  height={179}
                  className="md:hidden w-[152px] h-auto mt-2"
                />
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
        {/* 背景画像 - スマホ */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/lp/images/user-stores-mobile-bg.png)'
          }}
        />
        {/* 背景画像 - PC */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: 'url(/lp/images/user-stores-bg.svg)'
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
            src="/lp/images/logo-footer.svg"
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
