/// <reference path="../../types/shims-next.d.ts" />
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const colors = {
    primary: '#2B7A78',
    accent: '#FFD93B',
    orange: '#FF6F61',
    base: '#FAF8F4',
    dark: '#111',
}

const navLinks = [
    { href: '#about', label: 'nomocaとは' },
    { href: '#features', label: '魅力' },
    { href: '#flow', label: '使い方' },
    { href: '#pricing', label: '利用料金' },
    { href: '#stores', label: '加盟店' },
]

const features = [
    {
        title: '1店舗につき1杯無料！',
        description:
            'お酒でもソフトドリンクでもOK。\n「nomoca（ノモカ）」の加盟店なら、ドリンク1杯が無料に。\nちょっと気になっていたお店に入ってみたり、気軽に一息ついたり。\nお財布にやさしく、気軽に乾杯を楽しめます。',
        image: '/lp/nomoca/features-1.png',
    },
    {
        title: '1日で複数店舗をハシゴできる！',
        description:
            '1店舗ごとに1杯無料だから、1日で何軒もまわれるのが「nomoca」の魅力。\n今日は仲間とカジュアルに、明日はしっとり一人飲み。\nその日の気分に合わせて、自由にドリンクめぐり！',
        image: '/lp/nomoca/features-2.png',
    },
    {
        title: 'お酒が苦手でも楽しめる！',
        description:
            '「nomoca」は"飲める人だけ"のサービスではありません。\nソフトドリンクも対象だから、ノンアル派や飲めない人でも安心。\n友達との軽い寄り道にも、一人時間のリフレッシュにも使えて、\n誰でも気軽に"乾杯"をシェアできます。',
        image: '/lp/nomoca/features-3.png',
    },
    {
        title: '新しいお店との出会い！',
        description:
            '普段行かないお店でも、1杯無料なら試しやすい。\n地元で愛される居酒屋から、雰囲気のいいカフェバーまで。\nnomocaがあれば、お店との新しい出会いを見つかるかも。\n街歩きしながら、思いがけない発見を楽しもう！',
        image: '/lp/nomoca/features-4.png',
    },
]

const steps = [
    {
        step: 'STEP',
        num: '1',
        title: 'お店を見つける',
        description: '今いる場所の近くや、行ってみたいお店をマップやリストからチェック。',
        image: '/lp/nomoca/flow-1.png',
    },
    {
        step: 'STEP',
        num: '2',
        title: 'スマホを見せる',
        description: 'お店でnomocaのクーポン画面を見せるだけ。対象ドリンクがその場で1杯無料に！',
        image: '/lp/nomoca/flow-2.png',
    },
    {
        step: 'STEP',
        num: '3',
        title: 'ハシゴして楽しむ',
        description: 'お店を変えれば同じ日にもう1杯無料。あなたの“ちょい飲み”がもっと自由に。',
        image: '/lp/nomoca/flow-3.png',
    },
]

const storeImages = ['/lp/nomoca/stores-1.png', '/lp/nomoca/stores-2.png', '/lp/nomoca/stores-3.png']

export default function LPPage() {
    const router = useRouter()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const container = 'w-full max-w-[1200px] mx-auto px-6 lg:px-10'

    useEffect(() => {
        document.body.classList.add('lp-page')
        // スクロールバーを非表示にするスタイルを追加
        const style = document.createElement('style')
        style.textContent = `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `
        document.head.appendChild(style)
        return () => {
            document.body.classList.remove('lp-page')
            document.head.removeChild(style)
        }
    }, [])

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
        }
    }

    return (
        <div className="w-full bg-white text-[#111] overflow-x-hidden" style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}>
            <header className="w-full py-4">
                <div className={`${container} flex items-center justify-between`}>
                    <Image src="/horizon-2.svg" alt="nomoca Kagawa" width={170} height={48} className="w-[160px] h-auto" priority />
                    <nav className="flex items-center gap-6 text-[13px] font-semibold text-[#0f1524]">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className="hover:text-[#2B7A78] transition-colors">
                                {l.label}
                            </a>
                        ))}
                        <Link href="/lp/contact" className="hover:text-[#2B7A78] transition-colors">
                            お問い合わせ
                        </Link>
                        <Link
                            href="/lp/merchant"
                            className="flex items-center justify-center rounded-full px-4 py-2 bg-[#2B7A78] text-white text-sm font-bold hover:brightness-110 transition ml-2"
                        >
                            お店の方はこちら
                        </Link>
                    </nav>
                </div>
            </header>

            {/* FV */}
            <section className="relative w-full text-[#0f1524] bg-[#f9f4ec]">
                <div className={`${container} py-10`}>
                    <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-2 min-h-[520px]">
                        <div className="relative z-20 flex flex-col self-center" style={{ gap: '0px' }}>
                            <div className="flex items-center gap-1 -ml-2">
                                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD93B] text-3xl font-black">1</span>
                                <span className="relative z-30 text-2xl font-bold text-[#111] -ml-3">店舗</span>
                                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD93B] text-3xl font-black -ml-3">1</span>
                                <span className="text-2xl font-bold text-[#111] -ml-2">杯無料</span>
                            </div>
                            <div
                                className="flex gap-1"
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <div className="flex flex-col leading-none text-[#2B7A78]">
                                    <span
                                        className="text-[70px] font-bold tracking-tight"
                                        style={{
                                            fontFamily: '"Segoe UI Symbol", sans-serif',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        nomoca
                                    </span>
                                </div>
                                <span
                                    className="text-[28px] font-extrabold text-[#0f1524]"
                                    style={{
                                        marginBottom: '0px',
                                        height: '70px',
                                        verticalAlign: 'bottom',
                                        marginTop: '0px',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    で
                                </span>
                            </div>
                            <p
                                className="text-[20px] font-bold text-[#333]"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '0px',
                                }}
                            >
                                もっと気軽に、楽しく街歩き！
                            </p>
                        </div>

                        <div className="relative w-full min-h-[420px] flex justify-end">
                            <div
                                className="absolute top-1/2 -translate-y-1/2 bg-[#2B7A78]"
                                style={{
                                    left: '100px',
                                    width: '320px',
                                    height: '350px',
                                }}
                            />
                            <div
                                className="absolute shadow-lg bg-white"
                                style={{
                                    width: '300px',
                                    height: '250px',
                                    left: '-124px',
                                    top: '78px',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    src="/lp/nomoca/fv-bg.png"
                                    alt="乾杯イメージ"
                                    width={300}
                                    height={250}
                                    style={{
                                        width: '300px',
                                        height: '250px',
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* fv-phone.pngをセクション直下に配置 */}
                <Image
                    src="/lp/nomoca/fv-phone.png"
                    alt="nomoca app"
                    width={230}
                    height={380}
                    className="absolute drop-shadow-2xl"
                    style={{
                        top: '198px',
                        left: '-35px',
                        width: '140px',
                        height: '283px',
                        objectFit: 'cover',
                    }}
                    priority
                />

                {/* 新しい要素 */}
                <div
                    className="absolute"
                    style={{
                        width: '204px',
                        height: '413px',
                        aspectRatio: '204/413',
                        right: '160px',
                        bottom: '151px',
                    }}
                />
            </section>

            {/* News (シンプル帯) */}
            <section className="w-full bg-white border-y border-[#d9e2de]">
                <div
                    className="relative w-full"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        gap: '24px',
                        padding: '40px 120px',
                    }}
                >
                    <div
                        ref={scrollContainerRef}
                        className="flex items-center overflow-x-auto scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            gap: '20px',
                            width: '100%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <div
                            className="flex-shrink-0"
                            style={{
                                width: '600px',
                                height: '337px',
                                backgroundColor: '#D9D9D9',
                            }}
                        />
                        <div
                            className="flex-shrink-0"
                            style={{
                                width: '600px',
                                height: '337px',
                                backgroundColor: '#D9D9D9',
                            }}
                        />
                        <div
                            className="flex-shrink-0"
                            style={{
                                width: '600px',
                                height: '337px',
                                backgroundColor: '#D9D9D9',
                            }}
                        />
                    </div>
                    <button
                        onClick={scrollLeft}
                        className="absolute flex items-center justify-center bg-[#2B7A78] rounded-full hover:opacity-80 transition-opacity"
                        style={{
                            width: '40px',
                            height: '40px',
                            left: '-20px',
                            top: 'calc(40px + 168.5px)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M18.6667 22.6666L12 15.9999L18.6667 9.33325" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute flex items-center justify-center bg-[#2B7A78] rounded-full hover:opacity-80 transition-opacity"
                        style={{
                            width: '40px',
                            height: '40px',
                            right: '-20px',
                            top: 'calc(40px + 168.5px)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ transform: 'rotate(180deg)' }}>
                            <path d="M18.6667 22.6666L12 15.9999L18.6667 9.33325" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* About */}
            <section id="about" className="w-full bg-white">
                <div
                    className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 py-20 lg:py-28"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        gap: '40px',
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex flex-row items-end gap-6 lg:gap-10 pb-6 border-b border-[#2B7A78]"
                        style={{
                            alignSelf: 'stretch',
                        }}
                    >
                        <h2
                            className="text-4xl lg:text-[56px]"
                            style={{
                                fontFamily: '"Oswald", sans-serif',
                                fontWeight: 500,
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            ABOUT
                        </h2>
                        <p
                            className="text-base lg:text-[22px]"
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 700,
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            nomocaとは？
                        </p>
                    </div>

                    {/* Content */}
                    <div
                        className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 relative w-full"
                    >
                        {/* Text Section */}
                        <div
                            className="flex flex-1 min-w-0 w-full lg:w-auto"
                        >
                            <div
                                className="flex flex-col justify-center items-start gap-6 p-8 lg:p-12 xl:p-[120px_220px_120px_120px] w-full bg-[rgba(43,122,120,0.1)]"
                                style={{
                                    boxSizing: 'border-box',
                                }}
                            >
                                <p
                                    className="text-lg lg:text-2xl"
                                    style={{
                                        fontFamily: '"Noto Sans JP", sans-serif',
                                        fontWeight: 700,
                                        lineHeight: '1.6000000635782878em',
                                        textAlign: 'justify',
                                        color: '#000000',
                                        width: '100%',
                                    }}
                                >
                                    nomocaを片手に、<br />
                                    気になるお店をハシゴしよう。
                                </p>
                                <p
                                    className="text-sm lg:text-base"
                                    style={{
                                        fontFamily: '"Noto Sans JP", sans-serif',
                                        fontWeight: 500,
                                        lineHeight: '1.7999999523162842em',
                                        textAlign: 'justify',
                                        color: '#000000',
                                        width: '100%',
                                    }}
                                >
                                    「nomoca」は、毎日1軒につきドリンクが1杯無料になる新しい"Welcomeドリンク"サービスです。
                                    お酒でもソフトドリンクでもOK。
                                    気になるお店をみつけたら、仲間と乾杯したり、自分だけの寄り道を楽しんだり。
                                    今日の一杯をきっかけに、街の楽しさがどんどん広がる。
                                    あなたの「今日はどこで飲もう？」をもっと自由に、もっとおトクにします。
                                </p>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div
                            className="flex-shrink-0 relative z-[100] w-full lg:w-[350px] h-[250px] lg:h-[350px] mt-0 lg:mt-[102px] flex items-center justify-center"
                        >
                            <Image
                                src="/lp/nomoca/about-illustration.png"
                                alt="nomoca about"
                                width={350}
                                height={350}
                                className="object-cover w-full h-full lg:w-[350px] lg:h-[350px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="w-full" style={{ backgroundColor: '#2B7A78' }}>
                <div
                    style={{
                        display: 'flex',
                        padding: '120px 130px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '40px',
                        alignSelf: 'stretch',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: '40px',
                            width: '979px',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                width: '100%',
                                gap: '40px',
                                padding: '0px 0px 24px',
                                borderBottom: '1px solid #FFD93B',
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: '"Oswald", sans-serif',
                                    fontWeight: 500,
                                    fontSize: '56px',
                                    lineHeight: '1em',
                                    color: '#FFD93B',
                                }}
                            >
                                FEATURES
                            </h2>
                            <p
                                style={{
                                    fontFamily: '"Noto Sans JP", sans-serif',
                                    fontWeight: 700,
                                    fontSize: '22px',
                                    lineHeight: '1em',
                                    color: '#FFD93B',
                                }}
                            >
                                nomocaの魅力
                            </p>
                        </div>

                        {/* Content */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                width: '100%',
                                gap: '40px',
                            }}
                        >
                            {features.map((f, idx) => (
                                <div
                                    key={f.title}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        gap: '24px',
                                        backgroundColor: 'rgba(43, 122, 120, 0.1)',
                                        width: '100%',
                                        minHeight: '400px',
                                    }}
                                >
                                    <div
                                        className="relative overflow-hidden"
                                        style={{
                                            width: '350px',
                                            height: '250px',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Image
                                            src={f.image}
                                            alt={f.title}
                                            fill
                                            className="object-cover"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            gap: '16px',
                                            width: '100%',
                                            padding: '0 0 24px 0',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                fontWeight: 700,
                                                fontSize: '24px',
                                                lineHeight: '1.6000000635782878em',
                                                textAlign: 'justify',
                                                color: '#FAF8F4',
                                                width: '350px',
                                                paddingLeft: '0',
                                            }}
                                        >
                                            {f.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                fontWeight: 500,
                                                fontSize: '16px',
                                                lineHeight: '1.7999999523162842em',
                                                textAlign: 'left',
                                                color: '#FAF8F4',
                                                width: '350px',
                                                whiteSpace: 'pre-line',
                                                paddingLeft: '0',
                                            }}
                                        >
                                            {f.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Flow */}
            <section id="flow" className="w-full" style={{ backgroundColor: '#FFFFFF' }}>
                <div
                    style={{
                        display: 'flex',
                        padding: '120px 130px',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignSelf: 'stretch',
                        gap: '40px',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            alignSelf: 'stretch',
                            gap: '40px',
                            padding: '0px 0px 24px',
                            borderBottom: '1px solid #2B7A78',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: '"Oswald", sans-serif',
                                fontWeight: 500,
                                fontSize: '56px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            FLOW
                        </h2>
                        <p
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 700,
                                fontSize: '22px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            nomocaの使い方
                        </p>
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'stretch',
                            alignItems: 'stretch',
                            alignSelf: 'stretch',
                            gap: '40px',
                        }}
                    >
                        {steps.map((s) => (
                            <div
                                key={s.num}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '36px',
                                    flex: '1 1 0',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    minHeight: '477px',
                                    marginTop: '10px',
                                }}
                            >
                                {/* Image Section with STEP Badge */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'stretch',
                                        gap: '-56px',
                                        position: 'relative',
                                        marginBottom: '60px',
                                    }}
                                >
                                    {/* Circular Image */}
                                    <div
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                            borderRadius: '9999px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <Image
                                            src={s.image}
                                            alt={s.title}
                                            fill
                                            className="object-cover"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    {/* STEP Badge */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '16px',
                                            backgroundColor: '#FFD93B',
                                            borderRadius: '9999px',
                                            position: 'absolute',
                                            bottom: '-50px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: '"Oswald", sans-serif',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                                lineHeight: '1em',
                                                color: '#2B7A78',
                                            }}
                                        >
                                            {s.step}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: '"Oswald", sans-serif',
                                                fontWeight: 500,
                                                fontSize: '32px',
                                                lineHeight: '1em',
                                                color: '#2B7A78',
                                            }}
                                        >
                                            {s.num}
                                        </span>
                                    </div>
                                </div>
                                {/* Text Section */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'stretch',
                                        gap: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontFamily: '"Noto Sans JP", sans-serif',
                                            fontWeight: 700,
                                            fontSize: '24px',
                                            lineHeight: '1.6000000635782878em',
                                            textAlign: 'justify',
                                            color: '#000000',
                                            width: '100%',
                                        }}
                                    >
                                        {s.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: '"Noto Sans JP", sans-serif',
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '1.7999999523162842em',
                                            textAlign: 'left',
                                            color: '#000000',
                                            width: '100%',
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="w-full relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        gap: '40px',
                        padding: '0px 130px 120px 130px',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            alignSelf: 'stretch',
                            gap: '40px',
                            padding: '0px 0px 24px',
                            borderBottom: '1px solid #2B7A78',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: '"Oswald", sans-serif',
                                fontWeight: 500,
                                fontSize: '56px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            PRICING
                        </h2>
                        <p
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 700,
                                fontSize: '22px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            利用料金
                        </p>
                    </div>
                    {/* Subtitle */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            gap: '10px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 700,
                                fontSize: '26px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                                textAlign: 'left',
                            }}
                        >
                            1日あたり約30円でちょい飲み体験！
                        </p>
                    </div>
                    {/* Pricing Card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '24px',
                            padding: '56px 0px 64px',
                            width: '1180px',
                            maxWidth: '100%',
                            margin: '0 auto',
                            backgroundImage: 'url(/lp/nomoca/pricing-card.png)',
                            backgroundSize: '100% 165.852%',
                            backgroundPosition: '0px -109.547px',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        {/* Left Card - Regular Price */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '24px 0px',
                                width: '580px',
                                maxWidth: '100%',
                                backgroundColor: '#FAF8F4',
                                borderRadius: '8px',
                            }}
                        >
                            {/* Badge: １日1軒1杯無料 */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '7px 32px',
                                    backgroundColor: '#FFD93B',
                                }}
                            >
                                {/* Vector 1 - Left Icon */}
                                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L11 10L1 19" stroke="#2B7A78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span
                                    style={{
                                        fontFamily: '"Noto Sans JP", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '24px',
                                        lineHeight: '1em',
                                        color: '#2B7A78',
                                    }}
                                >
                                    １日1軒1杯無料
                                </span>
                                {/* Vector 2 - Right Icon */}
                                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1L1 10L11 19" stroke="#2B7A78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            {/* Price Display */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                {/* 月額 Badge */}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '68px',
                                        height: '68px',
                                        backgroundColor: '#FFD93B',
                                        borderRadius: '9999px',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: '"Noto Sans JP", sans-serif',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '1em',
                                            color: '#000000',
                                        }}
                                    >
                                        月額
                                    </span>
                                </div>
                                {/* Price */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: '8px',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: '"Oswald", sans-serif',
                                            fontWeight: 600,
                                            fontSize: '100px',
                                            lineHeight: '1em',
                                            letterSpacing: '-0.06em',
                                            color: '#000000',
                                        }}
                                    >
                                        980
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: '"Noto Sans JP", sans-serif',
                                            fontWeight: 700,
                                            fontSize: '22px',
                                            lineHeight: '1em',
                                            color: '#000000',
                                            paddingBottom: '5px',
                                        }}
                                    >
                                        円（税込）
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Right Card - MyDigi Member Price */}
                        <div
                            style={{
                                position: 'relative',
                                width: '580px',
                                maxWidth: '100%',
                            }}
                        >
                            {/* Badge: マイデジ会員なら - Above the green banner */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '5px 0px',
                                    backgroundColor: '#FFD93B',
                                    borderRadius: '9999px',
                                    marginBottom: '8px',
                                    width: '100%',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: '"Zen Kaku Gothic New", sans-serif',
                                        fontWeight: 700,
                                        fontSize: '22px',
                                        lineHeight: '1em',
                                        color: '#000000',
                                    }}
                                >
                                    マイデジ会員なら
                                </span>
                            </div>
                            {/* Green Banner Container */}
                            <div
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '0px 0px 0px 24px',
                                    width: '100%',
                                    height: '160px',
                                    backgroundColor: '#2B7A78',
                                    borderRadius: '8px',
                                }}
                            >
                                {/* Image - Overlapping the green banner */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '0px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '152px',
                                        height: '179px',
                                        zIndex: 1,
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image
                                            src="/lp/nomoca/mydigi0.png"
                                            alt="MyDigi"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Price Content - Inside the green banner */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginLeft: '152px',
                                        flex: 1,
                                    }}
                                >
                                    {/* 月額 Badge */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '68px',
                                            height: '68px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '9999px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                fontWeight: 700,
                                                fontSize: '20px',
                                                lineHeight: '1em',
                                                color: '#000000',
                                            }}
                                        >
                                            月額
                                        </span>
                                    </div>
                                    {/* Price */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                            gap: '4px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: '"Oswald", sans-serif',
                                                fontWeight: 700,
                                                fontSize: '108px',
                                                lineHeight: '1em',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            480
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                fontWeight: 700,
                                                fontSize: '20px',
                                                lineHeight: '1.2em',
                                                color: '#FFFFFF',
                                                whiteSpace: 'pre-line',
                                                paddingBottom: '4px',
                                            }}
                                        >
                                            {`円で
利用可能！`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Note */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 400,
                                fontSize: '15px',
                                lineHeight: '1.6em',
                                color: '#000000',
                                whiteSpace: 'pre-line',
                                textAlign: 'left',
                            }}
                        >
                            {`※対象ドリンクは店舗により異なります。
※同一店舗での無料適用は1日お一人さま1杯までです。`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stores */}
            <section id="stores" className="w-full bg-[#FFD93B]">
                <div className={`${container} py-20 lg:py-28 text-center text-[#111]`}>
                    <div className="relative inline-block mb-10 lg:mb-14">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111]/70">STORES</h2>
                        <p className="absolute left-1/2 -bottom-2 -translate-x-1/2 text-base md:text-lg font-bold whitespace-nowrap">加盟店</p>
                    </div>
                    <p className="text-base md:text-lg font-bold mb-10">加盟店、ぞくぞく拡大中！</p>
                    <div className="grid lg:grid-cols-3 gap-6 mb-12">
                        {storeImages.map((src, i) => (
                            <div key={src} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <Image src={src} alt={`store-${i + 1}`} width={360} height={220} className="w-full h-auto object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold text-white bg-[#FF6F61] hover:brightness-105 transition">
                            店舗一覧はこちら
                            <span className="text-xl">›</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="w-full bg-white">
                <div className="max-w-[900px] min-w-[900px] mx-auto px-6 lg:px-10 py-20 lg:py-24 text-center text-[#111]">
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            alignSelf: 'stretch',
                            gap: '40px',
                            padding: '0px 0px 24px',
                            borderBottom: '1px solid #2B7A78',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: '"Oswald", sans-serif',
                                fontWeight: 500,
                                fontSize: '56px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            FAQ
                        </h2>
                        <p
                            style={{
                                fontFamily: '"Noto Sans JP", sans-serif',
                                fontWeight: 700,
                                fontSize: '22px',
                                lineHeight: '1em',
                                color: '#2B7A78',
                            }}
                        >
                            よくあるご質問
                        </p>
                    </div>
                    <p className="text-base md:text-lg font-bold mb-8">
                        お問い合わせの多い質問をまとめました。
                        <br className="hidden md:block" />
                        お問い合わせの前に、ご確認ください。
                    </p>
                    <Link
                        href="/lp/faq"
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold text-white"
                        style={{ backgroundColor: colors.primary }}
                    >
                        よくあるご質問はこちら
                        <span className="text-xl">›</span>
                    </Link>
                </div>
            </section>

            {/* CTA for merchants */}
            <section id="cta" className="w-full" style={{ backgroundColor: colors.accent }}>
                <div className="max-w-[800px] min-w-[800px] mx-auto px-6 lg:px-10 py-16 text-center text-[#111]">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">掲載店募集中！</h2>
                    <button
                        onClick={() => router.push('/lp/merchant')}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold text-[#111] border-2 border-[#111] hover:bg-[#111] hover:text-white transition"
                    >
                        お店の方はこちら
                        <span className="text-xl">›</span>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-[#eee]">
                <div className="max-w-[1200px] min-w-[1200px] mx-auto px-6 lg:px-10 py-10">
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-2xl font-extrabold">nomoca Kagawa</div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
                            <Link href="/lp/faq" className="hover:text-[#2B7A78] transition-colors">
                                よくあるご質問
                            </Link>
                            <Link href="/lp/contact" className="hover:text-[#2B7A78] transition-colors">
                                お問い合わせ
                            </Link>
                            <a href="/プライバシーポリシー.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B7A78] transition-colors">
                                プライバシーポリシー
                            </a>
                            <a href="/特定商取引法.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B7A78] transition-colors">
                                特定商取引法に基づく表記
                            </a>
                            <Link href="/lp/terms" className="hover:text-[#2B7A78] transition-colors">
                                ご利用規約
                            </Link>
                            <a href="#" className="hover:text-[#2B7A78] transition-colors">
                                運営会社
                            </a>
                        </div>
                        <p className="text-sm text-[#555]">©2025 nomoca Kagawa</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

