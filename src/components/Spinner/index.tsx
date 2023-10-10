import './index.scss'

const Spinner = ({
  small = false,
  loading = false,
}) => {
  return (
    loading && (
      <div className={`lds-ring ${small ? 'small' :''}`}><div></div><div></div><div></div><div></div></div>
    )
  )
}

export default Spinner