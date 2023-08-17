'use client'

import { IPost } from '@/types/store'
import { dateFormat } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'
import LocationBlackImg from '@/imgs/locationicon_black.png'

interface PostCardProps extends IPost {
  onToggleBookmark: () => void;
}

export const PostCard = ({
  featuredImage,
  tags,
  databaseId,
  slug,
  title = '',
  date = '',
  lanbeContent: { is_save, country },
  onToggleBookmark,
}: PostCardProps) => {
  return (
    <Link href={`/${encodeURIComponent(slug)}`}>
      <div className="indiv-content">
        <div className="thumbnail">
          {featuredImage && (
            <Image 
              src={featuredImage.node.sourceUrl} 
              alt={featuredImage.node.altText}
              sizes="100vw"
              fill={true}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <Bookmark 
            contentId={databaseId} 
            isSaved={is_save} 
            onToggle={onToggleBookmark}
          />
        </div>

        <div className="location-date">
          <div className="country">
            <Image src={LocationBlackImg} alt="Location icon" />
            <p>{country?.toUpperCase()}</p>
          </div>

          <p className="date">
            {dateFormat(date)}
          </p>
        </div>

        <p className="indiv-content-title">
          {title}
        </p>

        {tags?.nodes && (
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
