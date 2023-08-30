import Image from 'next/image'

import SaveImg from '@/imgs/save.png'
import SavedImg from '@/imgs/saved.png'
import SaveBlackImg from '@/imgs/save_black.png'
import SavedBlackImg from '@/imgs/saved_black.png'
import { isValidToken } from '@/utils/lib'

export default function Bookmark({
  isBlack = false,
  isSaved = false,
  onToggle,
}: {
  isBlack?: boolean
  isSaved?: boolean
  onToggle: () => void
}) {
  const imgSrc = isBlack ? (
    isSaved ? SavedBlackImg : SaveBlackImg
  ) : (
    isSaved ? SavedImg : SaveImg
  )

  const handleClick = e => {
    e.preventDefault() 
    
    if (isValidToken()) {
      onToggle()
    } else {
      alert('로그인이 필요한 기능입니다.')
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