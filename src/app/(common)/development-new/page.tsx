import DevelopmentFeature from '@/components/pages/development/DevelopmentFeature'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
import React from 'react'
export default function page() {
  return (
    <div>
       <HeroSectionWithBreadcrumbAndHeader
                breadcrumbs={[
                    { title: "Home", href: "/development" },
                    { title: "Development" }
                ]}
                title="Development"
                backgroundImage={`/assets/hero.png`}
            />
          
            <DevelopmentFeature/>
    </div>
  )
}
