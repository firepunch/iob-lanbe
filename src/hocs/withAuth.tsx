import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { AUTH_TOKEN, getStorageData } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const [userData] = getStorageData(AUTH_TOKEN)
    const router = useRouter()

    if (!userData?.authToken || !userData?.user?.databaseId) {
      return router.replace('/sign-in')
    }

    return <Component {...props} />
  }

  return Auth
}

export default withAuth
