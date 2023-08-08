'use client'

import { useState } from 'react'
import { CHECKOUT_QUERY } from '@/queries/checkout'
import { useMutation } from '@apollo/client'
import { LinkAuthenticationElement, CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Source } from '@stripe/stripe-js'
import Button from '../Button'
import { createOrder } from '@/api_gql'
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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      // redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error?.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      const input = {
        paymentMethod: 'stripe',
        billing: {
          email: `firepunch119@gmail.com`,
        },
        metaData: [
          {
            key: `_stripe_source_id`,
            // value: paymentIntent.id,
          },
        ],
      }

      try {
        console.log('input', JSON.stringify(input))
        // const checkout = await createOrder(input)

        console.log('SUCCESS')
        // console.log(checkout)
      } catch (err) {
        console.log('Error', err)
      }
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
