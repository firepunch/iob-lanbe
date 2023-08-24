

interface PaginationProps {
}

export default function Pagination({
}: PaginationProps) {
  return (
    <div id="pagination">
      <button type="button" className="pagination-on-mobile">
        Load more
      </button>

      <span className="pagination-on-web">
        <span className="prev">Previous</span>
        <div className="page"><p>1-9 out of 5</p></div>
        <span className="next">Next</span>
      </span>
    </div>
  )
}
