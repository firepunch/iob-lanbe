'use client'

import useUserState from '@/stores/userStore'
import { TI18N } from '@/types'
import { toComma } from '@/utils/lib'
import { fetchHistoryIntent } from '@/utils/stripe-intent'
import { useEffect } from 'react'
import Pagination from '../Pagination'

const GRID_HISTORY_NUMBER = 5

export default function Payment({
  t, 
}: {
  t: TI18N
}) {
  const { cardHistory, updateCardHistory } = useUserState(state => state)

  useEffect(() => {
    fetchHistoryIntent().then(result => (
      updateCardHistory(result)
    ))
  }, [])

  return (
    <>
      <section id="default-content">
    
        <div id="default-title" className="dt-no-buttons">
          <h2>{t('payment_h2')}</h2>
        </div>
    
        <div id="payment-info-wrap">

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
                      <p>
                        {item.currency === 'krw' ? '₩' : '$'}
                        {item.currency === 'krw' ? toComma(item.amount) : item.amount}
                      </p>
                    </div>
                  </div>
                ))}
                {cardHistory.has_more && <button>{t('load_more')}</button>}
              </>      
            )}
           
            <Pagination 
              size={GRID_HISTORY_NUMBER}
              onClickPrev={() => {}}
              onClickNext={() => {}}
            />
          </div>
        </div>
      </section>
    </>
  )
}