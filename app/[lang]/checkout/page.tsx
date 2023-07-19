'use client'

import { ValidLocale, getTranslator } from 'i18n'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'

const stripePromise = loadStripe(
  process.env.STRIPE_SECRET_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: string; },
}) {
  // const dict = await getTranslator(lang as ValidLocale)

  return (
    <>
      {/* <p>{dict.menu.about}</p> */}
      <p>Your order:</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  )
}
