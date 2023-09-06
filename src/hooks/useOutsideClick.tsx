import { useEffect, useState } from 'react'

const useOutsideClick = (targetIds: string[] = []) => {
  const [isClickedOutside, setIsClickedOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedId = event.target.closest('section')?.id || ''
      if (!targetIds.includes(clickedId)) {
        setIsClickedOutside(true)
      } else {
        setIsClickedOutside(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return [isClickedOutside] as [boolean]
}

export default useOutsideClick
