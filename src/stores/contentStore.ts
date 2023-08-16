import { IPost, IReport } from '@/types/store'
import { create } from 'zustand'

interface ContentState {
  posts: { node: IPost }[],
  reports: { node: IReport }[],
  updatePosts: (posts: { node: IPost }[]) => void
  updateReports: (reports: { node: IReport }[]) => void
}

const useContentState = create<ContentState>((set) => ({
  posts: [],
  reports: [],
  updatePosts: (posts) => set({
    posts,
  }),
  updateReports: (reports) => set({
    reports,
  }),
}))

export default useContentState