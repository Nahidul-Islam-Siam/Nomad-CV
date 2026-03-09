'use client'

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface HeroSectionWithBreadcrumbAndHeaderSubTitleProps {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

const HeroSectionWithBreadcrumbAndHeaderSubTitle: React.FC<HeroSectionWithBreadcrumbAndHeaderSubTitleProps> = ({
    breadcrumbs = [{ title: "Home", href: "/" }, { title: "Contact Us" }],
    title = "Contact Us",
    subtitle = "Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum",
    backgroundImage = "/assets/hero-contact.jpg",
}) => {

    return (
        <div
            className={`relative w-full h-[360px] lg:h-[76vh] bg-cover bg-center bg-no-repeat`}
            style={{
                backgroundImage: `url("${backgroundImage}")`,
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Breadcrumb */}
                <div className="pt-8 md:pt-12 lg:pt-20">
                    <nav className="flex items-center justify-center gap-2 text-white">
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center justify-center">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-white hover:text-gray-200 transition-colors text-sm md:text-base"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <span className="text-white text-sm md:text-base">{item.title}</span>
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <span className="mx-2 text-white text-sm md:text-base">{'>'}</span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Centered Content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 text-center">
                    {/* Main Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-4xl leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionWithBreadcrumbAndHeaderSubTitle;