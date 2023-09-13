import { IOB_KEYWORDS } from '@/utils/constants'

export async function generateMetadata({ params: { lang } }) {
  return {
    robots: 'index,follow,max-image-preview:large',
    title: `${lang === 'ko' ? '프로젝트' : 'Project'} | I.O.B`,
    description: lang === 'ko' ? 
      '우리는 동남아 시장에 최적화된 사업 및 브랜드 전략을 기업에게 제공하며, 디자인, 기술, 마케팅을 통해 동남아 시장에서 앞서가는 성공 사례를 만들어 냅니다.' :
      'We help companies strategize for the Southeast Asian market, and stay ahead in design, technology, and marketing.',
    keywords: [...IOB_KEYWORDS, 'trends', '트렌드', 'insights', '인사이트', 'research', 'strategies', '전략', 'support', '성공', 'inquire', '문의'],
    authors: [{
      name: 'I.O.B',
    }, {
      name: 'Junha Son',
    }],
    openGraph: {
      type: 'article',
      title: `${lang === 'ko' ? '프로젝트' : 'Project'} | I.O.B`,
      description: lang === 'ko' ?
        '동남아에는 꾸준히 디지털 기술이 확산되고 있습니다. 디지털 채널은 고객 커뮤니케이션과 서비스/제품 판매의 핵심 채널로 자리잡고 있습니다. I.O.B는 디지털 채널에 집중하여 고객 유치 및 매출 증대를 위한 프로젝트를 수행합니다. 기업의 지속 가능한 성장을 위해, 프로젝트 과정에서 데이터 수집 및 분석 인프라를 마련하고 데이터 기반의 의사 결정을 제공합니다.' :
        'Digital technology is steadily spreading across Southeast Asia, with digital channels becoming the core means of customer communication as well as product and service sales. I.O.B focuses on digital channels to execute projects aimed at attracting customers and increasing sales. For the sustainable growth of businesses, we establish infrastructures for data collection and analysis throughout the project and provide data-driven decision-making support.',
      images: 'https://i0.wp.com/api.iob.team/wp-content/uploads/2023/09/link_thumbnail.jpg',
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      {children}
    </>
  )
}
