/// <reference path="../../types/shims-next.d.ts" />
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'

const navLinks = [
    { href: '#about', label: 'nomocaとは' },
    { href: '#features', label: '魅力' },
    { href: '#flow', label: '使い方' },
    { href: '#pricing', label: '利用料金' },
    { href: '#stores', label: '加盟店一覧' },
]

const priceItems = [
    { label: '初期費用', amount: '0' },
    { label: '掲載料', amount: '0' },
    { label: '解約金', amount: '0' },
]

const benefits = [
    {
        title: '初期費用・掲載費【無料】',
        description: '導入コストは一切不要。月額費もかからず、すぐにスタートできます。',
        icon: '/lp/store/benefit-icon-1.svg',
    },
    {
        title: '無料ドリンクで集客＆回遊を促進',
        description: '「nomoca」をきっかけに来店したお客様が、料理や追加注文をすることで客単価がアップ。回遊性も高まり、新規顧客獲得につながります。',
        icon: '/lp/store/benefit-icon-2.svg',
    },
    {
        title: '新しいお客様との接点づくり',
        description: '普段来店しない層や若い世代など、これまで出会えなかったお客様に知ってもらうきっかけになります。',
        icon: '/lp/store/benefit-icon-3.svg',
    },
    {
        title: '簡単導入＆安心サポート',
        description: '掲載店ステッカーを貼るだけで導入完了。たまのみスタッフが運用までしっかりサポートします。',
        icon: '/lp/store/benefit-icon-4.svg',
    },
]

const steps = [
    {
        step: 'STEP.1',
        title: 'お申し込み',
        description: 'お申し込みフォームからお店の情報を入力して送信してください。',
        image: '/lp/store/step-1-image-bb98bb.png',
        arrow: '/lp/store/step-arrow-1.svg',
    },
    {
        step: 'STEP.2',
        title: '掲載内容確認',
        description: '申し込み内容をnomoca事務局で確認し、販促物を店舗に向けて発送します。',
        image: '/lp/store/step-2-image-6fae04.png',
        arrow: '/lp/store/step-arrow-2.svg',
    },
    {
        step: 'STEP.3',
        title: 'ご利用開始',
        description: '販促キットが到着したことを確認したのち、ご利用を開始していただけます。',
        image: '/lp/store/step-3-image.png',
    },
]

export default function StorePage() {
    useEffect(() => {
        document.body.classList.add('lp-page')
        return () => {
            document.body.classList.remove('lp-page')
        }
    }, [])

    return (
        <div className="w-full bg-[#FAF8F4] text-[#111] overflow-x-hidden" style={{ fontFamily: '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif' }}>
            {/* Header */}
            <header className="w-full bg-[#FAF8F4] py-2">
                <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
                    <Image 
                        src="/lp/store/horizon-2.svg" 
                        alt="nomoca Kagawa" 
                        width={244} 
                        height={92} 
                        className="w-[244px] h-auto" 
                        priority 
                    />
                    <nav className="flex items-center gap-11">
                        <div className="flex items-center gap-10">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.href} 
                                    href={link.href} 
                                    className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <Link
                            href="#cta"
                            className="flex items-center gap-2.5 px-6 py-2 bg-[#2B7A78] text-white text-base font-bold rounded-full hover:opacity-90 transition"
                        >
                            お店の方はこちら
                            <Image 
                                src="/lp/store/arrow-up.svg" 
                                alt="" 
                                width={32} 
                                height={32} 
                            />
                        </Link>
                    </nav>
                </div>
            </header>

            {/* FV */}
            <section id="pricing" className="relative w-full bg-[#7FBE26] flex items-end">
                {/* Left: Background Image with Text */}
                <div 
                    className="flex-1 flex items-end justify-center min-h-[695px] relative"
                    style={{
                        backgroundImage: 'url(/lp/store/fv-background-15ed65.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="w-full flex items-end justify-center py-14">
                        <div className="text-center text-white">
                            <h1 
                                className="text-[32px] font-bold leading-[1.4] mb-0"
                                style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                            >
                                掲載料無料で<br />
                                お店の売上アップに
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right: Content Box */}
                <div className="flex-1 max-w-[720px] bg-[#2B7A78] px-16 py-[72px] flex flex-col items-center justify-center gap-16 min-h-[600px]">
                    {/* Logo and Badge */}
                    <div className="flex flex-col items-center gap-4">
                        <h2 
                            className="text-[120px] font-bold text-white leading-none"
                            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                        >
                            nomoca
                        </h2>
                        <p 
                            className="text-[56px] font-bold text-white leading-none"
                            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                        >
                            加盟店募集中
                        </p>
                    </div>

                    {/* Price Info */}
                    <div className="flex items-center gap-6">
                        {priceItems.map((item, index) => (
                            <div key={item.label} className="flex items-center gap-4">
                                {index !== 0 && <div className="h-20 w-[2px] bg-[#FAF8F4]" />}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="px-[15px] py-1 bg-[#FFD93B] rounded-full">
                                        <span className="text-lg font-bold text-[#2B7A78]">{item.label}</span>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-[80px] font-semibold text-[#FAF8F4] leading-none" style={{ fontFamily: '"Commissioner", sans-serif' }}>{item.amount}</span>
                                        <span className="text-[26px] font-bold text-[#FAF8F4] leading-none">円</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="#cta"
                        className="relative w-[320px] flex items-center justify-center gap-2 px-6 py-4 bg-[#FFD93B] rounded-full hover:opacity-90 transition"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-lg font-bold text-black">今すぐ無料で</span>
                            <span className="text-[26px] font-bold text-black">お申し込み</span>
                        </div>
                        <Image 
                            src="/lp/store/arrow-up-button.svg" 
                            alt="" 
                            width={40} 
                            height={40}
                            className="absolute right-6"
                        />
                    </Link>
                </div>
            </section>

            {/* Description Section */}
            <section id="about" className="w-full bg-white">
                <div className="w-full max-w-[1440px] mx-auto px-[210px] py-20 flex items-center gap-20">
                    {/* Image */}
                    <div className="w-[540px] h-[400px] bg-[#C4C4C4] flex-shrink-0">
                        {/* Placeholder for description image */}
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col justify-center gap-20">
                        <p 
                            className="text-lg leading-[1.6] text-black text-justify"
                            style={{ fontFamily: '"Noto Sans JP", sans-serif', width: '300px' }}
                        >
                            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
                            <br /><br />
                            説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="features" className="w-full bg-[#EFECE8]">
                <div className="w-full max-w-[1440px] mx-auto px-[120px] py-20 flex flex-col items-center gap-[45px]">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-20">
                        <h2 
                            className="text-[32px] font-bold text-[#2B7A78]"
                            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                        >
                            掲載店のメリット
                        </h2>
                    </div>

                    {/* Description */}
                    <p 
                        className="text-lg font-bold leading-[1.6] text-black text-center"
                        style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                    >
                        "nomoca"に掲載することで、新しいお客様との出会いが広がります！
                    </p>

                    {/* Benefits Grid */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className="w-full md:w-[580px] bg-[#FAF8F4] rounded-lg p-4 md:p-6 flex items-center gap-6 md:gap-8"
                            >
                                {/* Icon */}
                                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex-shrink-0">
                                    <Image 
                                        src={benefit.icon} 
                                        alt={benefit.title} 
                                        width={120} 
                                        height={120}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <h3 
                                        className="text-base md:text-lg font-bold leading-[1.6] text-black"
                                        style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                                    >
                                        {benefit.title}
                                    </h3>
                                    <p 
                                        className="text-sm md:text-base leading-[1.6] text-black"
                                        style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                                    >
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Usage Section */}
            <section id="flow" className="w-full bg-[#FAF8F4]">
                <div className="w-full max-w-[1440px] mx-auto px-[120px] py-20 flex flex-col items-center gap-[45px]">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-20">
                        <h2 
                            className="text-[32px] font-bold text-[#2B7A78]"
                            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                        >
                            お店の対応はシンプル！約3秒で完了
                        </h2>
                    </div>

                    {/* Description */}
                    <p 
                        className="text-lg font-bold leading-[1.6] text-black text-center"
                        style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                    >
                        お客様が提示する画面を確認するだけ。<br />
                        シンプルな仕組みだから、忙しい時間帯でもスムーズに対応できます。
                    </p>

                    {/* Image */}
                    <div className="w-full flex justify-center items-center gap-10">
                        <Image 
                            src="/lp/store/simple-usage.svg" 
                            alt="簡単な使い方" 
                            width={1200} 
                            height={416}
                            className="w-full max-w-[1200px] h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Application Steps Section */}
            <section id="how-to-apply" className="w-full bg-[rgba(43,122,120,0.15)]">
                <div className="w-full max-w-[1440px] mx-auto px-[120px] py-20 flex flex-col items-center gap-[45px]">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-20">
                        <h2 
                            className="text-[32px] font-bold text-black"
                            style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                        >
                            お申し込み方法
                        </h2>
                    </div>

                    {/* Description */}
                    <p 
                        className="text-lg font-bold leading-[1.6] text-black text-center"
                        style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                    >
                        「nomoca」のご利用を開始するまでのステップをご紹介します。
                    </p>

                    {/* Steps */}
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
                        {steps.map((step, index) => (
                            <Fragment key={step.title}>
                                <div className="flex items-center gap-6 md:gap-4">
                                    <div className="flex flex-col items-center gap-4 bg-[#FAF8F4] rounded-lg p-6 md:p-8 w-[312px] md:w-[368px] flex-shrink-0">
                                        {/* Image with Step Badge */}
                                        <div className="relative w-full">
                                            <div className="w-full h-[217px] relative overflow-hidden rounded">
                                                <Image 
                                                    src={step.image} 
                                                    alt={step.title} 
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {/* Step Badge */}
                                            <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-[#2B7A78] px-[10px] py-[5px] rounded">
                                                <span 
                                                    className="text-lg font-bold text-[#FAF8F4]"
                                                    style={{ fontFamily: '"Oswald", sans-serif' }}
                                                >
                                                    {step.step}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 
                                                className="text-2xl font-bold leading-[1.6] text-black text-center"
                                                style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p 
                                                className="text-base font-medium leading-[1.6] text-black text-left"
                                                style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                                            >
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow between cards */}
                                {step.arrow && index < steps.length - 1 && (
                                    <div className="flex-shrink-0">
                                        <Image 
                                            src={step.arrow} 
                                            alt="" 
                                            width={46} 
                                            height={46}
                                        />
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="stores" className="w-full bg-[#FFD93B]">
                <div id="cta" className="w-full max-w-[1440px] mx-auto px-[120px] py-16 flex flex-col items-center gap-10">
                    <h2 
                        className="text-[28px] font-bold text-[#2B7A78]"
                        style={{ fontFamily: '"Zen Kaku Gothic New", sans-serif' }}
                    >
                        あなたのお店も"nomoca"に参加しませんか？
                    </h2>
                    <Link
                        href="/lp/merchant/apply"
                        className="flex items-center gap-2.5 px-10 py-6 bg-[#2B7A78] text-white rounded-full hover:opacity-90 transition"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#FAF8F4]">いますぐ</span>
                            <span className="text-xl font-bold text-[#FFD93B]">無料</span>
                            <span className="text-xl font-bold text-[#FAF8F4]">で申し込む</span>
                        </div>
                        <Image 
                            src="/lp/store/arrow-up-footer.svg" 
                            alt="" 
                            width={32} 
                            height={32}
                        />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-white">
                <div className="w-full max-w-[1440px] mx-auto px-6 py-14 flex flex-col items-center gap-6">
                    {/* Logo */}
                    <Image 
                        src="/lp/store/main-logo.svg" 
                        alt="nomoca Kagawa" 
                        width={294} 
                        height={294}
                    />

                    {/* Links */}
                    <div className="flex items-center gap-10">
                        <Link href="/lp/faq" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            よくあるご質問
                        </Link>
                        <Link href="/lp/contact" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            お問い合わせ
                        </Link>
                        <a href="/プライバシーポリシー.pdf" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            プライバシーポリシー
                        </a>
                        <a href="/特定商取引法.pdf" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            特定商取引法に基づく表記
                        </a>
                        <Link href="/lp/terms" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            ご利用規約
                        </Link>
                        <a href="#" className="text-base font-medium text-black hover:text-[#2B7A78] transition-colors">
                            運営会社
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="w-full pt-10 border-t border-black flex justify-center items-center">
                        <p 
                            className="text-base text-black"
                            style={{ fontFamily: '"Oswald", sans-serif' }}
                        >
                            ©2025 nomoca Kagawa
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

