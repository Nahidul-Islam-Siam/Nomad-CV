import AgentList from '@/components/pages/find-agent/AgentList'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSectionWithSingleRowFilter
        backgroundImage={`/assets/hero.png`}
        title='mortgage'
      />
       <CommonHeader header=" Mortgage" />
      <AgentList />
      <NewsletterSignup />
    </div>
  )
}
