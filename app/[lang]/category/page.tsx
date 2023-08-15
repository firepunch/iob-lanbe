'use client'

import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import { Button, PostCard, PageHeading, Select, Icons } from '@/components'
import { getContents, getAllCategories, getContentsByCategory } from '@/api_gql'
import { useRouter } from 'next/navigation'

import ArrowBlackDown from '@/imgs/arrow_black_down.png'
import { useEffect, useState } from 'react'

export default  function Category({
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
  
  const [data, setData] = useState([])
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'category-page')
  const categoryName = name || 'all'

  useEffect(() => {
    // lang.toUpperCase()
    getContentsByCategory(categoryName).then(data => {
      console.log(data)
      setData(data)
    })
  }, [])

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
      {/* title, other content pages, filter, sorting */}
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
      {/* //title, other content pages, filter, sorting */}

      {/* grid */}
      <section id="contents-grid">
        <div id="all-contents-wrap">

          <PostCard 
          
          />
          {/* 1 */}
          <div className="indiv-content i-c-1">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
            </div>
          </div>

          {/* 2 */}
          <div className="indiv-content i-c-2">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Long Long Tag</div>
            </div>
          </div>

          {/* 3 */}
          <div className="indiv-content i-c-3">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
            </div>
          </div>

          {/* 4 */}
          <div className="indiv-content i-c-4">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Long Long Tag</div>
            </div>
          </div>

          {/* 5 */}
          <div className="indiv-content i-c-5">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Tag</div>
            </div>
          </div>

          {/* 6 */}
          <div className="indiv-content i-c-6">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Long Long Tag</div>
            </div>
          </div>

          {/* 7 */}
          <div className="indiv-content i-c-7">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
            </div>
          </div>

          {/* 8 */}
          <div className="indiv-content i-c-8">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
              <div className="indiv-tag">Long Tag</div>
              <div className="indiv-tag">Long Long Tag</div>
            </div>
          </div>

          {/* 9 */}
          <div className="indiv-content i-c-9">
            <div className="thumbnail">
              <div className="save">
                <img src="./imgs/save.png" alt="Save"/>
              </div>
            </div>

            <div className="location-date">
              <div className="country">
                <img src="./imgs/locationicon_black.png" alt="Location icon"/>
                <p>COUNTRY</p>
              </div>

              <p className="date">23.07.25</p>
            </div>

            <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
            </a>

            <div className="tags">
              <div className="indiv-tag">Tag</div>
            </div>
          </div>
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
