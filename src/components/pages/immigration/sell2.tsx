/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SellSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search-page?searchQuery=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div
      className="w-full h-[40vh] md:h-[70vh] bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/hero.png')" }}
    >
      {/* Overlay content */}
      <div className="absolute bottom-6 w-full">
        <div className="max-w-2xl mx-auto px-4">
          {/* <h1 className="text-lg md:text-xl font-bold text-white text-center mb-4">
            Featured Properties and Immigration Lawyers
          </h1> */}

          {/* Search Form */}
          <Card className="mx-auto shadow-lg border-0 p-2">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by location or lawyer"
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none focus:ring focus:ring-blue-300"
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
  );
};

export default SellSearchSection;