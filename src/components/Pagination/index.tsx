import { IPageInfo } from '@/types/store'


interface PaginationProps {
  pageInfo?: IPageInfo
  size: number
  first?: number
  last?: number
  onClickPrev: () => void
  onClickNext: () => void
}

export default function Pagination({
  pageInfo,
  size,
  first,
  last,
  onClickPrev,
  onClickNext,
}: PaginationProps) {
  const pageStartNumber = pageInfo?.hasPreviousPage ? 
    (pageInfo?.total || 0) :
    1
  const pageEndNumber = (pageInfo?.total || 0) < size ?
    pageInfo?.total :
    pageStartNumber + size - 1

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
          {...pageInfo?.hasPreviousPage && { onClick: onClickPrev }}
        >
          Previous
        </span>
        {pageInfo?.initTotal && (
          <div className="page">
            <p>
              {pageStartNumber}-{pageEndNumber} out of {pageInfo.initTotal}
            </p>
          </div>
        )}
        <span 
          className={`next ${pageInfo?.hasNextPage && 'has-more'}`}
          {...pageInfo?.hasNextPage && { onClick: onClickNext }}
        >
          Next
        </span>
      </span>
    </div>
  )
}
