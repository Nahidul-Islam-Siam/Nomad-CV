import React from 'react'
// import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
// import AgentList from '@/components/pages/find-agent/AgentList'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
// import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'
import AgentList from '@/components/pages/find-agent/AgentList'

export default function page() {
  return (
    <div>
    
      {/* <HeroSectionWithSingleRowFilter title='Find-Agent' backgroundImage={`/assets/hero.png`}/>
      <CommonHeader header=" Agent" /> */}
      <AgentList />
      
      <NewsletterSignup />
    </div>
  )
}
