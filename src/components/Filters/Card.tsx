"use client";

import React from "react";
import { Row, Col, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/interface/globalType";
import Locations from "@/components/icon/Locations";

interface FilterProps {
  filteredProperties: Property[] | [];
  loading?: boolean;
}

const CardPage: React.FC<FilterProps> = ({ filteredProperties, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <Row gutter={[16, 16]} className="flex">
        {filteredProperties.map((property) => (
          <Col xs={20} sm={12} md={8} lg={6} key={property.id} className="flex">
            {/* Fixed Size Wrapper */}
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col w-full"
              style={{
                height: "490px", 
                maxWidth: "380px", 
                margin: "0 auto", 
              }}
              tabIndex={-1}
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={property.images[0]?.url || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 768px) 320px, (max-width: 1200px) 320px, 320px"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Listing Type & Location */}
                <div className="flex justify-between text-[#6C6C6C] text-xs mb-1">
                  <span>Homes For {property.listingType}</span>
                  <span className="flex items-center gap-1 truncate max-w-[70%]">
                    <Locations /> {property.address || "Unknown"}
                  </span>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ${property.price.toLocaleString()}
                </div>

                {/* Features */}
                <div className="text-sm text-gray-600 mb-6 truncate">
                  {property.featureNames?.slice(0, 4).join(", ") ||
                    "Modern home with great views"}
                </div>

                {/* View Details Button */}
                <Link href={`/search-page/${property.id}`} passHref legacyBehavior>
                  <a
                    className="mt-auto border text-[#E2C59F] border-[#E2C59F] hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2C59F] transition-all rounded-full py-2 text-sm font-medium w-full text-center block"
                    aria-label={`View details for ${property.title}`}
                  >
                    View Details
                  </a>
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardPage;