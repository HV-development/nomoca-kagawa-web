import type { LucideIcon } from 'lucide-react'

export type {
  User,
  Plan,
  UsageHistory,
  PaymentHistory,
  UserRank,
} from '@hv-development/schemas'

/** ランク表示用（アイコンはフロント依存のため schemas には含めない） */
export interface RankInfo {
  rank: import('@hv-development/schemas').UserRank
  label: string
  color: string
  bgColor: string
  icon: LucideIcon
  description: string
  monthsRequired: number
}
