import { IPost } from '@/types/store'
import { create } from 'zustand'


interface ContentState {
  posts: { node: IPost }[],
  updatePosts: (posts: { node: IPost }[]) => void
}

const useContentState = create<ContentState>((set) => ({
  posts: [],
  updatePosts: (posts) => set({
    posts,
  }),
}))

export default useContentState