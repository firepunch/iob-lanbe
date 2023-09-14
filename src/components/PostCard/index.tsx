'use client'

import { IPost } from '@/types/store'
import { dateFormat, getCountry } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'
import LocationBlackImg from '@/imgs/locationicon_black.png'
import Tags from '../Tags'
import { useParams } from 'next/navigation'
import { ValidLocale } from '@/types'

interface PostCardProps extends IPost {
  onFetchData: (ids?: string[]) => void
}

export const PostCard = ({
  featuredImage,
  databaseId,
  slug,
  title = '',
  date = '',
  country,
  lanbeContent: { is_save },
  categories,
  tags,
  onFetchData,
}: PostCardProps) => {
  const params = useParams()
  const lang = params?.lang || 'en' as ValidLocale

  return (
    <Link href={`/${lang}/content/${encodeURIComponent(slug)}`}>
      <div className="indiv-content">
        <div className="thumbnail">
          {featuredImage ? (
            <Image 
              src={featuredImage?.node.sourceUrl} 
              alt={featuredImage?.node.altText || 'PostCard Image'}
              sizes="100vw"
              fill={true}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
          <Bookmark
            isSaved={is_save} 
            metaKey={`post_${lang}`}
            contentId={databaseId}
            onFetchData={onFetchData}
          />
        </div>

        <div className="location-date">
          <div className="country">
            <Image src={LocationBlackImg} alt="Location icon" />
            <p>{country || getCountry(categories)?.toUpperCase()}</p>
          </div>

          <p className="date">
            {dateFormat(date)}
          </p>
        </div>

        <p className="indiv-content-title">
          {title}
        </p>

        {tags?.edges && (
          <Tags 
            maxLength={4}
            lang={lang as ValidLocale} 
            tags={tags} />
        )}
      </div>
    </Link>
  )
}
