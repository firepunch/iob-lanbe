import Image from 'next/image'

import ArrowBlack from '@/imgs/arrow_black.png'
import ArrowWhite from '@/imgs/arrow_white.png'

export default function Icons({
  type,
}: {
  type: 'arrowBlack' | 'arrowWhite'
}) {
  const IMAGE_MAP = {
    arrowBlack: ArrowBlack,
    arrowWhite: ArrowWhite,
  }

  return (
    <Image src={IMAGE_MAP[type]} alt={type} />
  )
}