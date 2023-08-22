import BeigeImg from '@/imgs/ideanote_beige.png'
import Image from 'next/image'

interface IIdeaNoteProps {
}

export default function IdeaNote ({
  
}: IIdeaNoteProps) {
  return (
    <div className="idea-note-1">
      <Image src={BeigeImg} alt="Beige Bg" />
      <input type="text" id="ideanote" name="ideanote" placeholder="Write down your ideas here."/>
      <button>Save</button>
    </div>
  )
}
