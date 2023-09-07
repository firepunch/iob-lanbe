import { IReport } from '@/types/store'
import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'

interface ReportCardProps extends IReport {
  metaKey: string;
  onFetchData: () => void;
}

export const ReportCard = ({
  featuredImage,
  databaseId,
  metaKey,
  slug,
  title,
  excerpt,
  lanbeContent,
  onFetchData,
}: ReportCardProps) => {
  return (
    <div className="indiv-report i-r-1">
      <Link href={`/report/${encodeURIComponent(slug)}`}>
        <div className="thumbnail">
          {featuredImage ? (
            <Image 
              src={featuredImage.node.sourceUrl} 
              alt={featuredImage.node.altText || 'ReportCard Image'}
              sizes="100vw"
              fill={true}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
          <Bookmark
            isSaved={lanbeContent?.is_save} 
            metaKey={metaKey}
            contentId={databaseId}
            onFetchData={onFetchData}
          />
        </div>
        <p className="indiv-report-title">
          {title}
        </p>

        <p className="report-description">
          {excerpt?.replace(/(\<p\>)|(\<\/p\>)/gi, '')}
        </p>
      </Link>
    </div>
  )
}
