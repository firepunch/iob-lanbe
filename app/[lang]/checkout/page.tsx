'use client'

import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'
import getPaymentIntent from '@/utils/stripe-intent'
import { useEffect, useState } from 'react'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  // const [clientSecret, setClientSecret] = useState()
  // const { clientSecret } = await getPaymentIntent('report-1')
  const clientSecret = 'pi_3NWFRwE1PMbDvOF614vvLZ6Y_secret_hFQIxJbEaJVinTl0uRm3UWcuj'
  // const { t } = await getTranslation(lang, 'second-page')
 
  return (
    <>
      <p>Your order:</p>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements> 
      )} 
    </>
  )
}
