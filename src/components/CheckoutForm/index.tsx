'use client'

import { gql, useMutation } from '@apollo/client'
import { PaymentElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { Source } from '@stripe/stripe-js'
import Button from '../Button'

interface CheckoutFormProps {
}

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        databaseId
        orderNumber
        total
        lineItems {
          nodes {
            product {
              name
              databaseId
            }
          }
        }
      }
    }
  }
`

export default function CheckoutForm ({
  ...props
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  
  const [checkout] = useMutation(CHECKOUT, {
    onCompleted({ checkout }) {
      console.log(checkout.order)
      alert('SUCCESS')
    },
    onError(error) {
      console.error(error)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const source = await handleStripe()

      await checkout({
        variables: {
          input: {
            clientMutationId: '12345',
            paymentMethod: 'stripe', // <-- Hey WooCommerce, we'll be using Stripe
            shippingMethod: 'Flat rate',
            billing: { // <-- Hard-coding this for simplicity
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
          },
        },
      })
    } catch (error) {
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
      }
    )
    console.log('source', source)
    if (sourceError || !source) {
      throw Error(sourceError?.message || `Unknown error generating source`)
    }

    return source
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>  
      <CardElement
        options={{ hidePostalCode: true }}
      />
      <Button disabled={!stripe}>Pay</Button>
    </form>
  )
}
