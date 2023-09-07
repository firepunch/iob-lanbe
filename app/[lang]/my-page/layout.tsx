'use client'

import { MyPageContent, MyPageIdeas, MyPageReport, MyPageSettings } from '@/components'
import withAuth from '@/hocs/withAuth'
import { useTranslation } from '@/i18n/client'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'
import { ValidLocale } from '@/types'
import { AUTH_TOKEN, dateEnFormat, removeStorageData } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

import ContentIcon from '@/imgs/content_icon.png'
import IdeasIcon from '@/imgs/ideas_icon.png'
import ReportIcon from '@/imgs/report_icon.png'
import SettingsIcon from '@/imgs/settings_icon.png'
import useStore from '@/hooks/useStore'

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
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const { t: ct } = useTranslation(lang, 'common')
  const { t } = useTranslation(lang, 'my-page')
  const { _hasHydrated, user, resetUser } = useStore(useUserState, state => state, INIT_USER_STATE)

  const handleLogout = () => {
    removeStorageData(AUTH_TOKEN)
    resetUser()
    router.replace(`/${lang}/sign-in`)
  }

  if (!_hasHydrated) {
    return <div></div>
  }

  return (
    <div id="beige-bg-wrap">
      <div id="mypage-aside">
        <div className="mypage-buttons-wrap">
          <p className="user-name">{t('hi')}{user?.name}!</p>
          <p className="member-info">{t('member_since')}{dateEnFormat(user?.registeredDate)}</p>
          <button className="member-info logout-button" onClick={handleLogout}>{t('logout')}</button>

          <div className="buttons-wrap">
            <Link href={{ pathname: `/${lang}/my-page/${TAB_MAP.content}` }}>
              <Image src={ContentIcon} alt="I.O.B Content"/>
              <p><span>I.O.B </span>{t(TAB_MAP.content)}</p>
            </Link>
           
            <Link href={{ pathname: `/${lang}/my-page/${TAB_MAP.report}` }}>
              <Image src={ReportIcon} alt="I.O.B Report"/>
              <p><span>I.O.B </span>{t(TAB_MAP.report)}</p>
            </Link>
           
            <Link href={{ pathname: `/${lang}/my-page/${TAB_MAP.ideas}` }}>
              <Image src={IdeasIcon} alt="Ideas"/>
              <p><span>I.O.B </span>{t(TAB_MAP.ideas)}</p>
            </Link>

            <Link href={{ pathname: `/${lang}/my-page/${TAB_MAP.settings}` }}>
              <Image src={SettingsIcon} alt="Settings"/>
              <p>{t(TAB_MAP.settings)}</p>
            </Link>
          </div>
        </div>
      </div>
      <section id="default-content">
        {segment === TAB_MAP.content && <MyPageContent t={t} lang={lang} userId={user.databaseId} />}
        {segment === TAB_MAP.report && <MyPageReport t={t} lang={lang} userId={user.databaseId} />}
        {segment === TAB_MAP.ideas && <MyPageIdeas t={t} lang={lang} userId={user.databaseId} />}
        {segment === TAB_MAP.settings && <MyPageSettings t={t} ct={ct} userId={user.databaseId} />}
      </section>
    </div>
  )
}

export default withAuth(Layout)
