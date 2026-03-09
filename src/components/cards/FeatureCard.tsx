"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Locations from "@/components/icon/Locations";
import Link from "next/link";

interface FeatureCardProps {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData;
  address: string;
  listingType: "BUY" | "RENT";
  isFeatured?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  name,
  price,
  image,
  address,
  listingType,
  isFeatured,
}) => {
  const label = listingType === "BUY" ? "For Sale" : "For Rent";

  return (
    <div
     className="
    bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow
    overflow-hidden border border-gray-200 flex flex-col relative
    h-[490px] md:max-w-[380px] max-md:h-[430px] "

      tabIndex={-1} // make div focusable if you want better keyboard outlines
    >
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={typeof image === "string" ? image : image.src}
          alt={name}
          fill
          className="object-cover rounded-t-2xl"
          priority={isFeatured} // priority loading for featured properties
        />

        {/* Featured Tag */}
        {isFeatured && (
          <div
            className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
            role="status"
            aria-label="Featured property"
          >
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between text-[#6C6C6C] md:text-sm text-xs mb-1">
          <span>{label}</span>
          <span className="flex items-center gap-1 truncate max-w-[70%] md:max-w-[60%]">
            <Locations /> {address || "Unknown"}
          </span>
        </div>

        <div className="md:text-2xl text-lg font-bold text-gray-900 mb-2">
          ${price.toLocaleString()}
        </div>

        <div className="text-sm text-gray-600 mb-6 truncate">{name}</div>

        <Link href={`/search-page/${id}`} passHref legacyBehavior>
          <a
            className="mt-auto border text-[#E2C59F] border-[#E2C59F] hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2C59F] transition-all rounded-full py-2 text-sm font-medium w-full text-center block"
            aria-label={`View details for ${name}`}
          >
            View Details
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
