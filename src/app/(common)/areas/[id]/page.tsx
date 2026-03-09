"use client";

import AreaDetailsSection from '@/components/pages/AreaDetails/AreaDetailsSection';
import FeaturedPropertise from '@/components/pages/Home/FeaturedPropertise';
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader';
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter';
import fakeAreasData from '@/data/fakeAreasData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function AreaDetailsPage() {

    const params = useParams();
    const id = params?.id as string;

    // Filter data to get the specific area
    const areaData = fakeAreasData.find((area) => area.id === parseInt(id));

    if (!areaData) {
        return (
            <div className="w-11/12 mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Area Not Found</h2>
                    <p className="text-gray-600">The requested area could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <HeroSectionWithBreadcrumbAndHeader
                breadcrumbs={[
                    { title: "Home", href: "/" },
                    { title: "Areas", href: "/areas" },
                    { title: "Area Details" }
                ]}
                title={`Best Real Estate Areas in ${areaData.areaName}`}
                backgroundImage={`/assets/hero.png`}
            />
            <AreaDetailsSection areaData={areaData} />
            <FeaturedPropertise />
            <NewsletterSignup/>
        </div>
    )
}
