import Image from 'next/image'
import Link from 'next/link'

type NomocaVariant = 'nomocaHome' | 'nomocaMerchant'
type ZenTone = 'white' | 'gray'
type ZenMode = 'full' | 'copyrightOnly'

type LpFooterProps =
  | {
      variant: NomocaVariant
    }
  | {
      variant: 'zen'
      tone: ZenTone
      mode: ZenMode
      className?: string
      showLogo?: boolean
      logoSrc?: string
      logoAlt?: string
      copyrightText?: string
    }

export function LpFooter(props: LpFooterProps) {
  if (props.variant === 'nomocaHome') {
    return (
      <div className="w-full bg-white py-12 lg:py-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 lg:gap-8">
          {/* Logo */}
          <Image
            src="/lp/images/logo-footer.svg"
            alt="nomoca"
            width={294}
            height={294}
            className="w-48 lg:w-64 lg:w-[294px] h-auto"
          />

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 lg:gap-10">
            <Link
              href="/lp/faq"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              よくあるご質問
            </Link>
            <Link
              href="/lp/contact"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              お問い合わせ
            </Link>
            <a
              href="/プライバシーポリシー.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              プライバシーポリシー
            </a>
            <a
              href="/特定商取引法.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              特定商取引法に基づく表記
            </a>
            <Link
              href="/terms-of-service.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              ご利用規約
            </Link>
            <a
              href="https://www.psytec-ai.com/"
              className="text-gray-800 hover:text-[#2B7A78] transition-colors text-sm lg:text-base"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: '500',
              }}
            >
              運営会社
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 lg:pt-8 border-t border-gray-200 w-full text-center">
            <p
              className="text-sm lg:text-base"
              style={{
                fontFamily: 'Oswald, sans-serif',
                color: '#000',
              }}
            >
              ©2025 nomoca Kagawa
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (props.variant === 'nomocaMerchant') {
    return (
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
          <a href="https://www.psytec-ai.com/" target="_blank" rel="noopener noreferrer" className="text-base font-medium" style={{ fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>
            運営会社
          </a>
        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center w-full py-10" style={{ borderTop: '1px solid #000' }}>
          <span className="text-base" style={{ fontFamily: 'Oswald, sans-serif', color: '#000' }}>
            ©2025 nomoca
          </span>
        </div>
      </footer>
    )
  }

  const {
    tone,
    mode,
    className,
    showLogo = true,
    logoSrc = '/logo.svg',
    logoAlt = 'TAMANOMI',
    copyrightText = '©2025 nomocaKagawa',
  } = props

  if (mode === 'copyrightOnly') {
    return (
      <footer className={`bg-gray-50 border-t mt-12 ${className ?? ''}`.trim()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2025 TAMANOMI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }

  const wrapperClassName =
    tone === 'white'
      ? `w-full bg-white border-t ${className ?? ''}`.trim()
      : `w-full bg-gray-50 border-t border-gray-200 ${className ?? ''}`.trim()

  return (
    <footer className={wrapperClassName}>
      <div className={tone === 'white' ? 'max-w-6xl mx-auto px-4 md:px-8' : 'max-w-6xl mx-auto px-4 py-8 md:px-[120px] md:py-12'}>
        <div className={tone === 'white' ? 'flex flex-col justify-center items-center gap-8 md:gap-10 pt-8 md:pt-12' : undefined}>
          {showLogo && (
            <div className="mb-4 md:mb-8">
              <Image src={logoSrc} alt={logoAlt} width={576} height={96} className="w-24 h-auto md:w-32 lg:w-[320px]" />
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-8">
            <Link
              href="/lp/faq"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
            >
              よくあるご質問
            </Link>
            <Link
              href="/lp/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
            >
              お問い合わせ
            </Link>
            <a
              href="/プライバシーポリシー.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
            >
              プライバシーポリシー
            </a>
            {tone === 'white' ? (
              <a
                href="/特定商取引法.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
              >
                特定商取引法に基づく表記
              </a>
            ) : (
              <Link
                href="/lp/commercial-law"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
              >
                特定商取引法に基づく表記
              </Link>
            )}
            <a
              href="/terms-of-service.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
            >
              ご利用規約
            </a>
            <a
              href="https://www.psytec-ai.com/"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
              style={{ fontFamily: '"Zen Kaku Gothic New"', fontWeight: '400' }}
            >
              運営会社
            </a>
          </div>

          <div className="pb-6 md:pb-8">
            <p
              className="text-sm md:text-base"
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Rubik',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '100%',
              }}
            >
              {copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


