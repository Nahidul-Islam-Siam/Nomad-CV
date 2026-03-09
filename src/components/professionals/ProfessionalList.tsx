/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail } from "lucide-react"
import { useState } from "react"
import { useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi"
import Link from "next/link"

const ProfessionalList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1) 
  const [limit] = useState(10) 

  // Fetch data based on current page
  const { data, error, isLoading } = useGetPartnersQuery({
    role: "PROFESSIONAL", 
    page: currentPage, 
    limit: limit
  })

  console.log(data, "data")

  // Handle loading and error states
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
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">Error fetching mortgage data.</p>
        </div>
      </div>
    )
  }

  const mortgages = data?.data?.data || []
  const totalPages = data?.data?.meta?.totalPage || 1 

  if (mortgages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No mortgage found.</p>
        </div>
      </div>
    )
  }

  // Handle pagination button click
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured mortgage</h1>
        <Select defaultValue="a-z">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a-z">Sort by: A to Z</SelectItem>
            <SelectItem value="z-a">Sort by: Z to A</SelectItem>
            <SelectItem value="status">Sort by: Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mortgages.map((mortgage: any) => (
      <Link href={`/mortgage/${mortgage?.id}`} key={mortgage?.id}>
            <Card key={mortgage?.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Agent Photo */}
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={mortgage?.profile?.Image?.[0]?.url}
                      alt={mortgage?.name || "Agent"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{mortgage?.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">Real Estate Agent</p>
                      <p className="text-sm text-gray-500">{mortgage?.email}</p>
                    </div>
                    <Badge
                      variant={mortgage?.userStatus === "ACTIVE" ? "default" : "destructive"}
                      className={`ml-2 ${mortgage?.userStatus === "ACTIVE" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}`}
                    >
                      {mortgage?.userStatus === "ACTIVE" ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "bg-orange-400 hover:bg-orange-500" : ""}
          >
            {i + 1}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </Button>
      </div>
    </div>
  )
}

export default ProfessionalList
