"use client"

import Image from "next/image"
import Link from "next/link"

/**
 * nomoca_top - ランディングページのトップセクション
 * Figmaデザイン (node-id: 21:22) に基づいて実装
 */
export function NomocaTop() {
  return (
    <div className="w-full bg-[#FAF8F4]">
      {/* FV Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-[#FAF8F4]"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20 py-24">
          <div className="flex flex-col md:flex-row items-center justify-center gap-20">
            {/* Left Content */}
            <div className="flex flex-col items-center gap-6 w-full md:w-auto">
              {/* Badge Group */}
              <div className="flex items-center gap-[-18px]">
                {/* Badge 1 */}
                <div className="flex items-center gap-[-18px]">
                  <div className="w-24 h-24 rounded-full bg-[#FFD93B] flex items-center justify-center">
                    <span className="text-[84px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>1</span>
                  </div>
                  <span className="text-[40px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>杯無料</span>
                </div>
                
                {/* Badge 2 */}
                <div className="flex items-center gap-[-18px]">
                  <div className="w-24 h-24 rounded-full bg-[#FFD93B] flex items-center justify-center">
                    <span className="text-[84px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>1</span>
                  </div>
                  <span className="text-[40px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>店舗</span>
                </div>
              </div>
              
              {/* Logo/Text */}
              <div className="flex items-end gap-6">
                <div className="w-[410px] h-[56.58px] relative">
                  {/* SVG logo placeholder - 実際のロゴ画像に置き換え */}
                  <div className="w-full h-full bg-transparent"></div>
                </div>
                <span className="text-[42px] font-normal leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>で</span>
              </div>
              
              {/* Main Text */}
              <h1 className="text-[24px] font-bold leading-none text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                もっと気軽に、楽しく街歩き！
              </h1>
            </div>
            
            {/* Right Image */}
            <div className="w-[478px] h-[578px] relative hidden md:block">
              <Image
                src="/lp/nomoca-top/fv-image-55deea.png"
                alt="nomoca"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Phone Image */}
            <div className="absolute right-[1076px] top-[396px] w-[204px] h-[413px] relative hidden lg:block">
              <Image
                src="/lp/nomoca-top/fv-phone.png"
                alt="スマホ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Header */}
        <header className="absolute top-0 left-0 w-full px-6 py-2 z-50">
          <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
            {/* Logo */}
            <div className="w-[244px] h-[92px] relative">
              {/* SVG logo placeholder */}
              <div className="w-full h-full bg-transparent"></div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-11">
              <Link href="#about" className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                nomocaとは
              </Link>
              <Link href="#features" className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                魅力
              </Link>
              <Link href="#flow" className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                使い方
              </Link>
              <Link href="#pricing" className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                利用料金
              </Link>
              <Link href="#stores" className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                加盟店一覧
              </Link>
            </nav>
            
            {/* CTA Button */}
            <button className="flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#2B7A78]">
              <span className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>お店の方はこちら</span>
              <div className="w-8 h-8 relative">
                {/* Arrow icon placeholder */}
                <div className="w-full h-full bg-white"></div>
              </div>
            </button>
          </div>
        </header>
      </section>
      
      {/* News Section */}
      <section className="w-full py-10 md:py-20">
        <div className="flex flex-col items-center justify-center gap-6 px-8 md:px-30">
          {/* News content placeholder */}
          <div className="w-full max-w-[375px] md:max-w-[1157px] h-[170px] md:h-[210px] bg-gray-200 rounded-[20px]"></div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="w-full py-30 md:py-[120px] px-[130px]">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex items-end gap-10 pb-6 border-b border-black">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">ABOUT</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">nomocaとは？</h3>
          </div>
          
          {/* Content */}
          <div className="flex gap-16">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center gap-6 p-[120px_120px_120px_120px] bg-[rgba(43,122,120,0.1)]">
              <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black">
                nomocaを片手に、<br />
                気になるお店をハシゴしよう。
              </h4>
              <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-black">
                「nomoca」は、毎日1軒につきドリンクが1杯無料になる新しい"Welcomeドリンク"サービスです。<br />
                お酒でもソフトドリンクでもOK。<br />
                気になるお店をみつけたら、仲間と乾杯したり、自分だけの寄り道を楽しんだり。<br />
                今日の一杯をきっかけに、街の楽しさがどんどん広がる。<br />
                あなたの「今日はどこで飲もう？」をもっと自由に、もっとおトクにします。
              </p>
            </div>
            
            {/* Right Image */}
            <div className="w-[510px] h-[440px] relative">
              <Image
                src="/lp/nomoca-top/about-image-3e61e3.png"
                alt="nomocaについて"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="w-full py-30 md:py-[120px] px-[130px] bg-[#2B7A78]">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex items-end gap-10 pb-6 border-b border-[#FFD93B]">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-[#FFD93B]">FEATURES</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-[#FFD93B]">nomocaの魅力</h3>
          </div>
          
          {/* Features Grid */}
          <div className="flex flex-wrap gap-16">
            {/* Feature 1 */}
            <div className="flex-1 min-w-[558px] flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="w-full h-[400px] relative">
                <Image
                  src="/lp/nomoca-top/feature-01-3253cb.png"
                  alt="1店舗につき1杯無料！"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-[#FAF8F4]">
                  1店舗につき1杯無料！
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-[#FAF8F4]">
                  お酒でもソフトドリンクでもOK。<br />
                  「nomoca（ノモカ）」の加盟店なら、ドリンク1杯が無料に。<br />
                  ちょっと気になっていたお店に入ってみたり、気軽に一息ついたり。<br />
                  お財布にやさしく、気軽に乾杯を楽しめます。
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex-1 min-w-[558px] flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="w-full h-[400px] relative">
                <Image
                  src="/lp/nomoca-top/feature-02-1b31a8.png"
                  alt="1日で複数店舗をハシゴできる！"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-[#FAF8F4]">
                  1日で複数店舗をハシゴできる！
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-[#FAF8F4]">
                  1店舗ごとに1杯無料だから、1日で何軒もまわれるのが「nomoca」の魅力。<br />
                  今日は仲間とカジュアルに、明日はしっとり一人飲み。<br />
                  その日の気分に合わせて、自由にドリンクめぐり！
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex-1 min-w-[558px] flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="w-full h-[400px] relative">
                <Image
                  src="/lp/nomoca-top/feature-03-7743d9.png"
                  alt="お酒が苦手でも楽しめる！"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-[#FAF8F4]">
                  お酒が苦手でも楽しめる！
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-[#FAF8F4]">
                  「nomoca」は"飲める人だけ"のサービスではありません。<br />
                  ソフトドリンクも対象だから、ノンアル派や飲めない人でも安心。<br />
                  友達との軽い寄り道にも、一人時間のリフレッシュにも使えて、<br />
                  誰でも気軽に"乾杯"をシェアできます。
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="flex-1 min-w-[558px] flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="w-full h-[400px] relative">
                <Image
                  src="/lp/nomoca-top/feature-04-131579.png"
                  alt="新しいお店との出会い！"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-[#FAF8F4]">
                  新しいお店との出会い！
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-[#FAF8F4]">
                  普段行かないお店でも、1杯無料なら試しやすい。<br />
                  地元で愛される居酒屋から、雰囲気のいいカフェバーまで。<br />
                  nomocaがあれば、お店との新しい出会いを見つかるかも。<br />
                  街歩きしながら、思いがけない発見を楽しもう！
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Flow Section */}
      <section id="flow" className="w-full py-30 md:py-[120px] px-[130px]">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex items-end gap-10 pb-6 border-b border-black">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">FLOW</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">nomocaの使い方</h3>
          </div>
          
          {/* Steps */}
          <div className="flex gap-16">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-[350px] h-[350px] rounded-full relative">
                  <Image
                    src="/lp/nomoca-top/flow-01-65ced6.png"
                    alt="お店を見つける"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] -mt-14">
                  <span className="text-base font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">STEP</span>
                  <span className="text-[40px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">1</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black">
                  お店を見つける
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-black">
                  今いる場所の近くや、行ってみたいお店をマップやリストからチェック。
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-[350px] h-[350px] rounded-full relative">
                  <Image
                    src="/lp/nomoca-top/flow-02-9e692c.png"
                    alt="スマホを見せる"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] -mt-14">
                  <span className="text-base font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">STEP</span>
                  <span className="text-[40px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">2</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black">
                  スマホを見せる
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-black">
                  お店でnomocaのクーポン画面を見せるだけ。<br />
                  対象ドリンクが"その場で1杯無料"に！
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
              <div className="flex flex-col items-center gap-[-56px]">
                <div className="w-[350px] h-[350px] rounded-full relative">
                  <Image
                    src="/lp/nomoca-top/flow-03-1f8a8c.png"
                    alt="ハシゴして楽しむ"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] -mt-14">
                  <span className="text-base font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">STEP</span>
                  <span className="text-[40px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">3</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h4 className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black">
                  ハシゴして楽しむ
                </h4>
                <p className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.8] text-black">
                  お店を変えれば、同じ日にまた1杯無料。<br />
                  あなたの"ちょい飲み"がもっと自由に。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="w-full py-0 md:py-0 px-[130px] pb-[120px]">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex items-end gap-10 pb-6 border-b border-black">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">PRICING</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">利用料金</h3>
          </div>
          
          {/* Subtitle */}
          <div className="flex justify-center">
            <p className="text-[26px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">
              1日あたり約30円でちょい飲み体験！
            </p>
          </div>
          
          {/* Pricing Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[1180px] flex flex-col items-center gap-6 py-14 px-0 bg-white rounded-lg" style={{
              backgroundImage: "url('/lp/nomoca-top/pricing-bg-4186b0.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat"
            }}>
              {/* Top Section */}
              <div className="flex flex-col items-center gap-2 py-6 bg-[#FAF8F4] w-[580px]">
                <div className="flex items-center gap-4 px-8 py-2 rounded-full bg-[#FFD93B]">
                  <span className="text-[24px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">１日1軒1杯無料</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-[#FFD93B]">
                    <span className="text-[20px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">月額</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-[100px] font-semibold style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black tracking-[-0.06em]">980</span>
                    <div className="flex items-center gap-2.5 pb-1">
                      <span className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">円（税込）</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Section */}
              <div className="relative flex items-center gap-4 w-[580px] h-[160px] pl-6 bg-[#2B7A78]">
                <div className="w-[152px] h-[179px] absolute left-0 bottom-0 relative">
                  <Image
                    src="/lp/nomoca-top/pricing-phone.png"
                    alt="スマホ"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 ml-40">
                  <div className="flex items-center justify-center gap-2.5 py-1.5 px-0 rounded-full bg-[#FFD93B]">
                    <span className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">マイデジ会員なら</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-black">
                      <span className="text-[20px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-white">月額</span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-[108px] font-bold style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">480</span>
                      <div className="flex items-center gap-2.5 pb-1">
                        <span className="text-[20px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.2] text-black">
                          円で<br />
                          利用可能！
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="flex justify-center gap-2.5">
            <p className="text-[15px] font-normal style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black">
              ※対象ドリンクは店舗により異なります。<br />
              ※同一店舗での無料適用は1日お一人さま1杯までです。
            </p>
          </div>
        </div>
      </section>
      
      {/* Stores Section */}
      <section id="stores" className="w-full py-30 md:py-[120px] px-[120px]">
        <div className="flex flex-col items-center gap-[45px]">
          {/* Background Image placeholder */}
          <div className="absolute inset-0 w-full h-[493px] relative">
            {/* Background image placeholder */}
          </div>
          
          {/* Section Header */}
          <div className="relative z-10 flex items-end gap-10 pb-6 border-b border-[#FAF8F4]">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-[#FAF8F4]">STORES</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-[#FAF8F4]">加盟店</h3>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-30">
            <p className="text-[25px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-[#FAF8F4] text-center">
              加盟店、ぞくぞく拡大中！
            </p>
            <button className="flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#FFD93B]">
              <span className="text-[18px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">店舗一覧はこちら</span>
              <div className="w-8 h-8 relative">
                {/* Arrow icon placeholder */}
                <div className="w-full h-full bg-white"></div>
              </div>
            </button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="w-full py-30 md:py-[120px] px-[130px]">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex items-end gap-10 pb-6 border-b border-black">
            <h2 className="text-[56px] font-medium style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">FAQ</h2>
            <h3 className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">よくあるご質問</h3>
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-[22px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-[1.6] text-black text-center">
              お問い合わせの多い質問をまとめました。<br />
              お問い合わせの前に、ご確認ください。
            </p>
            <button className="flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#2B7A78]">
              <span className="text-[18px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-[#FAF8F4]">よくあるご質問はこちら</span>
              <div className="w-8 h-8 relative">
                {/* Arrow icon placeholder */}
                <div className="w-full h-full bg-white"></div>
              </div>
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 md:py-[64px] px-[120px] bg-[#FFD93B]">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-[36px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-black">掲載店募集中！</h2>
          <button className="flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#2B7A78]">
            <span className="text-[18px] font-bold style={{ fontFamily: 'var(--font-noto-sans-jp)' }} leading-none text-[#FAF8F4]">お店の方はこちら</span>
            <div className="w-8 h-8 relative">
              {/* Arrow icon placeholder */}
              <div className="w-full h-full bg-white"></div>
            </div>
          </button>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="w-full py-14">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="w-[294px] h-[294px] relative">
            {/* SVG logo placeholder */}
            <div className="w-full h-full bg-transparent"></div>
          </div>
          
          {/* Links */}
          <nav className="flex gap-10">
            <Link href="#faq" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              よくあるご質問
            </Link>
            <Link href="#contact" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              お問い合わせ
            </Link>
            <Link href="#privacy" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              プライバシーポリシー
            </Link>
            <Link href="#commercial" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              特定商取引法に基づく表記
            </Link>
            <Link href="#terms" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              ご利用規約
            </Link>
            <Link href="#company" className="text-base font-medium style={{ fontFamily: 'var(--font-noto-sans-jp)' }} text-black">
              運営会社
            </Link>
          </nav>
          
          {/* Copyright */}
          <div className="flex items-center justify-center gap-10 py-10 border-t border-black w-full">
            <p className="text-base font-normal style={{ fontFamily: 'var(--font-oswald)' }} leading-none text-black">©2025 nomoca Kagawa</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

