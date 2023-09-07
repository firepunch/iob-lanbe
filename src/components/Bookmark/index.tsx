import useUserState from '@/stores/userStore'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import SaveImg from '@/imgs/save.png'
import SaveBlackImg from '@/imgs/save_black.png'
import SavedImg from '@/imgs/saved.png'
import SavedBlackImg from '@/imgs/saved_black.png'
import { createWatchList, removeWatchList } from '@/api_wp'
import { useState } from 'react'

export default function Bookmark({
  isBlack = false,
  isSaved = false,
  metaKey = '',
  contentId = 0,
  onFetchData,
}: {
  isBlack?: boolean
  isSaved: boolean
  metaKey: string
  contentId: number
  onFetchData: () => void
}) {
  const [isProcess, setIsProcess] = useState(false)
  const { user } = useUserState(state => state)
  const router = useRouter()
  const params = useParams()
  const imgSrc = isBlack ? (
    isSaved ? SavedBlackImg : SaveBlackImg
  ) : (
    isSaved ? SavedImg : SaveImg
  )

  const handleClick = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (isProcess) return
    setIsProcess(true)
    
    if (user.databaseId && contentId) {
      try {
        if (isSaved) {
          await removeWatchList({
            type: metaKey,
            content_id: contentId,
            user_id: user.databaseId,
          })
        } else {
          await createWatchList({
            type: metaKey,
            content_id: contentId,
            user_id: user.databaseId,
          })
        }

        if (onFetchData) onFetchData()
      } catch (err) {
        console.log(err)
      }
    } else {
      router.replace(`/${params?.lang || 'en'}/sign-in`)
    }

    setIsProcess(false)
  }

  return (
    <div className="save" onClick={handleClick}>
      <Image src={imgSrc} alt="Save" />
    </div>
  )
}