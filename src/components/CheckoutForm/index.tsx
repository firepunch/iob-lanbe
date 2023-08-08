'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { LinkAuthenticationElement, CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Source } from '@stripe/stripe-js'
import Button from '../Button'
import { createOrderNew } from '@/api_gql'
import { AUTH_TOKEN, getStorageData } from '@/utils/lib'
import getPaymentIntent from '@/utils/stripe-intent'

interface CheckoutFormProps {
  clientSecret: string
}

export default function CheckoutForm ({
  clientSecret,
  ...props
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

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
      const checkout = await createOrder(input)

      console.log('SUCCESS')
      console.log(checkout)

      // await checkout({
      //   variables: {},
      // })
    } catch (error) {
      console.log('ERROR')
      console.error(error)
    }
  }

  const handleStripeNew = async (e) => {
    e.preventDefault()
 
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    })

    if (error) {
      setErrorMessage(error?.message)
    } else if (paymentIntent?.status === 'succeeded') {
      console.log(paymentIntent)

      const input = {
        'isPaid': true,
        'lineItems': [{
          'productId': 3123,
          'quantity': 1,
        }],
        'paymentMethod': 'stripe',
        'currency': 'KRW',
        // 'customerId': 231936701,
        'transactionId': paymentIntent.id,
        'metaData': [{
          'key': '_stripe_source_id',
          'value': paymentIntent.id,
        }],
      }

      try {
        console.log('input', JSON.stringify(input))
        const checkout = await createOrderNew(input)

        console.log('SUCCESS')
        console.log(checkout)

        router.push(
          {
            pathname: '/completion',
            query: {
              orderId: checkout.id,
              id: paymentIntent.id,
            },
          }, 
          undefined, 
          { shallow: true }
        )

      } catch (err) {
        console.log('Error', err)
      }
    } else {
      setErrorMessage('Unexpected state') 
    }

    setIsProcessing(false)
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

  return (
    <form onSubmit={handleStripeNew}>
      <LinkAuthenticationElement
        id="link-authentication-element"
      />
      <PaymentElement 
        options={{
          defaultValues: {
            billingDetails: {
              email: 'foo@bar.com',
              name: 'John Doe',
              phone: '888-888-8888',
            },
          },
        }} 
      /> 
      <Button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay now'}
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}
