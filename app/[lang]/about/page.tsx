import { ValidLocale } from '@/i18n/settings'
import Image from 'next/image'
import Link from 'next/link'
import  { Icons }  from '@/components'
import { getTranslation } from '@/i18n/index'

import endToEndIcon from '@/imgs/endtoend.png'
import insightIcon from '@/imgs/businessinsight.png'
import ourstoryIcon from '@/imgs/ourstory-growth.png'
import linkedInIcon from '@/imgs/linkedin.png'
import junhaIcon from '@/imgs/junhanim.jpg'
import stayAheadIcon from '@/imgs/stay-ahead.png'
import realOutcomesIcon from '@/imgs/real-outcomes.png'
import growthIcon from '@/imgs/sustain-growth.png'

export default async function About({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')

  return (
    <div id="allwhite-nav">
      <main>

        {/* section 1: about first page */}
        <section id="about-firstpage">
          <p>
            We provide end-to-end digital solutions and business insights optimized for the Southeast Asian Market.
          </p>
          <h2>ABOUT US</h2>
        </section>
        {/* //section 1: about first page */}

        {/* section 2: about-how */}
        <section id="about-how">
          <div id="about-how-wrap">
            <div className="about-how-intro">
              <p>
                We collaborate with companies that are newly entering the Southeast Asian market, expanding their businesses to new countries within Southeast Asia or devising new growth strategies within the region.
              </p>
                    
              <p>
                Leveraging our expertise in Southeast Asia, we assemble teams tailored to the specific goals and challenges of each company to execute projects effectively.
              </p>
            </div>
            <div className="about-how-title">
              <h3>HOW?</h3>
            </div>
            <div className="about-how-answers">
              {/* line */}
              <div className="ah-answer ah-answer1">
                <Image src={endToEndIcon} alt="Digital Solutions" />
                <h5>End-to-End<br/>Digital Solutions</h5>
                <p>
                We establish and implement digital strategies for all stages, including market research, strategy formulation, branding, design, development, and marketing.
                </p>
              </div>
              <div className="ah-answer ah-answer2">
                <Image src={insightIcon} alt="Business Insights" />
                <h5>Business<br/>Insight</h5>
                <p>
                We offer curated business content and reports by deriving insights from the social, economic, and cultural backgrounds and trends in Southeast Asia.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* //section 2: about-how */}

        {/* section 3: our story */}
        <section id="our-story">
          <div id="our-story-wrap">
            <h3>OUR STORY</h3>
            <div className="our-story-slogan">
              <p>
                Your partner for<br/> <span>Sustainable Business Growth</span><br/> in Southeast Asia.
              </p>
              <Image src={ourstoryIcon} alt="Growth" />
            </div>
            <div className="our-story-intro">
              <p>
                We have initiated collaborations with numerous experts from various fields to understand business trends based on different environments across Southeast Asia.
              </p>
              <p>
                I.O.B works alongside experts from different fields, including strategies, business development, sales, marketing, design, and development, across multiple Southeast Asian countries.
              </p>
              <p>
                We collaborate on content production, form teams tailored to the goals and challenges of our clients, and undertake diverse tasks together.
              </p>
            </div>
            {/* CEO */}
            <div id="our-story-ceo">
              {/* ceo detail and image */}
              <div className="ceo-detail-left">
                <div className="name-position">
                  <p>Junha Son</p>
                  <p>Founder</p>
                </div>
                <div className="bg-li">
                  <div className="bg">
                    <p>Ex-Google & Startup</p>
                    <p>Yonsei School of Business</p>
                  </div>
                  
                  <Link href={{ pathname: `/` }}>
                    <Image src={linkedInIcon} alt="LinkedIn" />
                  </Link>

                </div>
                <ul className="ceo-more-details">
                  <li>Sales Strategies for the Global Market</li>
                  <li>Partnership Development in APAC Markets</li>
                  <li>K-POP Marketing for the Global Market</li>
                  <li>Consumer Goods Export to APAC Markets</li>
                  <li>Web-based B2B Product Management</li>
                </ul>
              </div>
              <div className="ceo-detail-right">
                <Image src={junhaIcon} alt="Junha Son" />
              </div>
              {/* //ceo detail and image */}
            </div>
            {/* //CEO */}
            {/* ceo quote */}
            <div className="ceo-quote">
              <p>
                “For businesses to achieve growth, I believe that it is essential to understand the macro-level context supporting that growth. Southeast Asia has been garnering global attention due to its rapid economic growth. With its large population base, various factors such as the spread of digital technology, increasing purchasing power, and infrastructure expansion are driving growth in the region.
              </p>
              <p>
                Many companies have already entered the Southeast Asian market in search of diverse business opportunities. Information and language barriers have largely diminished, and numerous agencies are assisting with market entry. However, achieving successful establishment and growth in the market remains a challenge; developing and implementing strategies and organizations that are tailored to the specific region remains a challenging task for companies.
              </p>
              <p>
                To address these issues, I.O.B. has started focusing on the Southeast Asian market, aiming to help companies solve their challenges with specialized expertise. In the pursuit of expertise and insights, we concentrate on understanding how Southeast Asian culture and environment have influenced various business cases. Simultaneously, to build teams optimized for the diverse business objectives of companies, we are expanding our network of Southeast Asian experts.”
              </p>
            </div>
            {/* //ceo quote */}
          </div>
        </section>
        {/* //section 3: our story */}

        {/* section 4: our goals */}
        <section id="our-goals">
          <div id="our-goals-wrap">
            <h3>OUR GOALS</h3>

            <div className="three-goals">
              <div className="goal goal1">
                <Image src={stayAheadIcon} alt="Staying Ahead" />
                <h5>Staying<br/>Ahead</h5>
                <p>
                We present and implement strategies that enable our clients to become leaders in the Southeast Asian market.
                </p>
                <p>
                In areas such as planning, branding, design, marketing, and more, we aim to create success cases that will propel our clients ahead of the market.
                </p>
              </div>

              <div className="goal goal2">
                <Image src={realOutcomesIcon} alt="Real Business Outcomes" />
                <h5>Real Business<br/>Outcomes</h5>
                <p>
                We aim to contribute to the creation of tangible business outcomes, such as attracting customers and achieving sales targets.
                </p>
                <p>
                In particular, we assist our clients in accomplishing their business objectives in the Southeast Asian market through digital channels.
                </p>
              </div>

              <div className="goal goal3">
                <Image src={growthIcon} alt="Sustainable Growth" />
                <h5>Sustainable<br/>Growth</h5>
                <p>
                We focus on utilizing advanced data to achieve and sustain long-term business growth.
                </p>
                <p>
                We establish a sophisticated customer data tracking and analysis environment, providing data-driven insights to lay the foundation for long-term business growth.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* //section 4: our goals */}

        {/* section 5: our approach */}
        <section id="our-approach">
          <div id="our-approach-wrap">
            <h3>OUR APPROACH</h3>

            <div id="approach-papers">
              <div className="approach-papers-left">
                <div className="approach1">
                  <p>
                 WE INTERPRET BUSINESS TRENDS FROM A MARKET ENTRY PERSPECTIVE.
                  </p>
                  <p>
                  We aim to discover the significance of various business cases for companies venturing into the market.
                  </p>
                </div>

                <div className="approach1">
                  <p>
                  WE INTEGRATE GLOBAL TRENDS.
                  </p>
                  <p>
                  By merging insights from the Southeast Asian market with global trends, we create innovative strategies and implementation plans.
                  </p>
                </div>
              </div>

              <div className="approach-papers-right">
                <div className="approach1">
                  <p>
                 WE CURATE RESOURCESFUL INSIGHTS.
                  </p>
                  <p>
                 We curate and provide valuable insights, collecting and delivering information that can directly contribute to business strategies and execution.
                  </p>
                </div>

                <div className="approach1">
                  <p>
                  WE BUILD THE RIGHT TEAM FOR YOU.
                  </p>
                  <p>
                  With I.O.B’s in-house experts, as well as external specialists and agencies, we create teams tailored to meet the specific challenges of each company and carry out tasks effectively.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* //section 5: our approach */}

      </main>
      {/* //main */}

      {/* about page ctas */}
      <section id="about-ctas">
        <div className="ab-cta">
          <p className="ab-cta-title">{t('iob-content')}</p>
          <Link href={{ pathname: `/content` }}>
            <Icons type="arrowWhite" />
            <p>{t('see-all')}</p>
          </Link>
        </div>

        <div className="ab-cta">
          <p className="ab-cta-title">{t('iob-report')}</p>

          <Link href={{ pathname: `/report` }}>
            <Icons type="arrowWhite" />
            <p>{t('see-all')}</p>
          </Link>
        </div>

        <div className="ab-cta">
          <p className="ab-cta-title">{t('iob-project')}</p>

          <Link href={{ pathname: `/project` }}>
            <Icons type="arrowWhite" />
            <p>{t('see-details')}</p>
          </Link>
        </div>

      </section>
      {/* //about page ctas */}
    </div>
  )
}
