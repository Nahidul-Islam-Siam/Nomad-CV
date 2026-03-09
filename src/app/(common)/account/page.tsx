"use client";

import React from "react";
import { Card } from "antd";
import NewsletterSignup from "@/components/shared/Newsletter/NewsLetter";
import Link from "next/link";
import HeroSectionWithBreadcrumbAndHeaderSubTitle from "@/components/shared/HeroSectionWithBreadcrumbAndHeaderSubTitle/HeroSectionWithBreadcrumbAndHeaderSubTitle";

const MyAccountPage: React.FC = () => {
    return (
        <div className="bg-white">
            <HeroSectionWithBreadcrumbAndHeaderSubTitle
                breadcrumbs={[
                    { title: "Home", href: "/" },
                    { title: "Account" }
                ]}
                title="My Account"
                subtitle="Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum"
                backgroundImage="/assets/hero.png"
            />
            <div className="w-11/12 mx-auto pt-10 md:pt-16 lg:pt-20 2xl:pt-28">
                {/* Navigation Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <Link href={`/profile`} className="block">
                        {/* My Profile Card */}
                        <Card
                            className="bg-[#F2F5F7] border-0 cursor-pointer hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="p-4">
                                <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-900 mb-3">
                                    My Profile
                                </h2>
                                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                    Manage your contact information and password here.
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link href={`/savedProperties`} className="block">
                        {/* Save Properties Card */}
                        <Card
                            className="bg-[#F2F5F7] border-0 cursor-pointer hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="p-4">
                                <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-900 mb-3">
                                    Save Properties
                                </h2>
                                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                    Manage your saved properties here.
                                </p>
                            </div>
                        </Card>
                    </Link>
                </div>

                <NewsletterSignup />
            </div>
        </div>
    );
};

export default MyAccountPage;