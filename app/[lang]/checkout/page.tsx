'use client'

import { CheckoutForm } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { checkoutIntent, fetchCardsIntent } from '@/utils/stripe-intent'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const [clientSecret, setClientSecret] = useState()
  const [savedCards, setSavedCards] = useState([])

  useEffect(() => {
    fetchCardsIntent().then(result => (
      setSavedCards(result?.data)
    ))

    checkoutIntent('report-1').then(({ clientSecret }) => (
      setClientSecret(clientSecret)
    ))
  }, [])
  
  return (
    <>
      <p>Your order:</p>
      
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm savedCards={savedCards}/>
        </Elements> 
      )}
    </>
  )
}
