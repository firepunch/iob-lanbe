import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN, getStorageData } from '../utils/lib'

const withNoAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const { user, updateUser } = useUserState(state => state)
    const [storageUser] = getStorageData(AUTH_TOKEN)
    const { back } = useRouter()

    useEffect(() => {
      if (storageUser && !user) {
        updateUser(storageUser as IResponseUser)
      }
      
      if (storageUser || user) {
        back()
      }
    }, [user, storageUser, updateUser, back])

    return <Component {...props} />
  }

  return Auth
}

export default withNoAuth
