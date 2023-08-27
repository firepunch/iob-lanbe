import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { isValidToken } from '../utils/lib'

const withNoAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const isValid = isValidToken()
    const { back } = useRouter()

    return isValid ? 
      back() :
      <Component {...props} />
  }

  return Auth
}

export default withNoAuth
