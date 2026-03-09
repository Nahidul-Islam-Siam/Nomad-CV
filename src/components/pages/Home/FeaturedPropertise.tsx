/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import img from "@/assets/card-icon/hero1.png";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Right from "@/components/icon/Right"; 
import FeatureCard from "@/components/cards/FeatureCard";
import { useGetPropertyQuery } from "@/redux/service/addProperty/propertyApi";
import Link from "next/link";
import { Spin } from "antd";
 
const FeaturedPropertise: React.FC = () => {
  const { data, isLoading } = useGetPropertyQuery({});

  const swiperRef = useRef<SwiperType>();
 
  if(isLoading){
    return <div className="flex items-center justify-center h-screen"><Spin size="large" /></div>
  }



  return (
    <div className="max-w-7xl mx-auto px-2 pt-11 md:pt-0">


      
      <div className="w-full bg-white grid grid-cols-1  py-12 ">
        <div className=" ">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
              Featured Properties
            </h2>

            <p className="md:text-sm text-xs font-semibold text-[#E2C59F] flex items-center gap-2">
              <Link href="/search-page/">View All </Link>
              <span>
                {" "}
                <Right />
              </span>
            </p>
          </div>

          {/* Swiper (unchanged) */}
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !w-3 !h-3 !bg-gray-300 !opacity-100 transition-all duration-200",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-[#E2C59F] !w-8 !rounded-full",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            loop={true}
            className="!pb-12"
          >
            {data?.data?.results?.map((property: any) => (
              <SwiperSlide key={property.id} className="cursor-pointer">
                <FeatureCard
                  id={property.id}
                  name={property.title}
                  price={property.price}
                  image={property?.images?.[0]?.url || img}
                  address={property.address}
                  listingType={property.listingType}
                  isFeatured={property.isFeatured} // Pass the isFeatured prop
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertise;
