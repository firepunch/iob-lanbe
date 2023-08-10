'use client'

import { ValidLocale } from '@/i18n/settings'
import { IStripeCard, IPaymentHistory } from '@/types/api'
import { detachCardIntent, fetchCardsIntent, fetchHistoryIntent } from '@/utils/stripe-intent'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Payment({
  lang,
}: {
  lang: ValidLocale
}) {
  const [savedCards, setSavedCards] = useState<IStripeCard[]>([])
  const [historyData, setHistoryData] = useState<IPaymentHistory>({ data: [], hasMore: false })

  useEffect(() => {
    fetchCardsIntent().then(result => (
      setSavedCards(result?.data)
    ))

    fetchHistoryIntent().then(result => (
      setHistoryData({ data: result?.data, hasMore: result?.has_more })
    ))
  }, [])

  const handleDetach = async (cardId: string) => {
    try {
      await detachCardIntent(cardId)
      alert('삭제 성공')
    } catch (err) {
      console.log(err)
      alert('삭제 실패')
    }
  }
  
  return (
    <>
      {savedCards?.length && (
        <ul>
          {savedCards.map(item => (
            <li key={item.id}>
              {savedCards.length === 2 && (
                <button onClick={() => handleDetach(item.id)}>
                  Remove
                </button>
              )}
              {item.id}

              {item.card.brand}
              {item.card.last4}
              {item.card.exp_month}
              {item.card.exp_year}

              {item.billing_details.email}
              {item.billing_details.name}
              {item.billing_details.address.country}
            </li>
          ))}
        </ul>
      )}

      <h3>Payment History</h3>
      {historyData?.data?.length && (
        <>
          <ul>
            {historyData.data.map(item => (
              <li key={item.id}>
                {item.amount}
                {item.currency}
              </li>
            ))}
          </ul>
          {historyData.hasMore && <button>Load more</button>}
        </>      
      )}
      <Link href={{ pathname: '/payment' }}>
        Add a new card
      </Link>
    </>
  )
}