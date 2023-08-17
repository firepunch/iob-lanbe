import Image from 'next/image'

import ArrowBlack from '@/imgs/arrow_black.png'
import ArrowWhite from '@/imgs/arrow_white.png'
import SaveIcon from '@/imgs/save.png'
import LocationIcon from '@/imgs/locationicon_black.png'


export default function Icons({
  type,
}: {
  type: 'arrowBlack' | 'arrowWhite' | 'save' | 'location'
}) {
  const IMAGE_MAP = {
    arrowBlack: ArrowBlack,
    arrowWhite: ArrowWhite,
    save: SaveIcon,
    location: LocationIcon,
  }

  return (
    <Image src={IMAGE_MAP[type]} alt={type} />
  )
}