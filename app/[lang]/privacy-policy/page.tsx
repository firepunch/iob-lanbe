import { ValidLocale } from '@/i18n/settings'
import { getTranslation } from '@/i18n/index'
import Link from 'next/link'

export default async function PrivacyPolicy({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'privacy-policy')

  return (
    <>
      {/* title */}
      <div id="privacy-title">
        <h2>{t('privacy-policy')}</h2>
      </div>
      {/* //title */}

      {/* section: privacy policies */}
      <section id="privacy-policies">
        <p>{t('privacy-policies-1')}</p>

        <h3>{t('privacy-policies-2')}</h3>

        <p>{t('privacy-policies-3')}</p>

        <p>{t('privacy-policies-4')}</p>

        <ul>
          <li className="list-title">{t('privacy-policies-5')}</li>
          <li>{t('privacy-policies-6')}</li>
          <li>{t('privacy-policies-7')}</li>
        </ul>

        <ul>
          <li className="list-title">{t('privacy-policies-11')}</li>
          <li>{t('privacy-policies-12')}</li>
          <li>{t('privacy-policies-13')}</li>
        </ul>

        <ul>
          <li className="list-title">{t('privacy-policies-14')}</li>
          <li>{t('privacy-policies-15')}</li>
          <li>{t('privacy-policies-16')}</li>
        </ul>

        <ul>
          <li className="list-title">{t('privacy-policies-17')}</li>
          <li>{t('privacy-policies-18')}</li>
          <li>{t('privacy-policies-19')}</li>
        </ul>

        <p>
          {t('privacy-policies-20')}
        </p>

        <h3>
          {t('privacy-policies-21')}
        </h3>

        <p>
          {t('privacy-policies-22')}
        </p>

        <ul>
          <li className="list-title">
            <b>{t('list-title-1')}</b>
          </li>
          <li>{t('list-title-1-2')}</li>
          <li>{t('list-title-1-5')}</li>
          <li>{t('list-title-1-6')}</li>
        </ul>

        <ul>
          <li className="list-title">
            <b>{t('list-title-2')}</b>
          </li>
          <li>{t('list-title-2-1')}</li>
          <li>{t('list-title-2-2')}</li>
          <li>{t('list-title-2-3')}</li>
          <li>{t('list-title-2-4')}</li>
          <li>{t('list-title-2-5')}</li>
          <li>{t('list-title-2-6')}</li>
          <li>{t('list-title-2-7')}</li>
          <li>{t('list-title-2-8')}</li>
          <li>{t('list-title-2-9')}</li>
        </ul>

        <ul>
          <li className="list-title">
            <b>{t('list-title-3')}</b>
          </li>
          <li>{t('list-title-3-1')}</li>
          <li>{t('list-title-3-2')}</li>
          <li>{t('list-title-3-3')}</li>
          <li>{t('list-title-3-4')}</li>
        </ul>

        <ul>
          <li className="list-title">
            <b>{t('list-title-4')}</b>
          </li>
          <li>{t('list-title-4-1')}</li>
          <li>{t('list-title-4-2')}</li>
          <li>{t('list-title-4-3')}</li>
          <li>{t('list-title-4-4')}</li>
        </ul>

        <h3>{t('personal-1')}</h3>
            
        <p>
          {t('personal-2')}
        </p>

        <h3>{t('personal-3')}</h3>

        <p>
          {t('personal-4')}
        </p>

        <p>
          {t('personal-5')}
        </p>

        <p>
          {t('personal-6')}
        </p>

        <p>
          {t('personal-7')}
        </p>

        <p>
          {t('personal-8')}
        </p>

        <p>
          {t('personal-9')}
        </p>

        <p>
          {t('personal-10')}
        </p>

        <h3>
          {t('personal-11')}
        </h3>

        <p>
          {t('personal-12')}
        </p>

        <p>
          {t('personal-13')}
        </p>

        <p>
          {t('personal-15')}
        </p>

        <h3>
          {t('personal-16')}     
        </h3>

        <p>
          {t('personal-17')}   
        </p>

        <h3>
          {t('personal-18-0')}
        </h3>

        <p>{t('personal-18')}</p>

        <p>
          {t('cookie-policy-1')}   
        </p>

        <p>
          {t('cookie-policy-2')}   
        </p>

        <p>
          {t('cookie-policy-3')}   
        </p>

        <p>
          {t('cookie-policy-4')}  
        </p>

        <p>
          {t('cookie-policy-5')}   
        </p>

        <p>
          {t('cookie-policy-6')}   
        </p>

        <p>
          {t('cookie-policy-7')}
          <Link href={{ pathname: `/${lang}/cookie-policy` }} >
            {t('cookie-policy-link')}
          </Link>
          {t('cookie-policy-7-2')}
        </p>


        <h3>
          {t('personal-19')} 
        </h3>

        <p>
          {t('personal-20')} 
        </p>

        <h3>
          {t('personal-21')}    
        </h3>

        <p>
          {t('personal-22')}     
        </p>

        <h3>
          {t('retention-1')}         
        </h3>

        <p>
          {t('retention-2')}     
        </p>

        <ul>
          <li>
            {t('retention-3')}
          </li>
          <li>
            {t('retention-4')} 
          </li>
          <li>
            {t('retention-5')} 
          </li>
        </ul>

        <p>
          {t('retention-6')} 
        </p>

        <ul>
          <li>
            {t('retention-7')}   
          </li>
          <li>
            {t('retention-9')}   
          </li>
          <li>
            {t('retention-11')}   
          </li>
        </ul>

        <p>
          {t('retention-12')}
        </p>

        <h3>
          {t('retention-13')}
        </h3>

        <p>
          {t('retention-14')}   
        </p>

        <h3>
          {t('retention-15')}
        </h3>

        <p>
          {t('retention-16')}     
        </p>

        <p>
          {t('retention-17')}
        </p>

        <p>
          {t('retention-18')}    
        </p>

        <p>
          {t('retention-19')}     
        </p>

        <p>
          {t('retention-20')}    
        </p>

        <ul>
          <li>{t('provide-1')}</li>
          <li>{t('provide-2')}</li>
          <li>{t('provide-3')}</li>
          <li>{t('provide-4')}</li>
          <li>{t('provide-5')}</li>
          <li>{t('provide-6')}</li>
        </ul>

        <h3>
          {t('notification-1')}    
        </h3>

        <p>
          {t('notification-2')}    
        </p>
    
        <p>{t('notification-dash')}</p>

        <p>
          {t('notification-3')}       
        </p>

        <p>{t('notification-dash')}</p>

        {lang === 'ko' && (
          <>
            <ul>
              <li className="list-title">{t('manager')}</li>
              <li>{t('manager-1')}</li>
              <li>{t('manager-2')}</li>
              <li>{t('manager-3')}</li>
            </ul>

            <p>{t('notification-dash')}</p>
        
            <ul>
              <li className="list-title">{t('organization')}</li>
              <li>
                {t('organization-1')}
                <Link target="_blank" href={{ pathname: `https://privacy.kisa.or.kr` }} >
                https://privacy.kisa.or.kr
                </Link>
              </li>
              <li>
                {t('organization-2')}
                <Link target="_blank" href={{ pathname: `http://cyberbureau.police.go.kr` }} >
                http://cyberbureau.police.go.kr
                </Link>
              </li>
              <li>
                {t('organization-3')}
                <Link target="_blank" href={{ pathname: `http://www.spo.go.kr` }} >
                http://www.spo.go.kr
                </Link>
              </li>
            </ul>
            <p>{t('notification-dash')}</p>
          </>  
        )}

        <p>{t('date')}</p>


      </section>
    </>
  )
}
