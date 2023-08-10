'use client'

import { ValidLocale } from '@/i18n/settings'
import { IStripeCard } from '@/types/api'
import { fetchCardsIntent } from '@/utils/stripe-intent'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Payment({
  lang,
}: {
  lang: ValidLocale
}) {
  const [savedCards, setSavedCards] = useState<IStripeCard[]>([])

  useEffect(() => {
    fetchCardsIntent().then(result => (
      setSavedCards(result.data)
    ))
  }, [])
  
  return (
    <>
      {savedCards?.length && (
        <ul>
          {savedCards.map(item => (
            <li key={item.id}>
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
      <Link href={{ pathname: '/payment' }}>
        Add a new card
      </Link>
    </>
  )
}