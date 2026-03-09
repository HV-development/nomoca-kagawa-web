export type { CreateStoreIntroductionRequest } from '@hv-development/schemas'

// 必要に応じてレスポンス型はローカルで定義
export interface CreateStoreIntroductionResponse {
  success: boolean
  message: string
  data: {
    id: string
    createdAt: string
  }
}

export interface StoreIntroduction {
  id: string
  storeName1: string
  recommendedMenu1: string
  storeName2: string
  recommendedMenu2: string
  storeName3: string
  recommendedMenu3: string
  createdAt: string
}
