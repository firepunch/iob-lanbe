import { IPost, IPosts, IReport, IReports, ISearchResult } from '@/types/store'
import { getUniqueEdges } from '@/utils/lib'
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
  recommend: IPosts,
  posts: IPosts,
  post?: IPost,
  report?: IReport,
  reports: IReports,
  notes: any[],
  searchResult?: ISearchResult,
  updateRecommend: (posts: IPosts) => void
  updatePosts: (posts: IPosts) => void
  updatePost: (post: IPost) => void
  updateReport: (report: IReport) => void
  updateReports: (reports: IReports) => void
  updateNotes: (notes: any[]) => void
  updateSearchResult: (result: ISearchResult) => void
  mergeSearchResult: (
    searchResult: {
      posts: IPosts
      reports: IReports
    },
    keyword: string
  ) => void
  setHasHydrated: (state: boolean) => void
}

export const INIT_CONTENT_STATE = {
  _hasHydrated: false,
  recommend: { edges: [], pageInfo: initPageInfo },
  posts: { edges: [], pageInfo: initPageInfo },
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
      updateRecommend: (recommend) => set({ recommend }),
      updatePosts: (posts) => set({ posts }), 
      updatePost: (post) => set({ post }),
      updateReport: (report) => set({ report }),
      updateReports: (reports) => set({ reports }),
      updateNotes: (notes) => set({ notes }),
      updateSearchResult: (searchResult) => set({ searchResult }),
      mergeSearchResult: (searchResult, keyword) => {
        set((prev) => {
          let result = {
            keyword,
            posts: searchResult.posts?.edges,
            reports: searchResult.reports?.edges,
          }

          if (prev.searchResult?.keyword !== keyword) {
            result = {
              keyword,
              posts: getUniqueEdges(
                [
                  ...result?.posts || [], 
                  ...prev.searchResult?.posts || [],
                ],
              ),
              reports: getUniqueEdges(
                [
                  ...result?.reports || [], 
                  ...prev.searchResult?.reports || [],
                ],
              ),
            }
          } 

          return {
            searchResult: result,
          }
        })
      },
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
