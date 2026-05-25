import type { Metadata } from 'next'
import { Limelight, Plaster } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ErrorHandlerProvider } from '@/components/providers/ErrorHandlerProvider'

const limelight = Limelight({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-limelight',
})

const plaster = Plaster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-plaster',
})

export const metadata: Metadata = {
  title: 'nomocaKagawa - 高松市のお得なサービス',
  description: '毎日一軒ごとにドリンク一杯が無料に！香川県の飲食店で使えるちょっとお得な"Welcomeドリンク"サービス「nomoca Kagawa」をご利用ください。',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${limelight.variable} ${plaster.variable}`}>
        <ErrorHandlerProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ErrorHandlerProvider>
      </body>
    </html>
  )
}

