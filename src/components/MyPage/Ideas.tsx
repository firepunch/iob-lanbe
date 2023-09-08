'use client'
 
import useContentState from '@/stores/contentStore'
import Icons from '../Icons'
import { TI18N, ValidLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { deleteNote, fetchNotes, updateNote } from '@/api_wp'
import IdeaNote from '../IdeaNote'
import useUserState from '@/stores/userStore'

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
  const handleReload = async () => {
    const result = await fetchNotes({
      user_id: userId,
    })
    updateNotes(result)
  }

  useEffect(() => {
    handleReload()
  }, [])

  return (
    <>
      <div id="default-title" className="dt-no-buttons">
        <h2>{t('ideas').toUpperCase()}</h2>
      </div>

      {notes?.length ? (
        <section className="ideanotes-designs">
          {notes.map(item => (
            <IdeaNote
              {...item}
              type="view"
              key={item.id}
              noteId={item.id}
              userId={userId}
              onReload={handleReload}
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