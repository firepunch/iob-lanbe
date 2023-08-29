import useUserState from '@/stores/userStore'
import { IUser } from '@/types/store'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidUser } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const updateUser = useUserState(state => state.updateUser)
    const { isValid, user } = isValidUser()
    const { replace } = useRouter()

    if (user) updateUser(user)
    
    return isValid ? 
      <Component {...props} /> : 
      replace('/sign-in')
  }

  return Auth
}

export default withAuth
