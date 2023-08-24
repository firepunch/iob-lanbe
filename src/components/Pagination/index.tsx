import { IPageInfo } from '@/types/store'


interface PaginationProps {
  pageInfo?: IPageInfo
  first?: number
  last?: number
  onClickPrev: () => void
  onClickNext: () => void
}

export default function Pagination({
  pageInfo,
  first,
  last,
  onClickPrev,
  onClickNext,
}: PaginationProps) {
  return (
    <div id="pagination">
      <button type="button" className="pagination-on-mobile" onClick={onClickNext}>
        Load more
      </button>

      <span className="pagination-on-web">
        <span 
          className={`prev ${pageInfo?.hasPreviousPage && 'has-more'}`}
          onClick={onClickPrev}
        >
          Previous
        </span>
        <div className="page">
          <p>{first}-{last} out of {pageInfo?.total}</p>
        </div>
        <span 
          className={`next ${pageInfo?.hasNextPage && 'has-more'}`}
          onClick={onClickNext}
        >
          Next
        </span>
      </span>
    </div>
  )
}
