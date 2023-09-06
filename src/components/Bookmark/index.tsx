import useUserState from '@/stores/userStore'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import SaveImg from '@/imgs/save.png'
import SaveBlackImg from '@/imgs/save_black.png'
import SavedImg from '@/imgs/saved.png'
import SavedBlackImg from '@/imgs/saved_black.png'

export default function Bookmark({
  isBlack = false,
  isSaved = false,
  onToggle,
}: {
  isBlack?: boolean
  isSaved?: boolean
  onToggle: () => void
}) {
  const { user } = useUserState(state=>state)
  const router = useRouter()
  const params = useParams()
  const imgSrc = isBlack ? (
    isSaved ? SavedBlackImg : SaveBlackImg
  ) : (
    isSaved ? SavedImg : SaveImg
  )

  const handleClick = e => {
    e.preventDefault() 
    
    if (user.databaseId) {
      onToggle()
    } else {
      router.replace(`/${params?.lang || 'en'}/sign-in`)
    }
  }

  return (
    <div 
      className="save"
      onClick={handleClick}
    >
      <Image src={imgSrc} alt="Save" />
    </div>
  )
}