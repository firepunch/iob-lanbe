import { ValidLocale } from '@/types'

interface IIdeaNoteProps {
  lang: ValidLocale
}

const translationJson = {
  en: {
    placeholder: 'Write down your ideas here.',
    save: 'Save',
  },
  ko: {
    placeholder: '아이디어를 적어주세요.',
    save: '저장',
  },
}

export default function IdeaNote ({
  lang,
}: IIdeaNoteProps) {

  return (
    <div className="idea-note-1">
      <textarea 
        rows={4}
        className="idea-note-input"
        name="ideanote"
        placeholder={translationJson[lang].placeholder}
      />
      <button>{translationJson[lang].save}</button>
    </div>
  )
}
