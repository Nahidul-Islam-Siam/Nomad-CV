import AboutCardOne from '@/components/pages/about/AboutCardOne'

import BrandContactSection from '@/components/pages/Home/ContactSection'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
// import HeroSectionWithBreadcrumbAndHeaderSubTitle from '@/components/shared/HeroSectionWithBreadcrumbAndHeaderSubTitle/HeroSectionWithBreadcrumbAndHeaderSubTitle'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
          <HeroSectionWithBreadcrumbAndHeader
                // breadcrumbs={[
                //     { title: "Home", href: "/development" },F
                //     { title: "Development" }
                // ]}
                // title="Development"
                backgroundImage={`/assets/hero.png`}
            />
            <h1 className="text-4xl font-bold text-center my-16">About Us</h1>
            {/* <AboutSection /> */}
            <AboutCardOne />
            {/* <BrandContactSection /> */}
                 <BrandContactSection />
             <NewsletterSignup />
    </div>
  )
}
