// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import img from "@/assets/card-icon/hero1.png";
// import React, { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import Right from "@/components/icon/Right";
// import FeatureCard from "@/components/cards/FeatureCard";
// import type { Swiper as SwiperType } from "swiper"; 

// import Link from "next/link";
// import { useGetProfilePropertyDetailsQuery } from "@/redux/service/profileData";



// const PersonalProperties: React.FC = () => {



//   const { data: profileData } = useGetProfilePropertyDetailsQuery({page: 1, limit: 6});

//   console.log("Profile Data:", profileData);




  
//   const swiperRef = useRef<SwiperType>();

//   return (
//     <div className="container mx-auto">
//       <div className="w-full bg-white grid grid-cols-1  py-12 ">
//         <div className=" ">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">
//               New Properties
//             </h2>

//             <p className="text-sm font-semibold text-[#E2C59F] flex items-center gap-2">
//         <Link href="/search-page/">
        
//               View All{" "}
//         </Link>
//               <span>
//                 {" "}
//                 <Right />
//               </span>
//             </p>
//           </div>

//           {/* Swiper (unchanged) */}
//           <Swiper
//             onBeforeInit={(swiper) => {
//               swiperRef.current = swiper;
//             }}
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={24}
//             slidesPerView={1}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             pagination={{
//               clickable: true,
//               bulletClass:
//                 "swiper-pagination-bullet !w-3 !h-3 !bg-gray-300 !opacity-100 transition-all duration-200",
//               bulletActiveClass:
//                 "swiper-pagination-bullet-active !bg-[#E2C59F] !w-8 !rounded-full",
//             }}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 24,
//               },
//             }}
//             loop={true}
//             className="!pb-12"
//           >
//             {profileData?.data?.properties?.map((property: any) => (
//               // console.log(property),
//               <SwiperSlide key={property.id} className="cursor-pointer">
//                 <FeatureCard
//                   id={property.id}
//                   name={property.title}
//                   price={property.price}
//                   image={property?.images?.[0]?.url || img} 
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalProperties;
