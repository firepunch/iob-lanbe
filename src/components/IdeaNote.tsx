'use client'

import DeleteIcon from '@/imgs/delete_bin.png'
import EditIcon from '@/imgs/edit_pencil.png'
import AddIcon from '@/imgs/ideanote_add.png'
import BeigeBg from '@/imgs/ideanote_beige.png'
import LimeBg from '@/imgs/ideanote_lime.png'
import CheckIcon from '@/imgs/done_check.png'
import { ValidLocale } from '@/types'
import { dateFormat, isValidToken } from '@/utils/lib'
import Image from 'next/image'
import { useState } from 'react'

const translationJson = {
  en: {
    placeholder: 'Write down your ideas here.',
    content_required: 'Content is required.',
    notice: '*Idea notes are private, therefore not shared publicly. Maximum note length is 300 characters.',
    delete_confirm: 'Are you sure you want to delete this note?',
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  ko: {
    placeholder: '아이디어를 적어주세요.',
    content_required: '내용을 적어주세요.',
    notice: '*Idea notes are private, therefore not shared publicly. Maximum note length is 300 characters.',
    delete_confirm: '해당 노트를 삭제하시겠습니까?',
    save: '저장',
    delete: '삭제',
    cancel: '취소',
  },
}

type NoteType = 'add' | 'view' | 'edit' | 'added'

interface IIdeaNoteProps {
  type: NoteType
  lang: ValidLocale
  content?: string
  post_title?: string
  updated_at?: string
  onSubmit?: (value: string) => void
  onDelete?: () => void
}

const translate = {
  en: {
    login: 'Login required',
  }, 
  ko: {
    login: '로그인이 필요한 기능입니다.',
  },
}

export default function IdeaNote ({
  type,
  lang,
  content,
  post_title: postTitle,
  updated_at: updatedAt,
  onSubmit,
  onDelete,
}: IIdeaNoteProps) {
  const [noteType, setNoteType] = useState<NoteType>(type)
  const [value, setValue] = useState<string | undefined>(content)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleClickAdd = () => {
    if (isValidToken()) {
      setNoteType('edit')
    } else {
      alert(translate[lang].login)
    }
  }

  const handleUpdateNote = () => {
    if (!value) {
      alert(translationJson[lang].content_required)
      return
    }

    if (onSubmit) {
      setNoteType('added')
      onSubmit(value)
      setNoteType('add')
      setValue(undefined)
    }
  }

  const noteTypeComponent = {
    add: (
      <div className="ideanote ideanote-add" onClick={handleClickAdd}>
        <Image src={AddIcon} className="note note-bg" alt="Possible to add more than one idea notes" />
      </div>
    ),
    added: (
      <div className="ideanote ideanote-saved">
        <Image src={BeigeBg} className="note note-bg" alt="Idea note beige color" />
        <div className="note-saved">
          <Image src={CheckIcon} alt="Check" />
          <p>Your note has been saved!</p>
        </div>
      </div>
    ),
    edit: (
      <div className="ideanote ideanote-before">
        <Image src={BeigeBg} className="note note-bg" alt="Idea note beige color" />
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
        <button onClick={handleUpdateNote}>
          {translationJson[lang].save}
        </button>
      </div>
    ),
    view: (
      <div className="ideanote ideanote-after">
        <Image src={LimeBg} className="note note-bg" alt="Idea note lime color" />
        <p className="user-note">
          {value}
        </p>
        <p className="ideanote-content-title">
          {postTitle}
        </p>
        <p className="date">
          {updatedAt && dateFormat(updatedAt, true)}
        </p>
        <Image src={EditIcon} className="edit" alt="Edit" onClick={() => setNoteType('edit')}/>
        <Image src={DeleteIcon} className="delete" alt="Delete" onClick={() => setShowConfirmModal(true)} />

        {showConfirmModal && (
          <div className="delete-modal">
            <p>Are you sure you want to delete this note?</p>
              
            <div className="buttons-wrap">
              <button type="button">Cancel</button>
              <button type="button">Delete</button>
            </div>
          </div>
        )}
      </div>
    ),
  }
  
  return (
    <>
      {noteType === 'view' ? (
        <div className="ideanote ideanote-after">
          <Image src={LimeBg} className="note note-bg" alt="Idea note lime color" />
          <p className="user-note">
            {value}
          </p>
          <p className="ideanote-content-title">
            {postTitle}
          </p>
          <p className="date">
            {updatedAt && dateFormat(updatedAt, true)}
          </p>
          <Image src={EditIcon} className="edit" alt="Edit" onClick={() => setNoteType('edit')}/>
          <Image src={DeleteIcon} className="delete" alt="Delete" onClick={() => setShowConfirmModal(true)} />

          {showConfirmModal && (
            <div className="delete-modal">
              <p>{translationJson[lang].delete_confirm}</p>
              
              <div className="buttons-wrap">
                <button type="button" onClick={() => setShowConfirmModal(false)}>
                  {translationJson[lang].cancel}
                </button>
                <button type="button" onClick={onDelete}>
                  {translationJson[lang].delete}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : noteTypeComponent[noteType]}
    </>  
  )
}
