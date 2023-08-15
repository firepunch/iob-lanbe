'use client'

import { loadStripe } from '@stripe/stripe-js'
import { ValidLocale } from '@/i18n/settings'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from '@/components'
import { useEffect, useState } from 'react'
import { createCardIntent } from '@/utils/stripe-intent'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export default function Payment({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {

  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    // createCardIntent().then(({ clientSecret }) => {
    //   setClientSecret(clientSecret)
    // })
  }, [])

  const handleAddCard = async () => {
    // const stripeResponse = await stripe.confirmCardSetup(client_secret, {
    //       payment_method: {
    //         card: elements.getElement('cardNumber'),
    //         billing_details: {
    //           address: {
    //             city: selectedAddress.town,
    //             country: selectedAddress.country.iso3166Code,
    //             line1: selectedAddress.line1,
    //             line2: selectedAddress.line2,
    //             postal_code: selectedAddress.postalCode,
    //             state: selectedAddress.region,
    //           },
    //           email: 'ppp@mail.com',
    //           name,
    //           phone: selectedAddress.phone,
    //         },
    //       },
    //     });
  }

  return (
    <>
      <h2>Add Card</h2>
      {stripePromise &&  (
        <Elements stripe={stripePromise} >
          <PaymentForm />
        </Elements>
      )}
    </>
  )
}
