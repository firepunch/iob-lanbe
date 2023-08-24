import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidToken } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const isValid = isValidToken()
    const { replace } = useRouter()

    return isValid ? 
      <Component {...props} /> : 
      replace('/sign-in')
  }

  return Auth
}

export default withAuth
