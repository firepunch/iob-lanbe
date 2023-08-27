import { ValidLocale } from '@/types'
import Image from 'next/image'
import BeigeBg from '@/imgs/ideanote_beige.png'
import AddIcon from '@/imgs/ideanote_add.png'

interface IIdeaNoteProps {
  type: 'add' | 'view' | 'edit'
  lang: ValidLocale
}

const translationJson = {
  en: {
    placeholder: 'Write down your ideas here.',
    notice: '*Idea notes are private, therefore not shared publicly. Maximum note length is 300 characters.',
    save: 'Save',
  },
  ko: {
    placeholder: '아이디어를 적어주세요.',
    notice: '*Idea notes are private, therefore not shared publicly. Maximum note length is 300 characters.',
    save: '저장',
  },
}

export default function IdeaNote ({
  type,
  lang,
}: IIdeaNoteProps) {

  return (
    <>
      {type === 'add' ? (
        <div className="ideanote ideanote-add">
          <Image src={AddIcon} className="note" alt="Possible to add more than one idea notes" />
        </div>
      ) : (
        <div className="ideanote ideanote-before">
          <Image src={BeigeBg} className="note note-beige-bg" alt="Idea note beige color" />
          <textarea 
            rows={4}
            maxLength={300}
            className="ideanote-input"
            name="ideanote"
            placeholder={
              translationJson[lang].placeholder + '\n' + translationJson[lang].notice
            }
          />
          <button>{translationJson[lang].save}</button>
        </div>
      )}
    </>  
  )
}
