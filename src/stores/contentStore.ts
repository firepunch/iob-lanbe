import { IPost, IPosts, IReport, IReports, ISearchResult } from '@/types/store'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const initPageInfo = {
  initTotal: 0,
  total: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: undefined,
  endCursor: undefined,
}
interface IContentState {
  _hasHydrated: boolean
  posts: IPosts,
  post?: IPost,
  report?: IReport,
  reports: IReports,
  recommend: { node: IPost }[],
  notes: any[],
  searchResult?: ISearchResult,
  updatePosts: (posts: IPosts) => void
  updatePost: (post: IPost) => void
  updateReport: (report: IReport) => void
  updateReports: (reports: IReports) => void
  updateRecommend: (posts: { node: IPost }[]) => void
  updateNotes: (notes: any[]) => void
  updateSearchResult: (result: ISearchResult) => void
  setHasHydrated: (state: boolean) => void
}

export const INIT_CONTENT_STATE = {
  _hasHydrated: false,
  posts: { edges: [], pageInfo: initPageInfo },
  recommend: [],
  post: undefined,
  report: undefined,
  reports: { edges: [], pageInfo: initPageInfo },
  notes: [],
  searchResult: undefined,
}

const useContentState = create<IContentState>()(
  persist(
    (set) => ({
      ...INIT_CONTENT_STATE,
      updatePosts: (posts) => set({ posts }), 
      updateRecommend: (recommend) => set({ recommend }),
      updatePost: (post) => set({ post }),
      updateReport: (report) => set({ report }),
      updateReports: (reports) => set({ reports }),
      updateNotes: (notes) => set({ notes }),
      updateSearchResult: (searchResult) => set({ searchResult }),
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        })
      },
    }),
    {
      name: 'content-storage',
      onRehydrateStorage: () => (state: IContentState) => {
        state.setHasHydrated(true)
      },
    }
  )
)

export default useContentState
