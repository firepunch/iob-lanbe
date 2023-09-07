import useUserState from '@/stores/userStore'
import { IResponseUser } from '@/types/store'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN, getStorageData, removeStorageData } from '../utils/lib'
import { fetchUser } from '@/api_wp'
import { authUser } from '@/api_gql'

const withAuth = (Component: NextComponentType) => {
  const Auth = props => {
    const { user, resetUser, updateUser } = useUserState(state => state)
    const [storageUser] = getStorageData(AUTH_TOKEN)
    const { replace } = useRouter()

    useEffect(() => {
      if (storageUser?.user && user?.databaseId === 0) {
        updateUser(storageUser as IResponseUser)
      }
    
      if (user?.databaseId === 0) {
        replace(`/sign-in`)
      }

      // TODO Valid with server
      // if (user?.databaseId) {
      //   authUser(user.databaseId).then(result => {
      //     if (result === null) {
      //       replace(`/sign-in`)
      //       resetUser()
      //       removeStorageData(AUTH_TOKEN)
      //     }
      //   })
      // }
    }, [user, storageUser, updateUser, replace])

    return <Component {...props} />
  }

  return Auth
}

export default withAuth
