import Image from 'next/image'
import Link from 'next/link'
import { dateFormat } from '@/utils/lib'

import SaveImg from '@/imgs/save.png'
import LocationBlackImg from '@/imgs/locationicon_black.png'

interface PostCardProps {
  thumbnail?: {sourceUrl: string; altText: string};
  tags?: {nodes: {id: string; name: string}[]};
  lanbePost: {is_save: boolean; country: string};
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
  slug,
  title = '',
  date = '',
  lanbePost: { is_save, country },
  onClick,
  onSave,
  ...props
}: PostCardProps) => {
  return (
    <Link href={`/${encodeURIComponent(slug)}`}>
      <div className="indiv-content">
        <div className="thumbnail">
          {thumbnail && <Image src={thumbnail.sourceUrl} alt={thumbnail.altText} />}
          <div className="save">
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
