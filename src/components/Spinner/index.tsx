import './index.scss'

const Spinner = ({
  loading = false,
}) => {
  return (
    loading && (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
  )
}

export default Spinner