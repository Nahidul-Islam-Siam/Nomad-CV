import AreasSection from '@/components/pages/Areas/AreasSection'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function AreaPage() {
    return (
        <div>
            <HeroSectionWithBreadcrumbAndHeader
                breadcrumbs={[
                    { title: "Home", href: "/" },
                    { title: "Areas" }
                ]}
                title="Best Real Estate Areas"
                backgroundImage={`/assets/hero.png`}
            />
            <AreasSection />
            <NewsletterSignup />
        </div>
    )
}
