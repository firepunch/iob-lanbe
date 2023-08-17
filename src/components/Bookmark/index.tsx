import Image from 'next/image'

import SaveImg from '@/imgs/save.png'
import SavedImg from '@/imgs/save_white_fill.png'
import SaveBlackImg from '@/imgs/save_black.png'

export default function Bookmark({
  isSaved = false,
  onToggle,
}: {
  isSaved: boolean
  onToggle: () => void
}) {
  return (
    <div 
      className="save"
      onClick={e=> {
        e.preventDefault() 
        onToggle()
      }}
    >
      <Image src={isSaved ? SavedImg : SaveImg} alt="Save" />
    </div>
  )
}