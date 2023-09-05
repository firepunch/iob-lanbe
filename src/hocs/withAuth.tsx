import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN, getStorageData } from '../utils/lib'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const { user, updateUser } = useUserState(state => state)
    const [storageUser] = getStorageData(AUTH_TOKEN)
    const { replace } = useRouter()

    useEffect(() => {
      if (!storageUser && !user) {
        replace('/sign-in')
      }
    }, [user, storageUser, updateUser, replace])

    if (storageUser && !user) {
      updateUser(storageUser as IResponseUser)
    }

    return <Component {...props} />
  }

  return Auth
}

export default withAuth
