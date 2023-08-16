import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'
import { IReport } from '@/types/store'

interface ReportCardProps extends IReport {
  onToggleBookmark: () => void;
}

export const ReportCard = ({
  featuredImage,
  databaseId,
  slug,
  name,
  shortDescription,
  lanbeContent: { is_save },
  onToggleBookmark,
}: ReportCardProps) => {
  return (
    <Link href={`/${encodeURIComponent(slug)}`}>
      <div className="indiv-report i-r-1">
        <div className="thumbnail">
          <Bookmark 
            contentId={databaseId} 
            isSaved={is_save} 
            onToggle={onToggleBookmark}
          />
    
          {featuredImage && (
            <Image 
              src={featuredImage.node.sourceUrl} 
              alt={featuredImage.node.altText}
              sizes="100vw"
              fill={true}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>

        <p className="indiv-report-title">
          {name}
        </p>

        <p className="report-description">
          {shortDescription}
        </p>
      </div>
    </Link>
  )
}
