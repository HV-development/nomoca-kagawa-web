'use client'

import Image from 'next/image'

export function TeaserPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景のグラデーションとパターン */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f4] via-[#f5f2eb] to-[#eae5d9]" />
      
      {/* 装飾的な円形グラデーション */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#2b7a78]/10 to-transparent blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#2b7a78]/8 to-transparent blur-3xl" />
      
      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* ロゴ */}
        <div 
          className="mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Image
            src="/logo.svg"
            alt="nomoca kagawa"
            width={280}
            height={280}
            priority
            className="drop-shadow-lg"
          />
        </div>
        
        {/* メッセージ */}
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <h1 className="text-2xl md:text-3xl font-medium text-[#2b7a78] mb-4 tracking-wide">
            公開までしばらくお待ちください。
          </h1>
          
          {/* 装飾的なライン */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#2b7a78]/40" />
            <div className="w-2 h-2 rounded-full bg-[#2b7a78]/30 animate-pulse-slow" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#2b7a78]/40" />
          </div>
        </div>
        
        {/* サブテキスト */}
        <p 
          className="mt-8 text-sm text-[#2b7a78]/60 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          Coming Soon
        </p>
      </div>
      
      {/* フッター */}
      <footer 
        className="absolute bottom-8 text-xs text-[#2b7a78]/40 opacity-0 animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        © {new Date().getFullYear()} nomoca kagawa
      </footer>
    </main>
  )
}

