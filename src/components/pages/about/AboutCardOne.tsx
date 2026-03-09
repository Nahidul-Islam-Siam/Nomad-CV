import Image from "next/image";
import React from "react";
import houseImg from "@/assets/about/about1.jpg"; // Replace with your actual import

export default function AboutCardOne() {
  return (
    <section className="  font-inter ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 bg-[#F7EEE3]">
        {/* Left Text Content */}
        <div className="md:w-1/2 pl-5 text-center py-5">
          <p className="text-[#6C6C6C] md:text-lg text-sm font-normal leading-relaxed">
            AIA Realty connects you to the world&apos;s leading real estate
            experts through our curated network of top-tier agencies. Experience
            the advantage of international resources paired with local expertise
            for a smarter, smooth property transaction, anywhere.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <div className="w-full h-auto  overflow-hidden shadow-md">
            <Image
              src={houseImg}
              alt="About Us Home"
              width={600}
              height={400}
              className="w-full h-auto object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
