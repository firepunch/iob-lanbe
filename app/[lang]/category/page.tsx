import { getContentsByCategory } from '@/api_gql'
import { Icons, Select } from '@/components'
import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'

import ArrowBlackDown from '@/imgs/arrow_black_down.png'

export default async function Category({
  params: { lang },
  searchParams: { name },
}: {
  params: { lang: ValidLocale; },
  searchParams: { name?: string }
}) {
  /**
  const categoryData = getContentsByCategory(nameQueryParam)
  const [category] = await Promise.all([categoryData])
  {category?.posts?.edges?.map(async ({ node }) => {
        console.log(node.title)
        // <p key={node.id}> {node.title}</p>
      })}
  */
  
  const { t: ct } = await getTranslation(lang, 'common')
  const { t } = await getTranslation(lang, 'category-page')
  const categoryName = name || 'all'

  const postData = getContentsByCategory(categoryName)
  const [posts] = await Promise.all([postData])
  console.log(posts)

  // category?.map(async ({ node }) => {
  //   if (node.name == nameQueryParam){
  //     const categoryId = node.id
  //     const ContentsByCategoryData = getContentsByCategory(categoryId)
  //     const [contents] = await Promise.all([ContentsByCategoryData])
  //     console.log(contents)
  //     {contents.posts?.edges?.map(({ node }) => (
  //       console.log(node.title)
  //       // <Link 
          
  //       //   key={node.id} 
  //       //   href={`/${encodeURIComponent(node.slug)}`}>
  //       //   <ContentCard
  //       //     thumbnail_url={node.featuredImage?.node.sourceUrl}
  //       //     {...node}
  //       //   />
  //       // </Link>
  //     ))}
  //   }
  // })

  return (
    <>
      <section id="subcateg-content-title">
        <div id="title-top">
          <div className="title-arrow">
            <div className="title-categ-subcateg">
              <p>{t('market_research')}</p>
              <h2>{t(categoryName).toUpperCase()}</h2>
            </div>

            <Image src={ArrowBlackDown} alt="Arrow" />
          </div>

          <div className="other-content-pages">
            <ul>
              <li className="main-categ">
                {t('market_research')}
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category', query: { name: 'market' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('market')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'corporate' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('corporate')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'consumer' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('consumer')}</p>
                </Link>
              </li>
            </ul>

            <ul>
              <li className="main-categ">                
                {t('market_entry')}
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'marketing' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('marketing')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'partnership' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('partnership')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'channel' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('channel')}</p>
                </Link>
              </li>
              <li className="sub-categ">
                <Link href={{ pathname: '/category',  query: { name: 'payment' } }}>
                  <Icons type="arrowBlack" />
                  <p>{t('payment')}</p>
                </Link>
              </li>
            </ul>

            <Link href={{ pathname: '/category' }} className="see-all">
              {t('see_all')}
            </Link>
          </div>

          {categoryName !== 'all' && (
            <div id="categ-description">
              <p>
                {t(`${categoryName}_desc`)}
              </p>
            </div>
          )}

          <div id="filters-sorting">
            <div className="filters">
              <button type="button" className="all-button">
                {ct('all')}
              </button>
              <button type="button" className="country-button">
                {ct('country')}
              </button>
            </div>

            <div className="sort">
              <label htmlFor="sortby">
                {ct('sort_by')}
              </label>
              <Select
                name="sortby" 
                id="sortby"
                options={ct('sort_options', { returnObjects: true }) }
              />
            </div>
          </div>
        </div>
      </section>

      {/* grid */}
      <section id="contents-grid">
        <div id="all-contents-wrap">
        </div>

        {/* pagination */}
        <div id="pagination">
          <button type="button" className="pagination-on-mobile">Load more</button>

          <a href="#" className="pagination-on-web">
            <a href="#" className="prev">Previous</a>
            <div className="page"><p>1-9 out of 5</p></div>
            <a href="#" className="next">Next</a>
          </a>
        </div>
        {/* //pagination */}

      </section>
      {/* //grid */}
    </>
  )
}
