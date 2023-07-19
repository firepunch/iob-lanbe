import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'

const stripePromise = loadStripe(
  process.env.STRIPE_SECRET_KEY as string
)

export default async function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = await getTranslation(lang, 'second-page')

  return (
    <>
      <h2>{t('h1')}</h2>
      <p>Your order:</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  )
}
