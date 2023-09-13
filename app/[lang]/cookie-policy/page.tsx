import { ValidLocale } from '@/i18n/settings'
import { getTranslation } from '@/i18n/index'
import Link from 'next/link'
import Icons from '@/components/Icons'

export default async function CookiePolicy({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'cookie-policy')

  return (
    <>
      {/* title */}
      <div id="cookie-title">
        <h2>{t('cookie-policy')}</h2>

        <Link target="_blank" href={{ pathname: `/${lang}/my-page/settings` }} className="manage-preferences-button">
          <Icons type={'arrowBlack'} />
          <p>{t('manage-preferences')}</p>
        </Link>
      </div>
      {/* //title */}

      {/* section: cookie policies */}
      <section id="cookie-policies">
        <p>
          {t('cookie-policies-1')}
        </p>

        <h3>
          {t('other-tracking')}
        </h3>

        <p>
          {t('other-tracking-1')}
          <Link target="_blank" href={'https://www.allaboutcookies.org'}>
          www.allaboutcookies.org
          </Link>
          {t('and')}
          <Link target="_blank" href={'https://www.youronlinechoices.eu'}>
          www.youronlinechoices.eu
          </Link>
          {t('other-tracking-2')}
        </p>

        <h3>
          {t('how-do')}
        </h3>

        <p>
          {t('how-do-1')} 
                
        </p>

        <p>
          {t('how-do-2')} 
                
        </p>

        <h3>
          {t('first-third')}
        </h3>

        <p>
          {t('first-third-1')}
        </p>

        <p>
          {t('first-third-2')}
        </p>

        <p>
          {t('first-third-3')} 
        </p>

        <p>
          <b>
            {t('first-third-4')}
          </b>
          {t('first-third-5')}
        </p>

        <p>
          <b>
            {t('first-third-6')}
          </b> 
          {t('first-third-7')}
        </p>

        <p>
          {t('first-third-8')}
        </p>

        <p>
          {t('first-third-9')}
        </p>

        <h3>
          {t('purposes')}
        </h3>

        <p>
          <b>
            {t('purposes-1')}
          </b>
          <br/>
          {t('purposes-2')}
        </p>

        <p>
          <b>
            {t('purposes-3')}
          </b>
          <br/>
          {t('purposes-4')}
        </p>

        <p>
          <b>
            {t('purposes-5')}
          </b>
          <br/>
          {t('purposes-6')}
        </p>

        <p>
          <b>
            {t('purposes-7')}
          </b>
          <br/>
          {t('purposes-8')}
        </p>

        <h3>
          {t('refuse')}
        </h3>

        <p>
          {t('refuse-1')}      
          <Link target="_blank" href={'https://www.allaboutcookies.org'}>
          www.allaboutcookies.org
          </Link>
          {t('refuse-1-1')}  
        </p>

        <p>
          {t('refuse-2')}     
        </p>

        <p>
          {t('refuse-3')}   
        </p>

        <p>
          {t('refuse-4')}       
          <Link target="_blank" href={'https://www.youronlinechoices.eu'}>
          www.youronlinechoices.eu
          </Link>
          {t('refuse-5')} 
          <Link target="_blank" href={'https://www.aboutads.info/choices'}>
          www.aboutads.info/choices
          </Link>
          {t('refuse-6')} 
        </p>

        <h3>
          {t('contact')}   
        </h3>

        <p>
          {t('contact-1')} 
        </p>

        <p>
          {t('dash')} <br/>
          {t('contact-2')} 
        </p>
      </section>
      {/* //section: cookie policies */}
    </>
  )
}
