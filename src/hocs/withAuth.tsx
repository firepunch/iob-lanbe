import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidToken } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const isValid = isValidToken()
    const { replace } = useRouter()

    return <Component {...props} />
  }

  return Auth
}

export default withAuth
