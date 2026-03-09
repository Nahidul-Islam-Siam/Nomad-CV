/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Search } from "lucide-react";
import { useState } from "react";
import { useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi";
import Link from "next/link";
import MorgtgaeSection from "../Home/mortgaageSection";
import { useRouter } from "next/navigation";

interface Mortgage {
  id: string;
  name: string;
  email: string;            
  userStatus: string; 
  role: string; 
  phone: string; 
  profile?: {  
    Image?: { url: string }[];   
  };
}

const MortgageList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data, error, isLoading } = useGetPartnersQuery({
    role: "MORTGAGE",
    page: currentPage,
    limit,
  });

  const mortgages: Mortgage[] = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

  // --- Local search filter ---
  const filteredMortgages = mortgages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results page with query parameter
      router.push(`/search-page?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error fetching mortgage data.
      </div>
    );
  }

  return (
    <>
      {/* Background Search Section */}
      <div
        className="w-full h-[40vh] md:h-[70vh] bg-no-repeat bg-cover relative font-inter text-base md:text-xl md:mb-16 mb-20"
        style={{
          backgroundImage: `url("/assets/hero.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-6 w-full"> 
          <div className="max-w-7xl mx-auto px-4">
            <Card className="mx-auto shadow-lg border-0 p-2 md:max-w-[808px] w-full">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-2"
              >
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

      <div>
        <div className="mx-auto max-w-7xl">
          <MorgtgaeSection />
        </div>
        <div className="text-center mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold ">Featured Morgtage Advisers</h1>
        </div>
      </div>

      {/* Mortgage List */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredMortgages.length > 0 ? (
            filteredMortgages.map((mortgage) => (
              <Link href={`/mortgage/${mortgage.id}`} key={mortgage.id}>
                <Card className="hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden break-inside-avoid flex flex-col h-full bg-white border border-gray-200">
                  <CardContent className="p-4 sm:p-5 md:p-6 flex-1">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Image - Full width on mobile */}
                      <div className="md:w-40 md:min-w-0 w-full h-44 md:h-36 relative rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src={
                            mortgage?.profile?.Image?.[0]?.url ||
                            "/assets/a1.jpg"
                          }
                          alt={mortgage.name}
                          fill
                          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Text & Actions */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        {/* Name, Role, Email */}
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                            {mortgage.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {mortgage.role}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {mortgage.email}
                          </p>
                        </div>

                        {/* Status Badge - Mobile First Placement */}
                        <div className="mt-3 self-start">
                          <Badge
                            variant={
                              mortgage.userStatus === "ACTIVE"
                                ? "default"
                                : "destructive"
                            }
                            className={`text-xs px-2.5 py-0.5 capitalize ${
                              mortgage.userStatus === "ACTIVE"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }`}
                          >
                            {mortgage.userStatus}
                          </Badge>
                        </div>

                        {/* Action Buttons - Stack on small screens */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 justify-center py-2.5 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-sm font-medium"
                            asChild
                          >
                            <a
                              href={`tel:${mortgage.phone ?? ""}`}
                              aria-label={`Call ${mortgage.name}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 justify-center py-2.5 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-sm font-medium"
                            asChild
                          >
                            <a
                              href={`mailto:${mortgage.email}`}
                              aria-label={`Email ${mortgage.name}`}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full sm:col-span-2 text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M12 9v4m0 0l3-3m-3 3l-3-3"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-700">
                No Results Found
              </h4>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Fully Responsive */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 px-4">
            {/* Prev Button */}
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
              className="rounded-full w-10 h-10"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            {/* Page Numbers - Scrollable on small screens */}
            <div className="flex overflow-x-auto snap-x snap-mandatory max-w-[calc(100vw-120px)] sm:max-w-none mx-2 scrollbar-hide">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`mx-1 min-w-10 snap-center ${
                      currentPage === pageNum
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                        : "text-gray-700 hover:text-gray-900"
                    } transition-colors duration-150`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next page"
              className="rounded-full w-10 h-10"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MortgageList;
