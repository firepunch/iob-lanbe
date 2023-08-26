import { IPaymentHistory, IStripeCard } from '@/types/api'
import { IOrder } from '@/types/store'
import { create } from 'zustand'

interface Tokens {
  authToken?: string
  refreshToken?: string
  sessionToken?: string
}

interface UserState extends Tokens {
  order?: IOrder
  cards?: IStripeCard[]
  cardHistory: IPaymentHistory
  updateTokens: (tokens: Tokens) => void
  updateOrder: (order: IOrder) => void
  updateCards: (cards: IStripeCard[]) => void
  updateCardHistory: (cardHistory: IPaymentHistory) => void
}

const useUserState = create<UserState>((set) => ({
  authToken: undefined,
  refreshToken: undefined,
  sessionToken: undefined,
  order: undefined,
  cards: undefined,
  cardHistory: { data: [], has_more: false },
  updateTokens: ({ authToken, refreshToken, sessionToken }: Tokens) => set({
    authToken,
    refreshToken,
    sessionToken,
  }),
  updateOrder: (order: IOrder) => set({ order }),
  updateCards: (cards: IStripeCard[]) => set({ cards }),
  updateCardHistory: (cardHistory: IPaymentHistory) => set({ cardHistory }),
}))

export default useUserState