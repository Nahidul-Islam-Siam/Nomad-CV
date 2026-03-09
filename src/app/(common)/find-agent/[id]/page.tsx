'use client'
import AgentAbout from '@/components/pages/find-agent/Details/AgentAbout'
import AgentHero from '@/components/pages/find-agent/Details/AgentHero'
import FeaturedPropertise from '@/components/pages/Home/FeaturedPropertise'
// import FeaturedPropertise from '@/components/pages/Home/FeaturedPropertise'
// import PersonalProperties from '@/components/pages/Home/PersonalProperty'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import { useGetPartnerByIdQuery } from '@/redux/service/allPartner/allPartnerApi'
import { useParams } from 'next/navigation'


const Page = () => {

  const id = useParams().id as string

  const {data:userData} = useGetPartnerByIdQuery({id})


  const data = userData?.data

  



  
  return (
    <div className='space-y-8'>
      <AgentHero data={data}/>
      <AgentAbout data={data}/>
        <FeaturedPropertise />
      <NewsletterSignup/>
    </div>
  )
}

export default Page
