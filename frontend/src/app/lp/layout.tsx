import { Metadata } from 'next'
import './styles.css'
import { LpLayoutController } from '@/components/providers/LpLayoutController'
import { LpFlowButton } from '@/components/atoms/LpFlowButton'

export const metadata: Metadata = {
  title: 'nomocaKagawa - 毎日1杯、無料で乾杯',
  description: '香川県内のお店で使える便利でお得なサービス「nomoca Kagawa」。会員登録でポイントが貯まる、クーポンが使えるなど、お得な特典がいっぱい！',
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
      <LpFlowButton />
      {children}
    </div>
  )
}