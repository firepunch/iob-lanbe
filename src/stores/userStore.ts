import { IPaymentHistory, IStripeCard } from '@/types/api'
import { create } from 'zustand'

interface Tokens {
  authToken?: string
  refreshToken?: string
  sessionToken?: string
  cards: IStripeCard[]
  cardHistory: IPaymentHistory
}

interface UserState extends Tokens {
  updateTokens: (tokens: Tokens) => void,
  updateCards: (cards: IStripeCard[]) => void
  updateCardHistory: (cardHistory: IPaymentHistory) => void
}

const useUserState = create<UserState>((set) => ({
  authToken: undefined,
  refreshToken: undefined,
  sessionToken: undefined,
  cards: [],
  cardHistory: { data: [], has_more: false },
  updateTokens: ({ authToken, refreshToken, sessionToken }: Tokens) => set({
    authToken,
    refreshToken,
    sessionToken,
  }),
  updateCards: (cards: IStripeCard[]) => set({ cards }),
  updateCardHistory: (cardHistory: IPaymentHistory) => set({ cardHistory }),
}))

export default useUserState