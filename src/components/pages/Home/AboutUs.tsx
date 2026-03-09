"use client";
import Image from "next/image";
import houseImg from "@/assets/about/about5.jpg"; // Replace with your actual import

export default function AboutSection() { 
  return (
    <section className="bg-white py-16 font-inter">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Content */}
        <div className="md:w-1/2">
          <h2 className=" text-[#171A2A] mb-4 md:text-[40px] text-2xl font-bold">
            About Us
          </h2>
          {/* <h3 className="text-md font-semibold text-[#171A2A] first-letter:uppercase tracking-wide mb-4 md:text-base text-sm">
            Every home has a story
          </h3> */}
          <p className="text-[#6C6C6C] md:text-sm text-sm font-normal leading-relaxed">
            AIA Realty connects you to the world&lsquo;s leading real estate
            experts through our curated network of top-tier agencies. Experience
            the advantage of international resources paired with local expertise
            for a smarter, smooth property transaction, anywhere
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <div className="w-full h-auto rounded-xl max-w-[380px] overflow-hidden shadow-md">
            <Image
              src={houseImg}
              alt="About Us Home"
              width={300}
              height={250}
              className="w-full  h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
