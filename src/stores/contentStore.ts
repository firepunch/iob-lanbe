import { IPost, IPosts, IReport } from '@/types/store'
import { create } from 'zustand'

interface ContentState {
  posts: IPosts,
  recommend: { node: IPost }[],
  post?: IPost,
  report?: IReport,
  reports: { node: IReport }[],
  notes: any[],
  updatePosts: (posts: IPosts) => void
  updateRecommend: (posts: { node: IPost }[]) => void
  updatePost: (post: IPost) => void
  updateReport: (report: IReport) => void
  updateReports: (reports: { node: IReport }[]) => void
  updateNotes: (notes: any[]) => void
}

const useContentState = create<ContentState>((set) => ({
  posts: { edges: [], pageInfo: {} },
  recommend: [],
  post: undefined,
  report: undefined,
  reports: [],
  notes: [],
  updatePosts: (posts) => set({ posts }),
  updateRecommend: (recommend) => set({ recommend }),
  updatePost: (post) => set({ post }),
  updateReport: (report) => set({ report }),
  updateReports: (reports) => set({ reports }),
  updateNotes: (notes) => set({ notes })
}))

export default useContentState