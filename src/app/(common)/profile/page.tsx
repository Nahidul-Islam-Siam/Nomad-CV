import ProfileDetails from '@/components/pages/DEVELOPER/developer-profile/ProfileDetails'
import HeroSectionWithBreadcrumbAndHeaderSubTitle from '@/components/shared/HeroSectionWithBreadcrumbAndHeaderSubTitle/HeroSectionWithBreadcrumbAndHeaderSubTitle'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSectionWithBreadcrumbAndHeaderSubTitle
      backgroundImage='/assets/hero.png'
      title='My Account'    
      />
      <ProfileDetails/>
    </div>
  )
}
