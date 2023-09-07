import { IReport } from '@/types/store'
import Image from 'next/image'
import Link from 'next/link'
import Bookmark from '../Bookmark'
import { useParams } from 'next/navigation'
import { ValidLocale } from '@/types'

interface ReportCardProps extends IReport {
  onFetchData: (ids?: string[]) => void
}

export const ReportCard = ({
  featuredImage,
  databaseId,
  slug,
  title,
  excerpt,
  lanbeContent: { is_save },
  onFetchData,
}: ReportCardProps) => {
  const params = useParams()
  const lang = params?.lang || 'en' as ValidLocale

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
            isSaved={is_save} 
            metaKey={`report_${lang}`}
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
