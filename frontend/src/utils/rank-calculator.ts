import type { UserRank, RankInfo } from "../types/user"

export const RANK_THRESHOLDS = {
  bronze: 0, // 0ヶ月〜
  silver: 12, // 12ヶ月（1年）〜
  gold: 36, // 36ヶ月（3年）〜
  diamond: 60, // 60ヶ月（5年）〜
}

export const RANK_INFO: Record<UserRank, RankInfo> = {
  bronze: {
    rank: "bronze",
    label: "ブロンズ",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    icon: null,
    description: "初回ランク",
    monthsRequired: 0,
  },
  silver: {
    rank: "silver",
    label: "シルバー",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: null,
    description: "契約から1年以上の優良メンバー",
    monthsRequired: 12,
  },
  gold: {
    rank: "gold",
    label: "ゴールド",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    icon: null,
    description: "契約から3年以上のロイヤルメンバー",
    monthsRequired: 36,
  },
  diamond: {
    rank: "diamond",
    label: "ダイヤモンド",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: null,
    description: "5年継続利用のレジェンドメンバー",
    monthsRequired: 60,
  },
}

/**
 * 契約開始日からユーザーのランクを計算する
 */
export function calculateUserRank(contractStartDate: Date | string | undefined | null): UserRank {
  if (!contractStartDate) {
    return "bronze"
  }

  const now = new Date()
  let startDate: Date | null = null

  try {
    if (typeof contractStartDate === 'string') {
      const parsed = new Date(contractStartDate)
      if (!isNaN(parsed.getTime())) {
        startDate = parsed
      }
    } else if (contractStartDate instanceof Date) {
      if (!isNaN(contractStartDate.getTime())) {
        startDate = contractStartDate
      }
    }
  } catch {
    return "bronze"
  }

  if (!startDate) {
    return "bronze"
  }

  const monthsDiff = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  )

  if (monthsDiff >= RANK_THRESHOLDS.diamond) return "diamond"
  if (monthsDiff >= RANK_THRESHOLDS.gold) return "gold"
  if (monthsDiff >= RANK_THRESHOLDS.silver) return "silver"
  return "bronze"
}

/**
 * 次のランクの情報を取得する
 */
export function getNextRankInfo(currentRank: UserRank): RankInfo | null {
  const ranks: UserRank[] = ["bronze", "silver", "gold", "diamond"]
  const currentIndex = ranks.indexOf(currentRank)

  if (currentIndex === -1 || currentIndex === ranks.length - 1) {
    return null
  }

  return RANK_INFO[ranks[currentIndex + 1]]
}

/**
 * 次のランクまでの残り月数を計算する
 */
export function getMonthsToNextRank(contractStartDate: Date | string | undefined | null, currentRank: UserRank): number | null {
  const nextRank = getNextRankInfo(currentRank)
  if (!nextRank) return null

  if (!contractStartDate) {
    return null
  }

  const now = new Date()
  let startDate: Date | undefined

  if (typeof contractStartDate === 'string') {
    startDate = new Date(contractStartDate)
  } else if (contractStartDate instanceof Date) {
    startDate = contractStartDate
  } else {
    return null
  }

  if (!startDate || isNaN(startDate.getTime())) {
    return null
  }

  const monthsDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44))

  return Math.max(0, nextRank.monthsRequired - monthsDiff)
}
