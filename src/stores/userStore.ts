import { create } from 'zustand'

interface Tokens {
  authToken?: string,
  refreshToken?: string,
  sessionToken?: string,
}

interface UserState extends Tokens {
  updateTokens: (tokens: Tokens) => void,
}

const useUserState = create<UserState>((set) => ({
  authToken: undefined,
  refreshToken: undefined,
  sessionToken: undefined,
  updateTokens: ({ authToken, refreshToken, sessionToken }: Tokens) => set({
    authToken,
    refreshToken,
    sessionToken,
  }),
}))

export default useUserState