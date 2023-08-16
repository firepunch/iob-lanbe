'use client'

import Image from 'next/image'
import Link from 'next/link'
import { dateFormat } from '@/utils/lib'

import SaveImg from '@/imgs/save.png'
import LocationBlackImg from '@/imgs/locationicon_black.png'
import { createWatchList } from '@/api_wp'
import { id } from 'date-fns/locale'
import { error } from 'console'

interface PostCardProps {
  thumbnail?: {sourceUrl: string; altText: string};
  tags?: {nodes: {id: string; name: string}[]};
  lanbePost: {is_save: boolean; country: string};
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  country: string;
  onClick?: () => void;
  onSave?: () => void;
}

export const PostCard = ({
  thumbnail,
  tags,
  databaseId,
  slug,
  title = '',
  date = '',
  lanbePost: { is_save, country },
  onClick,
  onSave,
  ...props
}: PostCardProps) => {
  
  const handleWatchList = async (e) => {
    e.preventDefault()

    try {
      await createWatchList({
        content_id: databaseId,
        type: 'post',
      })
    } catch (err) {
      console.log(err)
      alert('저장 실패')
    }
  }
  
  return (
    <Link href={`/${encodeURIComponent(slug)}`}>
      <div className="indiv-content">
        <div className="thumbnail">
          {thumbnail && <Image src={thumbnail.sourceUrl} alt={thumbnail.altText} />}
          <div className="save" onClick={handleWatchList}>
            <Image src={SaveImg} alt="Save" />
          </div>
        </div>

        <div className="location-date">
          <div className="country">
            <Image src={LocationBlackImg} alt="Location icon" />
            <p>{country.toUpperCase()}</p>
          </div>

          <p className="date">
            {dateFormat(date)}
          </p>
        </div>

        <p className="indiv-content-title">
          {title}
        </p>

        {tags?.nodes?.length && (
          <div className="tags">
            {tags.nodes.map(item => (
              <div key={item.id} className="indiv-tag">
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
