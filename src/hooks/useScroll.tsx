import { useLayoutEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const useHasScroll = (): boolean => {
  const [hasScroll, setHasScroll] = useState(
    typeof window == 'undefined' ? false : window.scrollY > 280
  )

  useLayoutEffect(() => {
    const updateScroll = (): void => {
      setHasScroll(typeof window == 'undefined' ? false : window.scrollY > 280)
    }
    window.addEventListener('scroll', debounce(updateScroll, 250))
    return (): void => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return hasScroll
}

export default useHasScroll
