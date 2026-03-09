"use client";
import Image from "next/image";
import Link from "next/link";
import houseImage from "@/assets/about/about-2.jpg"; // Replace with your actual import

export default function BrandContactSection() {
  return (
    <section className="bg-[#f7f9fb] md:py-16 py-10  md:px-8 lg:px-16 font-inter">
      <div className="mx-auto container">
        {/*        
          <h2 className="text-3xl md:text-[40px] font-bold text-[#171a2a] mb-10 ">
            A Brand Like No Other
          </h2> */}

        <div className="bg-white rounded-xl shadow-sm  flex flex-col md:flex-row gap-6 items-center  p-2 md:p-0">
          {/* Left image */}
          <div
            className="w-full md:w-1/2 relative overflow-hidden rounded-md"
            style={{ height: "300px" }}
          >
            <Image
              src={houseImage}
              alt="Brand Image"
              fill
              className="object-cover"
            />
          </div>

          {/* Right content */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h3 className="text-3xl md:text-[40px] font-bold text-[#171a2a] ">
              Your Gateway to Local Expertise
            </h3>
            <p className="text-[#6c6c6c] md:text-sm text-xs font-normal">
              Access unparalleled local expertise within our global network. Our
              premier real estate professionals design bespoke strategies to
              secure the highest possible value for your home.
            </p>
            <Link
              href="/sell-with-us"
              className="w-max bg-[#E2C59F] text-[#171A2A] hover:bg-[#171A2A] hover:text-[#E2C59F] text-sm font-medium px-5 py-2 rounded-md border  transition"
            >
              Sell With Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
