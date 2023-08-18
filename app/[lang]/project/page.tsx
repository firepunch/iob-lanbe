'use client'

import { ProjectForm } from '@/components'
import { ValidLocale } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { useState } from 'react'
import { ProjectInquiry } from '@/api_wp'
import Image from 'next/image'
import Link from 'next/link'
import Icons from '@/components/Icons'

import BrandDesignIcon from '@/imgs/branddesign.jpg'
import CrmIcon from '@/imgs/crm.jpg'
import DataTrackingIcon from '@/imgs/datatracking.jpg'
import DigitalIcon from '@/imgs/digitalmarketing.jpg'
import EcommerceIcon from '@/imgs/ecommerce.jpg'
import MarketIcon from '@/imgs/marketanalysis.jpg'
import SocialmediaIcon from '@/imgs/socialmedia.jpg'
import StrategyIcon from '@/imgs/strategy.jpg'
import UiUxIcon from '@/imgs/uiux.jpg'

export default function Search({
  params: { lang },
}: {
  params: { lang: ValidLocale; },
}) {
  const { t } = useTranslation(lang, 'project')
  const [errorCode, setErrorCode] = useState()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)
      const { code } = await ProjectInquiry(formData)
      setErrorCode(code)
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return (
    <>
      {/* section 1: first page */}
      <section id="project-firstpage">
        <h2>{t('firstpage')}</h2>
        <p>{t('iob-project')}</p>
        {/* background image */}
      </section>
      {/* //section 1: first page */}

      {/* fixed icon: inquire */}
      <div id="project-inquire">
        <a href="#project-inquiry-form" className="inquire-button">
          <p>{t('inquire')}</p>
          <Icons type={'arrowBlackDown'} />
        </a>
      </div>
      {/* //fixed icon: inquire */}

      {/* section 2: main body */}
      <section id="project-main-body">

        {/* first intro text */}
        <div id="proj-intro">
          <h3>{t('proj-intro-1')}</h3>
          <p>{t('proj-intro-2')}</p>
          <p>{t('proj-intro-3')}</p>
        </div>
        {/* //first intro text */}

        {/* end-to-end digital solutions */}
        <div id="e2e-digital-solutions">
          <h3>{t('digital-solutions')}</h3>
          <p>{t('digital-1')}</p>
          <p>{t('digital-2')}</p>
          <p>{t('digital-3')}</p>
          <p>{t('digital-4')}</p>

          <div id="project-diagram" className="project-diagram">
            <div className="pd-flex-wrap">

              {/* market entry side */}
              <div className="market-entry">
                <div className="pd-title">
                  <p>{t('market')}<br/> {t('entry')}</p>
                </div>

                <div className="pd-wrap">
                  <div className="solution">
                    <Image src={MarketIcon} alt="Market Analysis" />
                    <p>{t('market')}<br/> {t('analysis')}</p>
                  </div>

                  <div className="solution">
                    <Image src={StrategyIcon}  alt="Strategy" />
                    <p>{t('strategy')}</p>
                  </div>

                  <div className="solution">
                    <Image src={BrandDesignIcon}  alt="Brand Design" />
                    <p>{t('brand')}<br/> {t('design')}</p>
                  </div>

                  <div className="solution">
                    <Image src={UiUxIcon} alt="UI/UX Design & Web/App Development" />
                    <p>{t('uiux')}<br/> {t('wepapp')}</p>
                  </div>
                </div>
              </div>

              {/* digital marketing side */}
              <div className="digital-marketing">
                <div className="pd-title">
                  <p>{t('digital-marketing')}<br/> {t('operations')}</p>
                </div>

                <div className="pd-wrap">
                  <div className="solution">
                    <Image src={EcommerceIcon} alt="E-commerce" />
                    <p>{t('e-commerce')}</p>
                  </div>

                  <div className="solution">
                    <Image src={SocialmediaIcon} alt="Social Media" />
                    <p>{t('social')}<br/> {t('media')}</p>
                  </div>

                  <div className="solution">
                    <Image src={DigitalIcon} alt="Digital Marketing" />
                    <p>{t('digital')}<br/> {t('marketing')}</p>
                  </div>

                  <div className="solution">
                    <Image src={CrmIcon} alt="CRM" />
                    <p>{t('crm')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* data tracking */}
            <div className="data-tracking">
              <div className="dt-line"></div>

              <div className="solution">
                <Image src={DataTrackingIcon} alt="Data Tracking & Analysis" />
                <p>{t('data-tracking')}{t('andAnalysis')}</p>
              </div>
            </div>

          </div>
        </div>
        {/* //end-to-end digital solutions */}

        {/* our services */}
        <div id="our-services">
          <h3>{t('our-services')}</h3>
    
          <div id="our-services-grid">
    
            {/* market analysis */}
            <div className="service">
              <h5>{t('market')}<br/>{t('analysis')}</h5>
    
              <ul>
                <li>{t('market-1')}</li>
                <li>{t('market-2')}</li>
                <li>{t('market-3')}</li>
                <li>{t('market-4')}</li>
              </ul>
            </div>
    
            {/* strategy */}
            <div className="service">
              <h5>{t('strategy')}</h5>
    
              <ul>
                <li>{t('strategy-1')}</li>
                <li>{t('strategy-2')}</li>
                <li>{t('strategy-3')}</li>
                <li>{t('strategy-4')}</li>
              </ul>
            </div>
    
            {/* brand design */}
            <div className="service">
              <h5>{t('brand')}<br/>{t('design')}</h5>
    
              <ul>
                <li>{t('brand-1')}</li>
                <li>{t('brand-2')}</li>
                <li>{t('brand-3')}</li>
                <li>{t('brand-4')}</li>
              </ul>
            </div>
    
            {/* web/app product management */}
            <div className="service">
              <h5>{t('webapp')}<br/>{t('product-manager')}</h5>
    
              <ul>
                <li>{t('webapp-1')}</li>
                <li>{t('webapp-2')}</li>
                <li>{t('webapp-3')}</li>
                <li>{t('webapp-4')}</li>
              </ul>
            </div>
    
            {/* e-commerce */}
            <div className="service">
              <h5>{t('e-commerce')}</h5>
              <ul>
                <li>{t('ecommerce-1')}</li>
                <li>{t('ecommerce-2')}</li>
                <li>{t('ecommerce-3')}</li>
                <li>{t('ecommerce-4')}</li>
              </ul>
            </div>
    
            {/* social media */}
            <div className="service">
              <h5>{t('social')}<br/>Me{t('media')}dia</h5>
              <ul>
                <li>{t('socialmedia-1')}</li>
                <li>{t('socialmedia-2')}</li>
                <li>{t('socialmedia-3')}</li>
                <li>{t('socialmedia-4')}</li>
              </ul>
            </div>
    
            {/* digital marketing */}
            <div className="service">
              <h5>{t('digital')}<br/>{t('marketing')}</h5>
    
              <ul>
                <li>{t('digitalmarketing-1')}</li>
                <li>{t('digitalmarketing-2')}</li>
                <li>{t('digitalmarketing-3')}</li>
                <li>{t('digitalmarketing-4')}</li>
              </ul>
            </div>
    
            {/* crm */}
            <div className="service">
              <h5>{t('crm')}</h5>
              <ul>
                <li>{t('crm-1')}</li>
                <li>{t('crm-2')}</li>
                <li>{t('crm-3')}</li>
                <li>{t('crm-4')}</li>
              </ul>
            </div>
    
            {/* data tracking & analysis */}
            <div className="service">
              <h5>{t('data-tracking')}<br/>{t('andAnalysis')}</h5>
              <ul>
                <li>{t('datatracking-1')}</li>
                <li>{t('datatracking-2')}</li>
                <li>{t('datatracking-3')}</li>
                <li>{t('datatracking-4')}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* //our services */}

        {/* assembling the right team for you */}
        <div id="assembling-team">
          <h3>{t('assembling-team')}</h3>
          <p>{t('assembling-team-1')}</p>
          <p>{t('assembling-team-2')}</p>
          <p>{t('assembling-team-3')}</p>
    
          <div className="countries-verticals-partners">
            <div className="countries">
              <p>6</p>
              <p>{t('countries')}</p>
            </div>
    
            <div className="verticals">
              <p>7</p>
              <p>{t('verticals')}</p>
            </div>
    
            <div className="partners">
              <p>10</p>
              <p>{t('partners')}</p>
            </div>
          </div>
    
          <div className="iob-expert-network">
            <h5>{t('iob-expert-network')}</h5>
    
            <div className="network-grid">
    
              <div className="network">
                <p>00+</p>
                <p>{t('strategy')}</p>
              </div>
    
              <div className="network">
                <p>00+</p>
                <p>{t('marketing')}</p>
              </div>
    
              <div className="network">
                <p>00+</p>
                <p>{t('design')}</p>
              </div>
    
              <div className="network">
                <p>00+</p>
                <p>{t('business')}<br/>{t('development')}</p>
              </div>
    
              <div className="network">
                <p>00+</p>
                <p>{t('sales')}</p>
              </div>
    
              <div className="network">
                <p>00+</p>
                <p>{t('engineering')}</p>
              </div>
            </div>
          </div>
        </div>
        {/* //assembling the right team for you */}

      </section>
      {/* //section 2: main body */}

      {/* project inquiry */}
      <ProjectForm
        t={t} 
        errorCode={errorCode}
        onSubmit={handleSubmit} 
      />
    </>
  )
}