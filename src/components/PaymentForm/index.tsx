'use client'

import { attachCardIntent } from '@/utils/stripe-intent'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Button'

export default function PaymentForm () {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string|undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      if (!stripe || !elements) {
        return
      }

      const cardElements = elements.getElement(CardElement)
      if (!cardElements) {
        throw Error(`cardElements not found`)
      }
      
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElements,
      })

      if (error) {
        setErrorMessage(error?.message)
      } else  {
        alert('카드 생성 성공')
        console.log(paymentMethod)

        const result = await attachCardIntent(paymentMethod.id)
        console.log(result)
      }
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <AddressElement options={{ mode: 'shipping' }} /> */}
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Save'}
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}
