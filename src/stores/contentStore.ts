import { IPost, IPosts, IReport } from '@/types/store'
import { create } from 'zustand'

interface ContentState {
  posts: IPosts,
  recommend: { node: IPost }[],
  post?: IPost,
  report?: IReport,
  reports: { node: IReport }[],
  updatePosts: (posts: IPosts) => void
  updateRecommend: (posts: { node: IPost }[]) => void
  updatePost: (post: IPost) => void
  updateReport: (report: IReport) => void
  updateReports: (reports: { node: IReport }[]) => void
}

const useContentState = create<ContentState>((set) => ({
  posts: { edges: [], pageInfo: {} },
  recommend: [],
  post: undefined,
  report: undefined,
  reports: [],
  updatePosts: (posts) => set({ posts }),
  updateRecommend: (recommend) => set({ recommend }),
  updatePost: (post) => set({ post }),
  updateReport: (report) => set({ report }),
  updateReports: (reports) => set({ reports }),
}))

export default useContentState