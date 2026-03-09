import DevelopmentFeature from '@/components/pages/development/DevelopmentFeature'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
import React from 'react'

export default function page() {
    return (
        <div>
            <HeroSectionWithBreadcrumbAndHeader
                // breadcrumbs={[
                //     { title: "Home", href: "/development" },
                //     { title: "Development" }
                // ]}
                // title="Development"
                backgroundImage={`/assets/hero.png`}
            />
    <div className='md:mt-10 mt-4'>
                <CommonHeader header="Featured Development" />
    </div>
            <DevelopmentFeature/>
    </div>
    )
}
   