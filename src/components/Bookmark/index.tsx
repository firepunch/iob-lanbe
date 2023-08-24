import Image from 'next/image'

import SaveImg from '@/imgs/save.png'
import SavedImg from '@/imgs/saved.png'
import SaveBlackImg from '@/imgs/save_black.png'
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
  const imgSrc = isBlack ? (
    isSaved ? SavedBlackImg : SaveBlackImg
  ) : (
    isSaved ? SavedImg : SaveImg
  )

  return (
    <div 
      className="save"
      onClick={e=> {
        e.preventDefault() 
        onToggle()
      }}
    >
      <Image src={imgSrc} alt="Save" />
    </div>
  )
}