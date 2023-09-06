import { TStringObj } from '@/types'
import { IPaymentHistory, IStripeCard } from '@/types/api'
import { IUser, IOrder, Tokens, IDownload, IPost, IReport, IResponseUser } from '@/types/store'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface IUserState extends Tokens {
  _hasHydrated: boolean
  user: IUser
  userInfo?: any
  posts?: { node: IPost }[]
  reports?: { node: IReport }[]
  bookmark: { post: { node: IPost }[], report: { node: IReport }[] }
  read: { post: { node: IPost }[], report: { node: IReport }[] }
  resetUser: () => void
  updateUser: (userRes: IResponseUser) => void
  updateUserInfo: (userInfo: any) => void
  updateTokens: (tokens: Tokens) => void
  updatePosts: (posts: { node: IPost }[]) => void
  updateReports: (products: { node: IReport }[]) => void
  updateBookmarkPost: (post: { node: IPost }[]) => void
  updateBookmarkReport: (report: { node: IReport }[]) => void
  updateReadPost: (post: { node: IPost }[]) => void
  updateDownloadedReport: (report: { node: IReport }[]) => void
  setHasHydrated: (state: boolean) => void
}

const INIT_USER = { databaseId: 0, name: '', email:'', registeredDate: '' }
export const INIT_USER_STATE = {
  _hasHydrated: false,
  user: INIT_USER,
  userInfo: undefined,
  authToken: undefined,
  refreshToken: undefined,
  sessionToken: undefined,
  posts: undefined,
  reports: undefined,
  bookmark: { post: [], report: [] },
  read: { post: [], report: [] },
}

const useUserState = create<IUserState>()(
  persist(
    (set) => ({
      ...INIT_USER_STATE,
      resetUser: () => set({ 
        user: INIT_USER,
        userInfo: undefined,
        authToken: undefined,
        refreshToken: undefined,
        sessionToken: undefined,
      }),
      updateUser: (userRes) => set({ ...userRes, user: userRes?.user }),
      updateUserInfo: (userInfo) => set({ userInfo }),
      updateTokens: ({ authToken, refreshToken, sessionToken }: Tokens) => set({
        authToken,
        refreshToken,
        sessionToken,
      }),
      updatePosts: (posts) => set({ posts }),
      updateReports: (reports) => set({ reports }),
      updateBookmarkPost: (post) => set((prev) => ({ bookmark: { post, report: prev.bookmark.report } })),
      updateBookmarkReport: (report) => set((prev) => ({ bookmark: { report, post: prev.bookmark.post } })),
      updateReadPost: (post) => set((prev) => ({ read: { post, report: prev.read.report } })),
      updateDownloadedReport: (report) => set((prev) => ({ read: { report, post: prev.read.post } })),
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        })
      },
    }),
    {
      name: 'user-storage',
      onRehydrateStorage: () => (state: IUserState) => {
        state.setHasHydrated(true)
      },
    }
  )
)

export default useUserState