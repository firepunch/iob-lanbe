import { IPost, IPosts, IReport, IReports, ISearchResult } from '@/types/store'
import { create } from 'zustand'

interface ContentState {
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
}

const useContentState = create<ContentState>((set) => ({
  posts: { edges: [], pageInfo: {} },
  recommend: [],
  post: undefined,
  report: undefined,
  reports: { edges: [], pageInfo: {} },
  notes: [],
  searchResult: undefined,
  updatePosts: (posts) => set({ posts }),
  updateRecommend: (recommend) => set({ recommend }),
  updatePost: (post) => set({ post }),
  updateReport: (report) => set({ report }),
  updateReports: (reports) => set({ reports }),
  updateNotes: (notes) => set({ notes }),
  updateSearchResult: (searchResult) => set({ searchResult }),
}))

export default useContentState
