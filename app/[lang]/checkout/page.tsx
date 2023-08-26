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
      <section id="payment-page">
        <div id="payment-receipt">
          {/* receipt details */}
          <div className="receipt-details">
            <p className="your-order">Your order:</p>

            <p className="report-title">REPORT NO.1 ABOUT A SPECIFIC TOPIC</p>
    
            <div className="total-price">
              <p>Total</p>
              <p>$15.00</p>
            </div>
    
            <p className="disclaimer1">
                            NOTE: You can re-download the report without any time limit until you decide to withdraw your membership. There is no expiration date.
            </p>
          </div>

          <p className="please-complete">Please provide the following information to complete your payment.</p>

          <a href="#" className="prev-page">Go back</a>
        </div>
        {/* //receipt details */}

        {/* add payment */}
        <div id="payment-details">
          <div className="payment-inputs">
            <form action="#" name="email">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" placeholder="Please enter your email." />
            </form>    
          </div>

          <div className="payment-inputs">
            <form action="#" name="card">
              <label htmlFor="card">Card information</label>
              <input type="text" id="card" name="card" placeholder="1234 1234 1234 1234" />
            </form>
                        
            <div className="payment-input-flex">
              <form action="#" name="card-detail">
                <input type="text" id="card-detail" name="card-detail" placeholder="MM / YY" />
              </form>

              <form action="#" name="card-detail">
                <input type="text" id="card-detail" name="card-detail" placeholder="CVC" />
              </form>
            </div>
          </div>

          <div className="payment-inputs">
            <form action="#" name="card-name">
              <label htmlFor="card-name">Name on card</label>
              <input type="text" id="card-name" name="card-name" placeholder="Please enter your name on card." />
            </form>    
          </div>

          <div className="payment-inputs-country">
            <label htmlFor="country">Country</label>

            <select name="country" id="country">
              <option value="Default">Please select your country.</option>

              <option value="AF">Afghanistan</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
            </select>
          </div>

          <div className="pay-button">
            <p>*Please note that due to the product features, refunds or payment cancellations are not possible.</p>
            <p>*I hereby acknowledge and accept the payment terms.</p>
            {/* <button type="button">Pay</button> */}
            <a href="payment_modal.html">Pay</a>
          </div>
        </div>
        {/* //add payment */}

      </section>

      <p>Your order:</p>
      
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm savedCards={savedCards}/>
        </Elements> 
      )}
    </>
  )
}
