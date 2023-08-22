import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidToken } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const isValid = isValidToken()
    const router = useRouter()

    return isValid ? 
      <Component {...props} /> : 
      router.replace('/sign-in')
  }

  return Auth
}

export default withAuth
