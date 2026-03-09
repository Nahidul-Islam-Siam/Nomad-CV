/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetPropertyQuery } from "@/redux/service/addProperty/propertyApi";
import FeatureCard from "@/components/cards/FeatureCard";

export default function DevelopmentFeature() {
  const [visibleCount, setVisibleCount] = useState(6); 

  const { data, isLoading } = useGetPropertyQuery({
    developmentStatus: "DEVELOPED",
  });

  const fallbackImage = "/assets/default.jpg";

  // Handle Load More button click
  const handleLoadMore = () => {
    if (!data?.data?.results) return;

    // Show 6 more items, or all if fewer than 6 remain
    setVisibleCount((prev) => Math.min(prev + 6, data.data.results.length));
  };

  // Reset to initial count if needed (optional)
  const handleShowLess = () => {
    setVisibleCount(6);
  };

  // Skeleton loader count
  const skeletonCount = 6;

  // Get properties to display based on visibleCount
  const displayedProperties = data?.data?.results?.slice(0, visibleCount) || [];

  return (
    <section className="max-w-7xl mx-auto md:my-16 my-8 px-4 md:px-6">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(skeletonCount)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-lg bg-gray-200 h-72"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
            {displayedProperties.length > 0 ? (
              displayedProperties.map((property: any) => (
                <FeatureCard
                  key={property.id}
                  id={property.id}
                  name={property.title || "Untitled Property"}
                  price={property.price ?? "Price Unavailable"}
                  image={property?.images?.[0]?.url || fallbackImage}
                  address={property.address || "Unknown Address"}
                  listingType={property.listingType || "N/A"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No developed properties found.
              </p>
            )}
          </div>

          {/* Load More Button */}
          {data?.data?.results && data.data.results.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-center mt-10 gap-4">
              {visibleCount < data.data.results.length && (
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Load More
                </button>
              )}

              {visibleCount > 6 && (
                <button
                  onClick={handleShowLess}
                  className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}