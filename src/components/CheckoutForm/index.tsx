'use client'

import { createOrder } from '@/api_gql'
import { CardElement, AddressElement, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Source } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Button'
import useUserState from '@/stores/userStore'

interface CheckoutFormProps {
  savedCards: any[]
  reportId: number
}

export default function CheckoutForm ({
  savedCards,
  reportId,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const { updateDownload } = useUserState(state => state)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string|undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const source = await handleStripe()

      const input = {
        clientMutationId: '12345',
        paymentMethod: 'stripe',
        shippingMethod: 'Flat rate',
        billing: {
          firstName: 'George',
          lastName: 'Costanza',
          address1: `129 West 81st Street, Apartment 5A`,
          city: `New York`,
          state: `NY`,
          postcode: `12345`,
          email: `firepunch119@gmail.com`,
        },
        metaData: [
          {
            key: `_stripe_source_id`,
            value: source.id,
          },
        ],
      }

      console.log('input', JSON.stringify(input))
      // const checkout = await createOrder(input)
    } catch (error) {
      console.log('ERROR')
      console.error(error)
    }
  }

  const handleStripe = async (): Promise<Source> => {
    if (!stripe || !elements) {
      throw Error('stripe or elements undefined')
    }

    const cardElements = elements.getElement(CardElement)
    if (!cardElements) {
      throw Error(`cardElements not found`)
    }

    const { source, error: sourceError } = await stripe.createSource(
      cardElements, {
        type: 'card',
        currency: 'KRW',
      }
    )

    console.log('source', source)
    if (sourceError || !source) {
      throw Error(sourceError?.message || `Unknown error generating source`)
    }

    return source
  }

  const handleStripeNew = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
 
    if (!stripe || !elements) {
      return
    }

    // const cardElements = elements.getElement(CardElement)
    // stripe.createSource(ibanElement, {
    //   type: 'sepa_debit',
    //   currency: 'eur',
    //   owner: {
    //     name: 'Jenny Rosen',
    //   },
    // })
    // .then(function(result) {
    //   // Handle result.error or result.source
    // });

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/completed`,
        payment_method_data: {
          billing_details: {
            address: {
              postal_code: '',
            },
          },
        },
      },
    })

    if (error) {
      setErrorMessage(error?.message)
    } else if (paymentIntent?.status === 'succeeded') {
      const input = {
        'isPaid': true,
        'lineItems': [{
          'productId': reportId,
          'quantity': 1,
        }],
        'paymentMethod': 'stripe',
        'currency': paymentIntent.currency.toUpperCase(),
        // 'customerId': 231936701,
        'transactionId': paymentIntent.id,
        'metaData': [{
          'key': '_stripe_source_id',
          'value': paymentIntent.id,
        }],
      }

      try {
        const result = await createOrder(input)
        updateDownload(result.order.downloadableItems)

        router.push(`/checkout/completed/${result.orderId}`)
      } catch (err) {
        console.log('Error', err)
      }
    } else {
      setErrorMessage('Unexpected state') 
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleStripeNew}>
      {savedCards?.length ? (
        <>
          <p>Use An Existing Payment Method</p>
          <ul>
            {savedCards.map(item => (
              <li key={item.id}>
                <span >Select</span>
                {item.id}
              </li>
            ))}
          </ul>

          <p>Or Enter a New Payment Method</p>
        </>
      ) : null}
     
      <LinkAuthenticationElement id="link-authentication-element" />

      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: 'foo@bar.com',
              name: 'Test Name',
            },
          },
          fields: {
            billingDetails: {
              address: {
                postalCode: 'never',
              },
            },
          },
        }} 
      />

      <div className="pay-button">
        <p>*Please note that due to the product features, refunds or payment cancellations are not possible.</p>
        <p>*I hereby acknowledge and accept the payment terms.</p>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}
