// import FeaturedSection from '@/components/pages/save-property/FeaturedSection'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
         <HeroSectionWithBreadcrumbAndHeader
                breadcrumbs={[
                    { title: "Home", href: "/save-property" },
                    { title: "Save Property" }
                ]}
                title=""
                backgroundImage={`/assets/hero.png`}
            />
        <h1 className="text-3xl font-bold mb-6 text-center">Save Property</h1>
        {/* <FeaturedSection /> */}
        <NewsletterSignup />
    </div>
  )
}
