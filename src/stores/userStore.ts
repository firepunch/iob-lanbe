import { IPaymentHistory, IStripeCard } from '@/types/api'
import { IUser, IOrder, IDownload, IPost, IReport } from '@/types/store'
import { create } from 'zustand'

interface Tokens {
  authToken?: string
  refreshToken?: string
  sessionToken?: string
}

interface UserState extends Tokens {
  user?: IUser
  userInfo?: any
  order?: IOrder
  download?: IDownload
  cards?: IStripeCard[]
  cardHistory: IPaymentHistory
  posts?: { node: IPost }[]
  reports?: { node: IReport }[]
  updateUser: (user: IUser) => void
  updateUserInfo: (userInfo: any) => void
  updateTokens: (tokens: Tokens) => void
  updateOrder: (order: IOrder) => void
  updateDownload: (download: IDownload) => void
  updateCards: (cards: IStripeCard[]) => void
  updateCardHistory: (cardHistory: IPaymentHistory) => void
  updatePosts: (posts:{ node: IPost }[]) => void
  updateReports: (products:{ node: IReport }[]) => void
}

const useUserState = create<UserState>((set) => ({
  user: undefined,
  userInfo: undefined,
  authToken: undefined,
  refreshToken: undefined,
  sessionToken: undefined,
  order: undefined,
  download: undefined,
  cards: undefined,
  cardHistory: { data: [], has_more: false },
  posts: undefined,
  reports: undefined,
  updateUser: (user) => set({ user }),
  updateUserInfo: (userInfo) => set({ userInfo }),
  updateTokens: ({ authToken, refreshToken, sessionToken }: Tokens) => set({
    authToken,
    refreshToken,
    sessionToken,
  }),
  updateOrder: (order: IOrder) => set({ order }),
  updateDownload: (download: IDownload) => set({ download }),
  updateCards: (cards: IStripeCard[]) => set({ cards }),
  updateCardHistory: (cardHistory: IPaymentHistory) => set({ cardHistory }),
  updatePosts: (posts) => set({ posts }),
  updateReports: (reports) => set({ reports }),
}))

export default useUserState