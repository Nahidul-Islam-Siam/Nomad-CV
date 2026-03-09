"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

interface AreaCardProps {
    id: number;
    name: string;
    image: string | StaticImageData;
}

const AreaCard: React.FC<AreaCardProps> = ({ id, name, image }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col">
            <div className="relative h-64 w-full">
                <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="md:text-xl text-lg font-semibold text-gray-900 mb-4">
                    {name}
                </div>

                <Link href={`/areas/${id}`} className="w-full block">
                    <button className="mt-auto border text-[#E2C59F] w-full border-[#E2C59F] hover:bg-orange-50 transition-all rounded-full py-2 text-sm font-medium">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AreaCard;