'use client'

import { getTranslation } from '@/i18n/index'
import { ValidLocale } from '@/i18n/settings'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '@/components'
import { checkoutIntent } from '@/utils/stripe-intent'
import { useEffect, useState } from 'react'
import useUserState from '@/stores/userStore'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'
import { addCart, fetchCart } from '@/api_gql'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export default function Checkout({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    const handleStripe = async () => {
      const { clientSecret } = await checkoutIntent('report-1')
      setClientSecret(clientSecret)
    }

    handleStripe()
  }, [])
 
  const handleFetch = async () => {
    await fetchCart()
  }
  
  const handlePost = async () => {
    await addCart()
  }
  
  return (
    <>
      <p>Your order:</p>
      <button onClick={handleFetch}>Fetch</button>
      <button onClick={handlePost}>ADD to CART</button>
      
      {stripePromise && clientSecret && (
        <Elements 
          stripe={stripePromise} 
          options={{
            // mode: 'payment',
            // amount: 1001,
            // currency: 'krw',
            // locale: lang,
            clientSecret,
            // setupFutureUsage: 'off_session',
          }}>
          <CheckoutForm 
            clientSecret="ㅋㅌㅊ"
          />
        </Elements> 
      )}
    </>
  )
}
