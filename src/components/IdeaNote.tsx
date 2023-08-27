'use client'

import { ValidLocale } from '@/types'
import Image from 'next/image'
import BeigeBg from '@/imgs/ideanote_beige.png'
import AddIcon from '@/imgs/ideanote_add.png'
import LimeBg from '@/imgs/ideanote_lime.png'
import EditIcon from '@/imgs/edit_pencil.png'
import DeleteIcon from '@/imgs/delete_bin.png'
import { useState } from 'react'

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

type NoteType = 'add' | 'view' | 'edit'

interface IIdeaNoteProps {
  type: NoteType
  lang: ValidLocale
  onSubmit?: (value: string) => void
}

export default function IdeaNote ({
  type,
  lang,
  onSubmit,
}: IIdeaNoteProps) {
  const [noteType, setNoteType] = useState<NoteType>(type)
  const [value, setValue] = useState<string>()

  return (
    <>
      {noteType === 'add' ? (
        <div className="ideanote ideanote-add" onClick={() => setNoteType('edit')}>
          <Image src={AddIcon} className="note" alt="Possible to add more than one idea notes" />
        </div>
      ) : noteType === 'edit' ? (
        <div className="ideanote ideanote-before">
          <Image src={BeigeBg} className="note note-beige-bg" alt="Idea note beige color" />
          <textarea 
            rows={4}
            maxLength={300}
            className="ideanote-input"
            name="ideanote"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={
              translationJson[lang].placeholder + '\n' + translationJson[lang].notice
            }
          />
          <button onClick={() => onSubmit && value && onSubmit(value)}>
            {translationJson[lang].save}
          </button>
        </div>
      ) : noteType === 'view' ? (
        <div id="ideanote-after">
          <Image src={LimeBg} className="note" alt="Idea note lime color" />
          <p className="user-note">
                Faucibus pulvinar vitae nec enim laoreet sapien elit cras mauris. Sed fames neque lacinia hac elementum
                lacinia sed nec. Ultricies morbi risus risus eu eu odio cursus. Integer aenean consequat risus aliquam
                ultricies. Commodo magna ut non velit vel egestas consectetur. Tincidunt quisque aliquet nun.
          </p>
          <p className="ideanote-content-title">
                #BORNA: A clothing brand
                that uses sticks as material
          </p>
          <p className="date">
                2023.07.25
          </p>
          <Image src={EditIcon} className="edit" alt="Edit" />
          <Image src={DeleteIcon} className="delete" alt="Delete" />
        </div>
      ) : null}
    </>  
  )
}
