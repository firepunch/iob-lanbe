import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import  { Icons }  from '@/components'
import { getTranslation } from '@/i18n/index'

import endToEndIcon from '@/imgs/endtoend.png'
import insightIcon from '@/imgs/businessinsight.png'
import ourstoryIcon from '@/imgs/ourstory-growth.png'
import linkedInIcon from '@/imgs/linkedin.png'
import junhaImg from '@/imgs/junhanim.jpg'
import stayAheadIcon from '@/imgs/stay-ahead.png'
import realOutcomesIcon from '@/imgs/real-outcomes.png'
import growthIcon from '@/imgs/sustain-growth.png'

export default async function About({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'about')
  const approaches = t('approaches', { returnObjects: true }) as { title: string; desc: string }[]
  const ctas = t('ctas', { returnObjects: true }) as { type: string; title: string; link: string }[]
  const ceo_details = t('ceo-more-details', { returnObjects: true })  as { desc: string }[]
  const ceo_quote = t('ceo-quote', { returnObjects: true }) as []

  return (
    <div id="allwhite-nav">
      <main>

        {/* section 1: about first page */}
        <section id="about-firstpage">
          <p>{t('main-1')}<br/>{t('main-2')}<br/>{t('main-3')}</p>
          <h2>{t('about-us')}</h2>
        </section>
        {/* //section 1: about first page */}

        {/* section 2: about-how */}
        <section id="about-how">
          <div id="about-how-wrap">
            <div className="about-how-intro">
              <p>{t('intro-1')}</p>
              <p>{t('intro-2')}</p>
            </div>
            <div className="about-how-title">
              <h3>{t('how')}</h3>
            </div>
            <div className="about-how-answers">
              {/* line */}
              <div className="ah-answer ah-answer1">
                <Image src={endToEndIcon} alt="Digital Solutions" />
                <h5>{t('answer1-title')}</h5>
                <p>{t('answer1-desc')}</p>
              </div>
              <div className="ah-answer ah-answer2">
                <Image src={insightIcon} alt="Business Insights" />
                <h5>{t('answer2-title')}</h5>
                <p>{t('answer2-desc')}</p>
              </div>
            </div>
          </div>
        </section>
        {/* //section 2: about-how */}

        {/* section 3: our story */}
        <section id="our-story">
          <div id="our-story-wrap">
            <h3>{t('our-story')}</h3>
            <div className="our-story-slogan">
              <p>
                {t('our-story-slogan-1')}
                <br/> 
                <span>
                  {t('our-story-slogan-2')}
                </span><br/> 
                {t('our-story-slogan-3')}
              </p>
              <Image src={ourstoryIcon} alt="Growth" />
            </div>
            <div className="our-story-intro">
              <p>{t('our-story-intro-1')}</p>
              <p>{t('our-story-intro-2')}</p>
              <p>{t('our-story-intro-3')}</p>
            </div>
            {/* CEO */}
            <div id="our-story-ceo">
              {/* ceo detail and image */}
              <div className="ceo-detail-left">
                <div className="name-position">
                  <p>{t('name')}</p>
                  <p>{t('position')}</p>
                </div>
                <div className="bg-li">
                  <div className="bg">
                    <div className="bg">
                      <p>
                        {t('background-1')}
                      </p>
                      <p>
                        {t('background-2')}
                      </p>
                    </div>
                  </div>
          
                  <Link href="https://www.linkedin.com/in/junha-son-399550115">
                    <Image src={linkedInIcon} alt="LinkedIn" />
                  </Link>
                </div>
                <ul className="ceo-more-details">
                  {ceo_details?.map((item, idx) => (
                    <li key={idx}>{item.desc}</li>
                  ))}
                </ul>
              </div>
              <div className="ceo-detail-right">
                <Image src={junhaImg} alt="Junha Son" sizes="100vw" />
              </div>
              {/* //ceo detail and image */}
            </div>
            {/* //CEO */}
            {/* ceo quote */}
            <div className="ceo-quote">
              {ceo_quote?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {/* //ceo quote */}
          </div>
        </section>
        {/* //section 3: our story */}

        {/* section 4: our goals */}
        <section id="our-goals">
          <div id="our-goals-wrap">
            <h3>{t('our-goals')}</h3>

            <div className="three-goals">
              <div className="goal goal1">
                <Image src={stayAheadIcon} alt="Staying Ahead" />
                <h5>{t('staying-ahead-title')}</h5>
                <p>{t('staying-ahead-desc-1')}</p>
                <p>{t('staying-ahead-desc-2')}</p>
              </div>

              <div className="goal goal2">
                <Image src={realOutcomesIcon} alt="Real Business Outcomes" />
                <h5>{t('real-outcomes-title')}</h5>
                <p>{t('real-outcomes-desc-1')}</p>
                <p>{t('real-outcomes-desc-2')}</p>
              </div>

              <div className="goal goal3">
                <Image src={growthIcon} alt="Sustainable Growth" />
                <h5>{t('sustainable-growth-title')}</h5>
                <p>{t('sustainable-growth-desc-1')}</p>
                <p>{t('sustainable-growth-desc-2')}</p>
              </div>
            </div>
          </div>
        </section>
        {/* //section 4: our goals */}

        {/* section 5: our approach */}
        <section id="our-approach">
          <div id="our-approach-wrap">
            <h3>{t('approach_h3')}</h3>
            <div id="approach-papers">
              <div className="approach-papers-left">
                {approaches?.map((item, idx) => (
                  <div key={`approaches-${idx}`} className="approach1">
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* //section 5: our approach */}
      </main>

      {/* about page ctas */}
      <section id="about-ctas">
        {ctas?.map((item, idx) => (
          <div key={`ctas-${idx}`} className="ab-cta">
            <p className="ab-cta-title">{item.title}</p>
            <Link href={item.link}>
              <Icons type="arrowWhite" />
              <p>{t('see-all')}</p>
            </Link>
          </div>
        ))}
      </section>
      {/* //about page ctas */}
    </div>
  )
}
