import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidToken } from '../utils/lib'

const withNoAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const isValid = isValidToken()
    const { back } = useRouter()

    return <Component {...props} />
  }

  return Auth
}

export default withNoAuth
