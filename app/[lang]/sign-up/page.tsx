import { SignUpForm } from '@/components'
import { getTranslation } from '@/i18n'
import { ValidLocale } from '@/types'

export default async function SignUp({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'sign-up')

  return (
    <SignUpForm>
      <label htmlFor="name">{t('name')}</label>
      <input type="text" id="name" />
      <button type="submit">{t('sign_up')}</button>
    </SignUpForm>
  )
}
