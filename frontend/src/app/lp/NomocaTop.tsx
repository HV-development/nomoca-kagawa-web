"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface FAQItem {
    question: string
    answer?: string
}

interface FAQSection {
    title: string
    items: FAQItem[]
    isContact?: boolean
    isRules?: boolean
}

const faqData: FAQSection[] = [
    {
        title: 'サービス全体について',
        items: [
            {
                question: 'nomocaって何？',
            },
            {
                question: '料金は？',
                answer: '月額 一般価格：980円、マイデジ会員価格：480円。今後は、6か月・12か月分をまとめて購入できるパッケージや観光客向けのショートプラン（３Days）などを販売する予定です。',
            },
            {
                question: '目的は？',
            },
            {
                question: 'だれが運営？出資・連携は？',
            },
        ],
    },
    {
        title: 'ユーザー向け',
        items: [
            {
                question: '利用する際のルールは？',
            },
            {
                question: 'どんなドリンクが無料対象？',
            },
            {
                question: '年齢制限は？',
            },
            {
                question: '同伴者の分も無料になりますか？',
            },
            {
                question: '使い方の流れは？',
            },
            {
                question: '支払い方法は？',
            },
            {
                question: '解約はどうする？更新日は？',
            },
            {
                question: '機種変更・紛失時の引き継ぎは？',
            },
            {
                question: '市外・県外からの来訪者も使える？',
            },
            {
                question: '店舗側の理由でサービスが利用できない場合は？',
            },
        ],
    },
    {
        title: '掲載店向け',
        items: [
            {
                question: '掲載費は？',
            },
            {
                question: '店舗のオペレーションは？',
            },
            {
                question: 'POSやレシート表記は？',
            },
            {
                question: 'メニュー・画像・営業時間の更新は？',
            },
            {
                question: '休業・満席・提供一時停止の扱いは？',
            },
            {
                question: '未成年・本人確認は？',
            },
            {
                question: '掲載停止・退会は？',
            },
        ],
    },
    {
        title: '行政・パートナー向け（概要）',
        items: [
            {
                question: '社会的な狙いと評価指標は？',
            },
            {
                question: 'エコシステム連携は？',
            },
        ],
    },
    {
        title: 'セキュリティ・プライバシー',
        items: [
            {
                question: '個人情報の取り扱いは？',
            },
            {
                question: '不正利用対策は？',
            },
            {
                question: '位置情報は必須？',
            },
        ],
    },
    {
        title: 'トラブルシューティング',
        items: [
            {
                question: '「無料1杯」が反映されない/押下できない',
            },
            {
                question: '課金・請求金額がおかしい',
            },
            {
                question: '店舗が混雑・売切れで提供不可だった',
            },
            {
                question: 'アカウントにログインできない',
            },
        ],
    },
    {
        title: 'ルール・マナー（重要）',
        items: [
            {
                question: 'アルコール類の提供の場合、20歳未満の飲酒禁止／飲酒運転禁止\n迷惑行為（長時間の占有、大声、他客・スタッフへの迷惑）は利用停止対象\nたまのみサイト画面の不正転用・転売・貸与は禁止\n健康状態に留意し、節度ある飲酒を',
            },
        ],
        isRules: true,
    },
    {
        title: '連絡先',
        items: [
            {
                question: 'ユーザーサポート',
                answer: 'サイト内「ヘルプ・お問い合わせ」',
            },
            {
                question: '掲載店サポート',
                answer: '運営窓口、営業担当へ',
            },
            {
                question: '取材・協業',
                answer: '運営窓口まで',
            },
        ],
        isContact: true,
    },
]

/**
 * nomoca_top - ランディングページのトップセクション
 * Figmaデザイン (node-id: 21:22) に基づいて実装
 */
export function NomocaTop() {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

    const toggleItem = (sectionIndex: number, itemIndex: number) => {
        const key = `${sectionIndex}-${itemIndex}`
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    return (
        <div className="w-full bg-[#FAF8F4]">
            {/* FV Section */}
            <section className="relative w-full min-h-screen flex items-center justify-center">
                {/* Background */}
                <div className="absolute inset-0 bg-[#FAF8F4]"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20 py-24">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                        {/* Left Content */}
                        <div className="flex flex-col items-center gap-6 w-full md:w-auto">
                            {/* Badge Group - 負のgapを修正 */}
                            <div className="flex items-center -space-x-2 md:-space-x-4">
                                {/* Badge 1 */}
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#FFD93B] flex items-center justify-center z-10">
                                        <span className="text-[56px] md:text-[84px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>1</span>
                                    </div>
                                    <span className="text-[28px] md:text-[40px] font-bold leading-none text-black z-10" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>杯無料</span>
                                </div>

                                {/* Badge 2 */}
                                <div className="flex items-center -space-x-2 md:-space-x-4">
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#FFD93B] flex items-center justify-center z-10">
                                        <span className="text-[56px] md:text-[84px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>1</span>
                                    </div>
                                    <span className="text-[28px] md:text-[40px] font-bold leading-none text-black z-10" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>店舗</span>
                                </div>
                            </div>

                            {/* Logo/Text - レスポンシブ対応 */}
                            <div className="flex items-end gap-4 md:gap-6">
                                <div className="w-[280px] h-auto md:w-[410px] md:h-[56.58px] relative">
                                    {/* SVG logo placeholder - 実際のロゴ画像に置き換え */}
                                    <div className="w-full h-full bg-transparent"></div>
                                </div>
                                <span className="text-[32px] md:text-[42px] font-normal leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>で</span>
                            </div>

                            {/* Main Text */}
                            <h1 className="text-[20px] md:text-[24px] font-bold leading-none text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                もっと気軽に、楽しく街歩き！
                            </h1>
                        </div>

                        {/* Right Image */}
                        <div className="w-full md:w-[478px] h-auto md:h-[578px] relative hidden md:block">
                            <Image
                                src="/lp/nomoca-top/fv-image-55deea.png"
                                alt="nomoca"
                                width={478}
                                height={578}
                                className="object-cover"
                            />
                        </div>

                        {/* Phone Image - レスポンシブ対応を改善 */}
                        <div className="absolute right-0 md:right-[calc(50%-478px-1076px)] top-[396px] w-[120px] h-[242px] md:w-[204px] md:h-[413px] relative hidden xl:block">
                            <Image
                                src="/lp/nomoca-top/fv-phone.png"
                                alt="スマホ"
                                width={204}
                                height={413}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Header - レスポンシブ対応を改善 */}
                <header className="absolute top-0 left-0 w-full px-4 md:px-6 py-2 z-50">
                    <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
                        {/* Logo - レスポンシブ対応 */}
                        <div className="w-[160px] h-[60px] md:w-[244px] md:h-[92px] relative">
                            {/* SVG logo placeholder */}
                            <div className="w-full h-full bg-transparent"></div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
                            <Link href="#about" className="text-sm xl:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                nomocaとは
                            </Link>
                            <Link href="#features" className="text-sm xl:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                魅力
                            </Link>
                            <Link href="#flow" className="text-sm xl:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                使い方
                            </Link>
                            <Link href="#pricing" className="text-sm xl:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                利用料金
                            </Link>
                            <Link href="#stores" className="text-sm xl:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                加盟店一覧
                            </Link>
                        </nav>

                        {/* CTA Button - レスポンシブ対応 */}
                        <button className="hidden md:flex items-center gap-2 md:gap-2.5 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-[#2B7A78] hover:opacity-90 transition-opacity">
                            <span className="text-xs md:text-base font-bold text-white" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>お店の方はこちら</span>
                            <div className="w-6 h-6 md:w-8 md:h-8 relative">
                                {/* Arrow icon placeholder */}
                                <div className="w-full h-full bg-white"></div>
                            </div>
                        </button>

                        {/* モバイルメニューボタン */}
                        <button className="md:hidden flex flex-col gap-1.5 p-2">
                            <div className="w-6 h-0.5 bg-black"></div>
                            <div className="w-6 h-0.5 bg-black"></div>
                            <div className="w-6 h-0.5 bg-black"></div>
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

            {/* About Section - レスポンシブ対応を改善 */}
            <section id="about" className="w-full py-16 md:py-30 lg:py-[120px] px-4 md:px-8 lg:px-[130px]">
                <div className="flex flex-col gap-10">
                    {/* Section Header */}
                    <div className="flex items-end gap-10 pb-6 border-b border-black">
                        <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>ABOUT</h2>
                        <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>nomocaとは？</h3>
                    </div>

                    {/* Content - レスポンシブ対応 */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        {/* Left Content */}
                        <div className="flex-1 flex flex-col justify-center gap-6 p-8 md:p-[120px] bg-[rgba(43,122,120,0.1)]">
                            <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                nomocaを片手に、<br />
                                気になるお店をハシゴしよう。
                            </h4>
                            <p className="text-sm md:text-base font-medium leading-[1.8] text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                「nomoca」は、毎日1軒につきドリンクが1杯無料になる新しい"Welcomeドリンク"サービスです。<br />
                                お酒でもソフトドリンクでもOK。<br />
                                気になるお店をみつけたら、仲間と乾杯したり、自分だけの寄り道を楽しんだり。<br />
                                今日の一杯をきっかけに、街の楽しさがどんどん広がる。<br />
                                あなたの「今日はどこで飲もう？」をもっと自由に、もっとおトクにします。
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-[510px] h-auto lg:h-[440px] relative">
                            <Image
                                src="/lp/nomoca-top/about-image-3e61e3.png"
                                alt="nomocaについて"
                                width={510}
                                height={440}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - レスポンシブ対応を改善 */}
            <section id="features" className="w-full py-16 md:py-30 lg:py-[120px] px-4 md:px-8 lg:px-[130px] bg-[#2B7A78]">
                <div className="flex flex-col gap-10">
                    {/* Section Header */}
                    <div className="flex items-end gap-10 pb-6 border-b border-[#FFD93B]">
                        <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-[#FFD93B]" style={{ fontFamily: 'var(--font-oswald)' }}>FEATURES</h2>
                        <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-[#FFD93B]" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>nomocaの魅力</h3>
                    </div>

                    {/* Features Grid - レスポンシブ対応 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {/* Feature 1 */}
                        <div className="flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="w-full h-[300px] md:h-[400px] relative">
                                <Image
                                    src="/lp/nomoca-top/feature-01-3253cb.png"
                                    alt="1店舗につき1杯無料！"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    1店舗につき1杯無料！
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    お酒でもソフトドリンクでもOK。<br />
                                    「nomoca（ノモカ）」の加盟店なら、ドリンク1杯が無料に。<br />
                                    ちょっと気になっていたお店に入ってみたり、気軽に一息ついたり。<br />
                                    お財布にやさしく、気軽に乾杯を楽しめます。
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="w-full h-[300px] md:h-[400px] relative">
                                <Image
                                    src="/lp/nomoca-top/feature-02-1b31a8.png"
                                    alt="1日で複数店舗をハシゴできる！"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    1日で複数店舗をハシゴできる！
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    1店舗ごとに1杯無料だから、1日で何軒もまわれるのが「nomoca」の魅力。<br />
                                    今日は仲間とカジュアルに、明日はしっとり一人飲み。<br />
                                    その日の気分に合わせて、自由にドリンクめぐり！
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="w-full h-[300px] md:h-[400px] relative">
                                <Image
                                    src="/lp/nomoca-top/feature-03-7743d9.png"
                                    alt="お酒が苦手でも楽しめる！"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    お酒が苦手でも楽しめる！
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    「nomoca」は"飲める人だけ"のサービスではありません。<br />
                                    ソフトドリンクも対象だから、ノンアル派や飲めない人でも安心。<br />
                                    友達との軽い寄り道にも、一人時間のリフレッシュにも使えて、<br />
                                    誰でも気軽に"乾杯"をシェアできます。
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="w-full h-[300px] md:h-[400px] relative">
                                <Image
                                    src="/lp/nomoca-top/feature-04-131579.png"
                                    alt="新しいお店との出会い！"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    新しいお店との出会い！
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
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

            {/* Flow Section - レスポンシブ対応を改善 */}
            <section id="flow" className="w-full py-16 md:py-30 lg:py-[120px] px-4 md:px-8 lg:px-[130px]">
                <div className="flex flex-col gap-10">
                    {/* Section Header */}
                    <div className="flex items-end gap-10 pb-6 border-b border-black">
                        <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>FLOW</h2>
                        <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>nomocaの使い方</h3>
                    </div>

                    {/* Steps - レスポンシブ対応 */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        {/* Step 1 */}
                        <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="flex flex-col items-center -space-y-14">
                                <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full relative">
                                    <Image
                                        src="/lp/nomoca-top/flow-01-65ced6.png"
                                        alt="お店を見つける"
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] z-10">
                                    <span className="text-base font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>STEP</span>
                                    <span className="text-[40px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>1</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    お店を見つける
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    今いる場所の近くや、行ってみたいお店をマップやリストからチェック。
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="flex flex-col items-center -space-y-14">
                                <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full relative">
                                    <Image
                                        src="/lp/nomoca-top/flow-02-9e692c.png"
                                        alt="スマホを見せる"
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] z-10">
                                    <span className="text-base font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>STEP</span>
                                    <span className="text-[40px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>2</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    スマホを見せる
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    お店でnomocaのクーポン画面を見せるだけ。<br />
                                    対象ドリンクが"その場で1杯無料"に！
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex-1 flex flex-col gap-6 bg-[rgba(43,122,120,0.1)]">
                            <div className="flex flex-col items-center -space-y-14">
                                <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full relative">
                                    <Image
                                        src="/lp/nomoca-top/flow-03-1f8a8c.png"
                                        alt="ハシゴして楽しむ"
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-2 p-6 rounded-full bg-[#FFD93B] z-10">
                                    <span className="text-base font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>STEP</span>
                                    <span className="text-[40px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>3</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <h4 className="text-[20px] md:text-[24px] font-bold leading-[1.6] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    ハシゴして楽しむ
                                </h4>
                                <p className="text-sm md:text-base font-medium leading-[1.8] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                    お店を変えれば、同じ日にまた1杯無料。<br />
                                    あなたの"ちょい飲み"がもっと自由に。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - レスポンシブ対応を改善 */}
            <section id="pricing" className="w-full py-16 md:py-0 lg:pb-[120px] px-4 md:px-8 lg:px-[130px]">
                <div className="flex flex-col gap-10">
                    {/* Section Header */}
                    <div className="flex items-end gap-10 pb-6 border-b border-black">
                        <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>PRICING</h2>
                        <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>利用料金</h3>
                    </div>

                    {/* Subtitle */}
                    <div className="flex justify-center">
                        <p className="text-[20px] md:text-[26px] font-bold leading-none text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            1日あたり約30円でちょい飲み体験！
                        </p>
                    </div>

                    {/* Pricing Card - レスポンシブ対応 */}
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-[1180px] flex flex-col items-center gap-6 py-8 md:py-14 px-4 md:px-0 bg-white rounded-lg" style={{
                            backgroundImage: "url('/lp/nomoca-top/pricing-bg-4186b0.png')",
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat"
                        }}>
                            {/* Top Section */}
                            <div className="flex flex-col items-center gap-2 py-6 bg-[#FAF8F4] w-full md:w-[580px]">
                                <div className="flex items-center gap-4 px-6 md:px-8 py-2 rounded-full bg-[#FFD93B]">
                                    <span className="text-[18px] md:text-[24px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>１日1軒1杯無料</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-12 h-12 md:w-[68px] md:h-[68px] rounded-full bg-[#FFD93B]">
                                        <span className="text-[16px] md:text-[20px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>月額</span>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-[60px] md:text-[100px] font-semibold leading-none text-black tracking-[-0.06em]" style={{ fontFamily: 'var(--font-oswald)' }}>980</span>
                                        <div className="flex items-center gap-2.5 pb-1">
                                            <span className="text-[16px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>円（税込）</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section - レスポンシブ対応 */}
                            <div className="relative flex items-center gap-4 w-full md:w-[580px] h-auto md:h-[160px] pl-6 pr-4 md:pr-6 py-4 md:py-0 bg-[#2B7A78]">
                                <div className="w-[120px] h-[141px] md:w-[152px] md:h-[179px] absolute left-0 bottom-0 relative flex-shrink-0">
                                    <Image
                                        src="/lp/nomoca-top/pricing-phone.png"
                                        alt="スマホ"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 ml-32 md:ml-40">
                                    <div className="flex items-center justify-center gap-2.5 py-1.5 px-0 rounded-full bg-[#FFD93B]">
                                        <span className="text-[16px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>マイデジ会員なら</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center justify-center w-12 h-12 md:w-[68px] md:h-[68px] rounded-full bg-black">
                                            <span className="text-[16px] md:text-[20px] font-bold leading-none text-white" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>月額</span>
                                        </div>
                                        <div className="flex items-end gap-1">
                                            <span className="text-[64px] md:text-[108px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>480</span>
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="text-[16px] md:text-[20px] font-bold leading-[1.2] text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
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
                        <p className="text-[13px] md:text-[15px] font-normal leading-[1.6] text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            ※対象ドリンクは店舗により異なります。<br />
                            ※同一店舗での無料適用は1日お一人さま1杯までです。
                        </p>
                    </div>
                </div>
            </section>

            {/* Stores Section - レスポンシブ対応を改善 */}
            <section id="stores" className="w-full py-16 md:py-30 lg:py-[120px] px-4 md:px-8 lg:px-[120px]">
                <div className="flex flex-col items-center gap-[30px] md:gap-[45px]">
                    {/* Background Image placeholder */}
                    <div className="absolute inset-0 w-full h-[300px] md:h-[493px] relative">
                        {/* Background image placeholder */}
                    </div>

                    {/* Section Header */}
                    <div className="relative z-10 flex items-end gap-10 pb-6 border-b border-[#FAF8F4]">
                        <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-[#FAF8F4]" style={{ fontFamily: 'var(--font-oswald)' }}>STORES</h2>
                        <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-[#FAF8F4]" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>加盟店</h3>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-6 px-4 md:px-30">
                        <p className="text-[20px] md:text-[25px] font-bold leading-[1.6] text-[#FAF8F4] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            加盟店、ぞくぞく拡大中！
                        </p>
                        <button className="flex items-center gap-2.5 px-8 md:px-10 py-3 md:py-4 rounded-full bg-[#FFD93B] hover:opacity-90 transition-opacity">
                            <span className="text-[16px] md:text-[18px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>店舗一覧はこちら</span>
                            <div className="w-6 h-6 md:w-8 md:h-8 relative">
                                {/* Arrow icon placeholder */}
                                <div className="w-full h-full bg-white"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Figmaデザイン (node-id: 21-224) に基づいて実装 */}
            <section id="faq" className="w-full bg-[#FAF8F4]">
                <div className="w-full max-w-[1440px] mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8 pt-[200px] md:pt-[200px] pb-10">
                        <div className="flex flex-col items-center gap-6 pb-6">
                            <h2 className="text-[40px] md:text-[56px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>FAQ</h2>
                            <h3 className="text-[18px] md:text-[22px] font-bold leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>よくあるご質問</h3>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="flex flex-col items-center gap-[45px] px-4 md:px-[120px] py-10 md:py-[80px]">
                        {faqData.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="flex flex-col w-full" style={{ maxWidth: '940px' }}>
                                {/* Section Title */}
                                <div className="flex items-center py-8" style={{ gap: '16px' }}>
                                    <div className="w-[5px] bg-[#2B7A78] flex-shrink-0 self-stretch"></div>
                                    <h4 className="text-[18px] md:text-[20px] font-medium leading-none text-black" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                                        {section.title}
                                    </h4>
                                </div>

                                {/* FAQ Items */}
                                <div className="flex flex-col">
                                    {section.isContact ? (
                                        // 連絡先セクションの特別なレイアウト
                                        <div className="flex flex-col py-8" style={{ gap: '16px', borderBottom: '1px solid #D5D5D5' }}>
                                            {section.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-start" style={{ gap: '8px' }}>
                                                    <div className="flex-shrink-0" style={{ width: '150px' }}>
                                                        <p
                                                            className="text-[16px] font-bold leading-[1.6] text-black"
                                                            style={{ fontFamily: 'var(--font-noto-sans-jp)', textAlign: 'justify' }}
                                                        >
                                                            {item.question}
                                                        </p>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p
                                                            className="text-[16px] font-normal leading-[1.6] text-black"
                                                            style={{ fontFamily: 'var(--font-noto-sans-jp)', textAlign: 'justify' }}
                                                        >
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : section.isRules ? (
                                        // ルール・マナーセクションの特別なレイアウト
                                        <div className="py-8" style={{ borderBottom: '1px solid #D5D5D5' }}>
                                            <p
                                                className="text-[16px] font-normal leading-[1.6] text-black whitespace-pre-line"
                                                style={{ fontFamily: 'var(--font-noto-sans-jp)', textAlign: 'justify' }}
                                            >
                                                {section.items[0]?.question}
                                            </p>
                                        </div>
                                    ) : (
                                        // 通常のFAQ項目
                                        section.items.map((item, itemIndex) => {
                                            const key = `${sectionIndex}-${itemIndex}`
                                            const isOpen = openItems[key]
                                            const isLast = itemIndex === section.items.length - 1

                                            return (
                                                <div
                                                    key={itemIndex}
                                                    className="flex flex-col py-8"
                                                    style={{
                                                        gap: isOpen && item.answer ? '40px' : '0px',
                                                        borderTop: itemIndex === 0 ? '1px solid #D5D5D5' : 'none',
                                                        borderBottom: isLast ? '1px solid #D5D5D5' : 'none',
                                                    }}
                                                >
                                                    {/* Question Button */}
                                                    <button
                                                        className="w-full text-left flex items-center justify-between hover:opacity-80 transition-opacity"
                                                        onClick={() => toggleItem(sectionIndex, itemIndex)}
                                                        style={{ gap: '40px' }}
                                                    >
                                                        <span
                                                            className="text-[16px] font-medium leading-[1.6] text-black flex-1"
                                                            style={{ fontFamily: 'var(--font-noto-sans-jp)' }}
                                                        >
                                                            {item.question}
                                                        </span>
                                                        <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-[#2B7A78]" style={{ width: '40px', height: '40px' }}>
                                                            {isOpen ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M20.5 12H3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M12 3.5V20.5M20.5 12H3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </button>

                                                    {/* Answer */}
                                                    {isOpen && item.answer && (
                                                        <div className="w-full">
                                                            <p
                                                                className="text-[16px] font-normal leading-[1.6] text-black"
                                                                style={{ fontFamily: 'var(--font-noto-sans-jp)', textAlign: 'justify' }}
                                                            >
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - レスポンシブ対応を改善 */}
            <section className="w-full py-12 md:py-16 lg:py-[64px] px-4 md:px-8 lg:px-[120px] bg-[#FFD93B]">
                <div className="flex flex-col items-center gap-8 md:gap-10">
                    <h2 className="text-[28px] md:text-[36px] font-bold leading-none text-black text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>掲載店募集中！</h2>
                    <button className="flex items-center gap-2.5 px-8 md:px-10 py-3 md:py-4 rounded-full bg-[#2B7A78] hover:opacity-90 transition-opacity">
                        <span className="text-[16px] md:text-[18px] font-bold leading-none text-[#FAF8F4]" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>お店の方はこちら</span>
                        <div className="w-6 h-6 md:w-8 md:h-8 relative">
                            {/* Arrow icon placeholder */}
                            <div className="w-full h-full bg-white"></div>
                        </div>
                    </button>
                </div>
            </section>

            {/* Footer Section - レスポンシブ対応を改善 */}
            <footer className="w-full py-10 md:py-14">
                <div className="flex flex-col items-center gap-6">
                    {/* Logo */}
                    <div className="w-[200px] h-[200px] md:w-[294px] md:h-[294px] relative">
                        {/* SVG logo placeholder */}
                        <div className="w-full h-full bg-transparent"></div>
                    </div>

                    {/* Links - レスポンシブ対応 */}
                    <nav className="flex flex-wrap justify-center gap-4 md:gap-10 px-4">
                        <Link href="#faq" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            よくあるご質問
                        </Link>
                        <Link href="#contact" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            お問い合わせ
                        </Link>
                        <Link href="#privacy" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            プライバシーポリシー
                        </Link>
                        <Link href="#commercial" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            特定商取引法に基づく表記
                        </Link>
                        <Link href="#terms" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            ご利用規約
                        </Link>
                        <Link href="#company" className="text-sm md:text-base font-medium text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                            運営会社
                        </Link>
                    </nav>

                    {/* Copyright */}
                    <div className="flex items-center justify-center gap-10 py-6 md:py-10 border-t border-black w-full px-4">
                        <p className="text-sm md:text-base font-normal leading-none text-black" style={{ fontFamily: 'var(--font-oswald)' }}>©2025 nomoca Kagawa</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

