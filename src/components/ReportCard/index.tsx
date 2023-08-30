import { IReport } from '@/types/store'
import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'

interface ReportCardProps extends IReport {
  onToggleBookmark: () => void;
}

export const ReportCard = ({
  featuredImage,
  databaseId,
  slug,
  title,
  excerpt,
  lanbeContent: { is_save },
  onToggleBookmark,
}: ReportCardProps) => {
  return (
    <Link href={`/report/${encodeURIComponent(slug)}`}>
      <div className="indiv-report i-r-1">
        <div className="thumbnail">
          <Bookmark 
            isSaved={is_save} 
            onToggle={onToggleBookmark}
          />
    
          {featuredImage && (
            <Image 
              src={featuredImage.node.sourceUrl} 
              alt={featuredImage.node.altText}
            />
          )}
        </div>

        <p className="indiv-report-title">
          {title}
        </p>

        <p className="report-description">
          {excerpt.replace(/(\<p\>)|(\<\/p\>)/gi, '')}
        </p>
      </div>
    </Link>
  )
}
