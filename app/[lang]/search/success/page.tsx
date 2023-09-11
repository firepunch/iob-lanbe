import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import CheckIcon from '@/imgs/done_check.png'
import { getTranslation } from '@/i18n'

export default async function SearchSuccess({
  params: { lang },
}:{
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'search')

  return (
    <section className="project-success">
      <h2 className="h2">{t('search_inquiry')}</h2>

      <div className="content">
        <Image src={CheckIcon} width={70} height={70} alt="Check Icon" className="check-icon" />
        <p>{t('thanks1')}</p>
        <p className="thanks2">{t('thanks2')}</p>

        <Link href={`/${lang}`} className="home-link">
          {t('back_home')}
        </Link>
      </div>
    </section> 
  )
}