'use client'
 
import useContentState from '@/stores/contentStore'
import Icons from '../Icons'
import { TI18N, ValidLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { deleteNote, fetchNotes, updateNote } from '@/api_wp'
import IdeaNote from '../IdeaNote'

export default function Ideas({
  t,
  lang,
  userId,
}: {
  t: TI18N
  lang: ValidLocale
  userId: number
}) {
  const { notes, updateNotes } = useContentState(state => state)

  useEffect(() => {
    fetchNotes({
      user_id: userId,
    }).then(result => {
      updateNotes(result)
    })
  }, [])

  const handleUpdateNote = async (noteId: number, content: string) => {
    try {
      await updateNote({
        note_id: noteId,
        content,
      })
      const result = await fetchNotes({
        user_id: userId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote({ 
        note_id: noteId,
      })
      const result = await fetchNotes({
        user_id: userId,
      })
      updateNotes(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div id="default-title" className="dt-no-buttons">
        <h2>{t('ideas').toUpperCase()}</h2>
      </div>

      {notes?.length ? (
        <section className="ideanotes-designs">
          {notes.map(item => (
            <IdeaNote
              key={item.id}
              type="view"
              lang={lang}
              onSubmit={value => handleUpdateNote(item.id, value)}
              onDelete={() => handleDeleteNote(item.id)}
              {...item}
            />
          ))}
        </section>
      ) : (
        <div id="default-text">
          <p className="none-saved-text">{t('ideas_none')}</p>
          <p className="explore-text">{t('ideas_explore')}</p>

          <Link href={{ pathname: `/${lang}/category` }}>
            <Icons type="arrowBlack" />
            <p>{t('see-all')}</p>
          </Link>
        </div>
      )}
    </>
  )
}