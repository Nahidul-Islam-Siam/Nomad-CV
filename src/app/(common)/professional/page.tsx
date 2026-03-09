import React from 'react'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
// import AgentList from '@/components/pages/find-agent/AgentList'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'

import MortgageList from '@/components/pages/mortgage/mortgageList'

export default function page() {
  return (
    <div>
    
      <HeroSectionWithSingleRowFilter title='Mortgage' backgroundImage={`/assets/hero.png`}/>
      <CommonHeader header=" Mortgage" />
      <MortgageList />
      <NewsletterSignup />
    </div>
  )
}
