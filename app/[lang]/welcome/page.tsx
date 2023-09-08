'use client'

import useStore from '@/hooks/useStore'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useUserState, { INIT_USER_STATE } from '@/stores/userStore'

const Welcome = ({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) => {
  const { user } = useStore(useUserState, state => state, INIT_USER_STATE)
  const { t } = useTranslation(lang, 'welcome')

  return (
    <section id="welcome-main">
      <div className="welcome-text">
        <p>
          {t('p1')}<br />
          {/* <span>{user.name}!</span> */}
        </p>
        <p className="email">{t('email')}</p>
      </div>
    </section>
  )
}

export default Welcome