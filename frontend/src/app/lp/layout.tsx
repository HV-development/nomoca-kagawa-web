import { Metadata } from 'next'
import './styles.css'
import { LpLayoutController } from '@/components/providers/LpLayoutController'

export const metadata: Metadata = {
  title: 'nomocaKagawa - 毎日1杯、無料で乾杯',
  description: '「nomocaKagawa」は、毎日1軒につきドリンクが1杯無料になる新しい"Welcomeドリンク"サービスです。',
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

export default function LPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="lp-layout">
      <LpLayoutController />
      {children}
    </div>
  )
}