'use client'

import { ValidLocale } from '@/i18n/settings'
import { CardElement } from '@stripe/react-stripe-js'

export default function Payment({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
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
      <CardElement />
      <button onClick={handleAddCard}>Submit</button>
    </>
  )
}
