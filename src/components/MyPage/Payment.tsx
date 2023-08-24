'use client'

import { TI18N } from '@/types'
import { IPaymentHistory, IStripeCard } from '@/types/api'
import { detachCardIntent, fetchCardsIntent, fetchHistoryIntent } from '@/utils/stripe-intent'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import Image from 'next/image'

import CardSampleImg from '@/imgs/card_sample.png'
import TrashWhiteIcon from '@/imgs/trash_white.png'
import addIcon from '@/imgs/add.png'
import closeBlackIcon from '@/imgs/close_black.png'
import useUserState from '@/stores/userStore'

export default function Payment({
  t, 
}: {
  t: TI18N
}) {
  const { cards, cardHistory, updateCards, updateCardHistory } = useUserState(state => state)
  const [selectedCard, setSelectedCard] = useState<IStripeCard>()

  useEffect(() => {
    fetchCardsIntent().then(result => (
      updateCards(result?.data)
    ))

    fetchHistoryIntent().then(result => (
      updateCardHistory(result)
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

  console.log(selectedCard)
  
  return (
    <>
      <section id="default-content">
    
        <div id="default-title" className="dt-no-buttons">
          <h2>{t('payment_en').toUpperCase()}</h2>
        </div>
    
        <div id="payment-info-wrap">

          <div className="card-info-wrap">
            <h3>{t('cards')}</h3>

            <div className="cards">
              {cards?.map((item) => (
                <div key={item.id} className="added-card" onClick={() => setSelectedCard(item)}>
                  <Image src={CardSampleImg} alt="Card sample" className="card-sample" />
                  {item.card.brand}
                  {item.card.last4}
                  {item.card.exp_month}
                  {item.card.exp_year}

                  {cards.length === 2 && (
                    <button onClick={() => handleDetach(item.id)}>  
                      <Image src={TrashWhiteIcon} alt="Trash" />
                    </button>
                  )}
                </div>
              ))}
      
              <div className="add-new-card">
                <Link href={{ pathname: '/payment' }}>
                  <Image src={addIcon} alt="Add" />
                  <p>{t('add_card')}</p>
                </Link>
              </div>
            </div>

            {/* 카드 누르면 나타나는 카드 정보. 인풋 레이아웃이지만 기능이 없다 */}
            {selectedCard && (
              <div className="card-info-details">
                <button onClick={() => setSelectedCard(undefined)}>
                  <Image src={closeBlackIcon} alt="Close" />
                </button>

                <div className="card-info-details-wrap">
                  <form>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" placeholder={selectedCard.billing_details.email} readOnly />

                    <div className="card-numbers">
                      <label htmlFor="card-info">Card information</label>
                      <input type="text" id="card-info" name="card-info" placeholder={`**** **** **** ${selectedCard.card.last4}`} readOnly />

                      <div className="card-numbers-flex">
                        <input 
                          type="text"
                          id="valid-date"
                          name="valid-date"
                          placeholder={
                            `${String(selectedCard.card.exp_year)?.slice(-2)} ${
                              String(selectedCard.card.exp_month)?.length === 1 ? 
                                `0${selectedCard.card.exp_month}` : 
                                String(selectedCard.card.exp_month)
                            }`
                          } readOnly />
                        <input type="text" id="cvc" name="cvc" placeholder="123" readOnly />
                      </div>
                    </div>

                    <label htmlFor="name-on-card">Name on card</label>
                    <input type="text" id="name-on-card" name="name-on-card" placeholder="Seoyoung Lim" readOnly />

                    <label htmlFor="card-country">Country or region</label>
                    <input type="text" id="card-country" name="card-country" placeholder="South Korea" readOnly />
                  </form>
                </div>
              </div>
            )}
          </div>

          <div id="payment-history">
            <h3>{t('payment_history')}</h3>

            {cardHistory?.data?.length && (
              <>
                {cardHistory.data.map(item => (
                  <div key={item.id} className="payment-history-details">
                    <div className="phd-left">
                      <h5>Report No.1: Digital Payment in Southeast Asia</h5>
                      <p>Card ending with 2938 | October 11, 2023</p>
                    </div>

                    <div className="phd-right">
                      <p>{item.currency === 'krw' ? '₩' : '$'}{item.amount}</p>
                    </div>
                  </div>
                ))}
                {cardHistory.has_more && <button>Load more</button>}
              </>      
            )}
           
            <Pagination />
          </div>
        </div>
      </section>
    </>
  )
}