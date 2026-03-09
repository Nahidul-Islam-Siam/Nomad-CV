// import AgentHero from '@/components/pages/find-agent/Details/AgentHero'
import QuestionsAboutMortgage from '@/components/pages/mortgage/QuestionsAboutMortgage'
import WhyChooseMortgage from '@/components/pages/mortgage/WhyChooseMortgage'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
      {/* <AgentHero /> */}
      <WhyChooseMortgage/>
      <QuestionsAboutMortgage/>
      <NewsletterSignup/>
    </div>
  )
}
