'use client'

import { MyPageContent, MyPageIdeas, MyPageReport, MyPageSettings } from '@/components'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import ContentIcon from '@/imgs/content_icon.png'
import IdeasIcon from '@/imgs/ideas_icon.png'
import PaymentIcon from '@/imgs/payment_icon.png'
import ReportIcon from '@/imgs/report_icon.png'
import SettingsIcon from '@/imgs/settings_icon.png'
import { dateEnFormat, getUser } from '@/utils/lib'
import useUserState from '@/stores/userStore'

const TAB_MAP = {
  content: 'content',
  payment: 'payment',
  report: 'report',
  ideas: 'ideas',
  settings: 'settings',
}

const Layout = ({
  params: { lang },
}: {
  params: { lang: ValidLocale },
}) => {
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'my-page')
  const segment = useSelectedLayoutSegment()
  const { userId } = getUser()
  const user = useUserState(state => state.user)

  return (
    <div id="beige-bg-wrap">
      <div id="mypage-aside">
        <div className="mypage-buttons-wrap">
          <p className="user-name">{t('hi')}{user?.name}!</p>
          <p className="member-info">{t('member_since')}{dateEnFormat(user?.registeredDate)}</p>

          <div className="buttons-wrap">
            <Link href={{ pathname: `/my-page/${TAB_MAP.content}` }}>
              <Image src={ContentIcon} alt="I.O.B Content"/>
              <p><span>I.O.B </span>{t(TAB_MAP.content)}</p>
            </Link>
           
            <Link href={{ pathname: `/my-page/${TAB_MAP.report}` }}>
              <Image src={ReportIcon} alt="I.O.B Report"/>
              <p><span>I.O.B </span>{t(TAB_MAP.report)}</p>
            </Link>
           
            <Link href={{ pathname: `/my-page/${TAB_MAP.ideas}` }}>
              <Image src={IdeasIcon} alt="Ideas"/>
              <p><span>I.O.B </span>{t(TAB_MAP.ideas)}</p>
            </Link>

            <Link href={{ pathname: `/my-page/${TAB_MAP.settings}` }}>
              <Image src={SettingsIcon} alt="Settings"/>
              <p>{t(TAB_MAP.settings)}</p>
            </Link>
          </div>
        </div>
      </div>
      <section id="default-content">
        {segment === TAB_MAP.content && <MyPageContent t={t} params={{ userId, language:lang?.toUpperCase() }}/>}
        {segment === TAB_MAP.report && <MyPageReport t={t} params={{ userId, language:lang?.toUpperCase() }} />}
        {segment === TAB_MAP.ideas && <MyPageIdeas t={t} lang={lang} userId={userId} />}
        {segment === TAB_MAP.settings && <MyPageSettings t={t} ct={ct} />}
      </section>
    </div>
  )
}

export default withAuth(Layout)
