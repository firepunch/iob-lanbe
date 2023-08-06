'use client'

import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'
import getPaymentIntent from '@/utils/stripe-intent'
import { useEffect, useState } from 'react'
import useUserState from '@/stores/userStore'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const [clientSecret, setClientSecret] = useState()
 
  const handleStripe = async () => {
    const { clientSecret } = await getPaymentIntent('report-1')
    setClientSecret(clientSecret)
  }
  
  return (
    <>
      <p>Your order:</p>
      <button onClick={handleStripe}>Get Client Secret</button>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> 
    </>
  )
}
