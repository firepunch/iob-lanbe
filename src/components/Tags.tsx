import Link from 'next/link'
import { ITags } from '@/types/store'
import { ValidLocale } from '@/types'

const Tags = ({
  maxLength = undefined,
  lang,
  tags,
}: {
  maxLength?: number
  lang: ValidLocale
  tags: ITags
}) => (
  <div className="tags">
    {(tags.edges?.slice(0, maxLength))?.map(({ node }) => (
      <Link 
        key={node.id}
        href={`/${lang}/search/${node.name}`}
        className="indiv-tag"
      >
        {node.name}
      </Link>
    ))}
    {maxLength && tags.edges?.length > maxLength && (
      <span className="indiv-tag">+</span>
    )}
  </div>
)

export default Tags