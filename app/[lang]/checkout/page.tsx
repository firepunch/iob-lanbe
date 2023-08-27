'use client'

import { CheckoutForm } from '@/components'
import { useTranslation } from '@/i18n/client'
import { ValidLocale } from '@/i18n/settings'
import useUserState from '@/stores/userStore'
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
  const { t } = useTranslation(lang, 'checkout')
  const { order } = useUserState(state => state)
  const [clientSecret, setClientSecret] = useState<string>()
  const [savedCards, setSavedCards] = useState([])

  useEffect(() => {
    // fetchCardsIntent().then(result => (
    //   setSavedCards(result?.data)
    // ))

    if (order) {
      checkoutIntent({
        amount: order.currency === 'usd' ? order.amount * 100 : order.amount,
        currency: order.currency,
        metadata: {
          wcUserId: order.userId,
          productId: order.reportId,
          productName: order.name,
        },
      }).then(({ clientSecret }) => (
        setClientSecret(clientSecret)
      ))
    }
  }, [])
  
  if (!order) return 'loading'

  return (
    <>
      <section id="payment-page">
        <div id="payment-receipt">
          {/* receipt details */}
          <div className="receipt-details">
            <p className="your-order">{t('your_order')}</p>

            <p className="report-title">{order.name}</p>
    
            <div className="total-price">
              <p>{t('total')}</p>
              <p>{order.price}</p>
            </div>
    
            <p className="disclaimer1">{t('disclaimer')}</p>
          </div>

          <p className="please-complete">{t('please')}</p>

          <a href="#" className="prev-page">{t('back')}</a>
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

          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                savedCards={savedCards} 
                reportId={order.reportId} 
              />
            </Elements> 
          )}

        </div>
        {/* //add payment */}

      </section>
    </>
  )
}
