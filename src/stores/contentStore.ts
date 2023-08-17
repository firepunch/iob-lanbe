import { IPost, IReport } from '@/types/store'
import { create } from 'zustand'

interface ContentState {
  posts: { node: IPost }[],
  recommend: { node: IPost }[],
  post?: IPost,
  reports: { node: IReport }[],
  updatePosts: (posts: { node: IPost }[]) => void
  updateRecommend: (posts: { node: IPost }[]) => void
  updatePost: (post: IPost) => void
  updateReports: (reports: { node: IReport }[]) => void
}

const useContentState = create<ContentState>((set) => ({
  posts: [],
  recommend: [],
  post: undefined,
  reports: [],
  updatePosts: (posts) => set({ posts }),
  updateRecommend: (recommend) => set({ recommend }),
  updatePost: (post) => set({ post }),
  updateReports: (reports) => set({ reports }),
}))

export default useContentState