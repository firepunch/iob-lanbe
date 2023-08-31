'use client'

import { TI18N, TStringObj } from '@/types'
import { useState, useEffect, useRef } from 'react'

const NavigationWidget = ({
  t,
  sectionIds,
  sectionRefs,
}: {
  t: TI18N,
  sectionIds: TStringObj
  sectionRefs: any
}) => {
  const [visibleSection, setVisibleSection] = useState('')
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 요소가 화면에 50% 이상 들어왔을 때 처리
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // 섹션 요소들을 관찰
    Object.values(sectionIds).forEach((sectionId: string) => {
      const sectionRef = sectionRefs.current[sectionId]
      if (sectionRef) {
        observer.observe(sectionRef)
      }
    })

    return () => {
      // Clean up: 관찰 해제
      Object.values(sectionIds).forEach((sectionId: string) => {
        const sectionRef = sectionRefs.current[sectionId]
        if (sectionRef) {
          observer.unobserve(sectionRef)
        }
      })
    }
  }, [sectionIds])

  return (
    <aside>
      <div id="widget">
        <div className="line"></div>

        <div className="widget-detail">
          <div className={`square sq1 ${visibleSection === sectionIds.welcome ? 'black-square' : ''}`}/>
          <p>{t('welcome')}</p>
        </div>

        <div className="widget-detail">
          <div className={`square sq2 ${visibleSection === sectionIds.content ? 'black-square' : ''}`}/>
          <p>{t('content')}</p>
        </div>

        <div className="widget-detail">
          <div className={`square sq3 ${visibleSection === sectionIds.report ? 'black-square' : ''}`}/>
          <p>{t('report')}</p>
        </div>

        <div className="widget-detail">
          <div className={`square sq4 ${visibleSection === sectionIds.project ? 'black-square' : ''}`}/>
          <p>{t('project')}</p>
        </div>
      </div>
    </aside>
  )
}

export default NavigationWidget