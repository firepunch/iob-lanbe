'use client'

import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'

const stripePromise = loadStripe(
  process.env.STRIPE_SECRET_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  // const { t } = await getTranslation(lang, 'second-page')

  return (
    <>
      <p>Your order:</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  )
}
