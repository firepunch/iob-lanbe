import Link from 'next/link'
import { ITags } from '@/types/store'
import { ValidLocale } from '@/types'

const Tags = ({
  lang,
  tags,
}: {
  lang: ValidLocale
  tags: ITags
}) => (
  <div className="tags">
    {tags.edges?.map(({ node }) => (
      <Link 
        key={node.id}
        href={`/${lang}/search/${node.name}`}
        className="indiv-tag"
      >
        {node.name}
      </Link>
    ))}
  </div>
)

export default Tags