"use client";
import Image from "next/image";
import houseImg from "@/assets/sell-with-us/sell1.jpg";
import Link from "next/link";
import CommonHeader from "@/components/shared/CommonHeader.tsx/CommonHeader";

import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SellSection() {
  return (
    <section className="bg-white py-0 font-inter relative">
      {/* Banner with embedded search bar */}
      <div
        className="w-full h-[40vh] md:h-[70vh] bg-no-repeat bg-cover relative font-inter text-base md:text-xl mb-16"
        style={{
          backgroundImage: `url("/assets/hero.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Search bar positioned at the bottom of the banner */}
        <div className="absolute bottom-6 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <Card className="mx-auto shadow-lg border-0 p-2 md:max-w-[808px] w-full">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search by location or lawyer"
                  className="flex-1 px-3  text-sm rounded-lg outline-none focus:ring focus:ring-blue-300"
                />
                <Button
                  type="submit"
                  size="default"
                  className="w-full sm:w-auto bg-[#E2C59F] hover:bg-[#B8A366] text-[#171A2A] border border-[#CBB677] hover:border-[#B8A366] px-6"
                >
                  <Search className="w-4 h-4 mr-1" /> Search
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

         <CommonHeader header="Sell With Us" />

      {/* Content below banner */}
      <div className="container mx-auto px-4">
     
        <div className="flex flex-col md:flex-row items-center gap-10 pt-4 py-10">
          {/* Left Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-[#171A2A] mb-4 md:text-[40px] text-2xl font-bold">
              Your Gateway to Local Expertise
            </h2>
            <p className="text-[#6C6C6C] md:text-sm text-sm font-normal leading-relaxed">
              Access unparalleled local expertise within our global network. Our
              premier real estate professionals design bespoke strategies to
              secure the highest possible value for your home.
            </p>

            <div className="mt-6">
              <Link
                href="/find-agent"
                className="inline-block bg-[#E2C59F] text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-[#B8A366] transition-colors"
              >
                Talk to our Agents
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-[380px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={houseImg}
                alt="About Us Home"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
