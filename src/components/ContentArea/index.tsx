'use client'

import cls from 'classnames'
import { useState } from 'react'
import ContentOptions from '../ContentOptions'
import styles from './index.module.scss'

interface ContentAreaProps {
  children?: React.ReactNode;
}

export default function ContentArea ({
  children,
  ...props
}: ContentAreaProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleChangeFont = () => setIsZoomed(prevZoomed => !prevZoomed)
  
  return (
    <div>
      <ContentOptions onChangeFont={handleChangeFont}/>

      <div className={cls(styles.content, { [styles.large]: isZoomed })}>
        {children}
      </div>
    </div>
  )
}
