import { SignInForm } from '@/components'
import { getTranslation } from '@/i18n'
import { ValidLocale } from '@/types'

export default async function SignIn({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'sign-in')

  return (
    <SignInForm>
      <label htmlFor="id">{t('id')}</label>
      <input type="text" id="id" />
      <button type="submit">{t('sign_in')}</button>
    </SignInForm>
  )
}
