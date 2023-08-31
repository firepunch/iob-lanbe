'use client'

import { initPageInfo } from '@/stores/contentStore'
import { IPageInfo } from '@/types/store'
import { useState } from 'react'

interface PaginationProps {
  pageInfo: IPageInfo
  size: number
  onClickPrev: () => void
  onClickNext: () => void
}

export default function Pagination({
  pageInfo = initPageInfo,
  size,
  onClickPrev,
  onClickNext,
}: PaginationProps) {
  const [isClickPrev, setIsClickPrev] = useState(false)
  const startNumber = isClickPrev ? 
    pageInfo.total - (size - 1) :
    pageInfo.initTotal - pageInfo.total + 1
  const endNumber = isClickPrev ? 
    pageInfo.total < size ? 
      pageInfo.initTotal + pageInfo.total - 1 :
      pageInfo.total :
    pageInfo.total < size ?
      startNumber + pageInfo.total - 1 :
      startNumber + (size - 1)

  return (
    <div id="pagination">
      {pageInfo?.hasNextPage && (
        <button type="button" className="pagination-on-mobile" onClick={onClickNext}>
          Load more
        </button>
      )}

      <span className="pagination-on-web">
        <span 
          className={`prev ${pageInfo?.hasPreviousPage && 'has-more'}`}
          {...pageInfo?.hasPreviousPage && { 
            onClick: () => {
              setIsClickPrev(true)
              onClickPrev()
            },
          }}
        >
          Previous
        </span>
        {pageInfo?.initTotal && (
          <div className="page">
            <p>
              {!pageInfo?.hasNextPage ? `${endNumber} ` : `${startNumber}-${endNumber} `}
               out of {pageInfo.initTotal}
            </p>
          </div>
        )}
        <span 
          className={`next ${pageInfo?.hasNextPage && 'has-more'}`}
          {...pageInfo?.hasNextPage && { 
            onClick: () => {
              setIsClickPrev(false)
              onClickNext()
            },  
          }}
        >
          Next
        </span>
      </span>
    </div>
  )
}
