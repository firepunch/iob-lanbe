import { redirect } from 'next/navigation'
import { AUTH_TOKEN, getStorageData } from './lib'

export default function protectedPage() {
  const userData = getStorageData(AUTH_TOKEN)
  console.log(!userData?.authToken || !userData?.user.databaseId)

  if (!userData?.authToken || !userData?.user.databaseId) {
    // redirect('/sign-in')
  }
}
