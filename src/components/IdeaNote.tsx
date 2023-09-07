'use client'

import useUserState from '@/stores/userStore'
import { TStringObj, ValidLocale } from '@/types'
import { dateFormat } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createNote, createWatchList, deleteNote, fetchNotes, removeWatchList, updateCountView, updateNote } from '@/api_wp'

import DeleteIcon from '@/imgs/delete_bin.png'
import CheckIcon from '@/imgs/done_check.png'
import EditIcon from '@/imgs/edit_pencil.png'
import AddIcon from '@/imgs/ideanote_add.png'
import BeigeBg from '@/imgs/ideanote_beige.png'
import LimeBg from '@/imgs/ideanote_lime.png'

const translationJson: any = {
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
    placeholder: '여기에 아이디어를 적어보세요.',
    content_required: '내용을 적어주세요.',
    notice: '* 아이디어 노트는 개인 기록용이며, 외부에 공개되지 않습니다. 한글 기준 최대 150자까지 입력 가능합니다.',
    delete_confirm: '해당 노트를 삭제하시겠습니까?',
    save: '저장',
    delete: '삭제',
    cancel: '취소',
  },
}

type NoteType = 'view' | 'edit' 

export default function IdeaNote ({
  type,
  noteId = 0,
  userId = 0,
  postId = 0,
  content,
  post_title: postTitle,
  post_name: postSlug,
  updated_at: updatedAt,
  onReload,
}: {
  type: NoteType
  noteId?: number
  userId?: number
  postId?: number
  content?: string
  post_title?: string
  post_name?: string
  updated_at?: string
  onReload: () => void
}) {
  const params = useParams()
  const lang = params?.lang || 'en' as ValidLocale
  const [t, setT] = useState(translationJson[lang as string])

  const [noteType, setNoteType] = useState<NoteType>(type)
  const [value, setValue] = useState<string | undefined>(content)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  useEffect(() => {
    const lang = params?.lang || 'en' as ValidLocale
    setT(translationJson[lang as string])
  }, [params])

  useEffect(() => {
    setValue(content)
  }, [content])

  const handleSave = async () => {
    if (!value) {
      alert(t.content_required)
      return
    }

    try {
      if (noteId) {
        await updateNote({
          note_id: noteId,
          content: value,
        })
      } else {
        await createNote({
          user_id: userId,
          post_id: postId,
          content: value,
        })
      }
      onReload()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteNote({ 
        note_id: noteId,
      })
      onReload()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {noteType === 'edit' ? (
        <div className="ideanote ideanote-edit">
          <textarea 
            maxLength={300}
            className="textarea"
            name="ideanote"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {!value && (
            <div className="placeholder">
              <p className="title">{t.placeholder}</p>
              <p className="desc">{t.notice}</p>
            </div>
          )}

          <div className="footer">
            <span />
            <button className="save-btn" onClick={handleSave}>
              {t.save}
            </button>
          </div>
        </div>
      ) : noteType === 'view' ? (
        <div className="ideanote ideanote-view">
          <p className="user-note">
            {value}
          </p>

          <div className="footer">
            <div >
              <p className="title">
                {postSlug ? (
                  <Link href={`/${lang}/content/${postSlug}`}>
                    {postTitle}
                  </Link>
                ) : (
                  postTitle
                )}
              </p>

              <p className="date">
                {updatedAt && dateFormat(updatedAt, true)}
              </p>
            </div>

            <div className="footer-icons">
              <Image 
                src={EditIcon}
                className="icon"
                alt="Edit"
                onClick={() => setNoteType('edit')}
              />
              <Image 
                src={DeleteIcon}
                className="icon"
                alt="Delete"
                onClick={() => setShowConfirmModal(true)} 
              />
              {showConfirmModal && (
                <div className="delete-modal">
                  <p>{t.delete_confirm}</p>
              
                  <div className="buttons-wrap">
                    <button type="button" onClick={() => setShowConfirmModal(false)}>
                      {t.cancel}
                    </button>
                    <button type="button" onClick={handleDelete}>
                      {t.delete}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )  : null}
    </>  
  )
}
