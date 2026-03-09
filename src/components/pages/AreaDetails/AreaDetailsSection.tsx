"use client";

import React from "react";
import Image from "next/image";
import { TArea } from "@/interface/globalType";

interface AreaDetailsSectionProps {
    areaData: TArea;
}

const AreaDetailsSection: React.FC<AreaDetailsSectionProps> = ({ areaData }) => {
    return (
        <div className="container mx-auto py-10 md:py-16 lg:py-20 2xl:py-28">
            {/* Top Landmarks Section */}
            <div className="mb-10 md:mb-16 lg:mb-20 2xl:mb-28">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {areaData.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 md:h-[25rem] gap-4">
                    {/* First large image */}
                    <div className="md:row-span-2">
                        <div className="relative md:h-full w-full h-72 rounded-xl overflow-hidden">
                            <Image
                                src={areaData.images[0]}
                                alt={`${areaData.areaName} landmark 1`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Second image */}
                    <div>
                        <div className="relative w-full md:h-full h-72 rounded-xl overflow-hidden">
                            <Image
                                src={areaData.images[1]}
                                alt={`${areaData.areaName} landmark 2`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Third image */}
                    <div>
                        <div className="relative w-full md:h-full h-72 rounded-xl overflow-hidden">
                            <Image
                                src={areaData.images[2]}
                                alt={`${areaData.areaName} landmark 3`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Fourth image */}
                    <div>
                        <div className="relative w-full md:h-full h-72 rounded-xl overflow-hidden">
                            <Image
                                src={areaData.images[3]}
                                alt={`${areaData.areaName} landmark 4`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Fifth image */}
                    <div>
                        <div className="relative w-full md:h-full h-72 rounded-xl overflow-hidden">
                            <Image
                                src={areaData.images[4]}
                                alt={`${areaData.areaName} landmark 5`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Reasons to Invest in {areaData.areaName}
            </h2>
            {/* Reasons to Invest Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="relative h-[35rem] w-full rounded-xl overflow-hidden">
                    <Image
                        src={areaData.images[0]}
                        alt={`Invest in ${areaData.areaName}`}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6">
                    <div className="text-gray-600 leading-relaxed space-y-4">
                        <p>{areaData.description}</p>

                        <p>
                            This prestigious area offers exceptional investment opportunities with its prime location,
                            excellent transport links, and strong rental demand. The combination of historic charm
                            and modern amenities makes it an attractive choice for both residents and investors.
                        </p>

                        <p>
                            Property values in {areaData.areaName} have shown consistent growth over the years,
                            making it a solid investment choice. The area&apos;s unique character, cultural significance,
                            and proximity to major attractions ensure sustained demand from both domestic and
                            international buyers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaDetailsSection;