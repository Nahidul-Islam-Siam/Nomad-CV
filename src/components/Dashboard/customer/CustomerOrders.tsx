'use client'
import { Plus } from "lucide-react";
import { useState } from "react";
import AddAgentModal from "../agent/AddAgentModal";

import { Spin } from "antd";
import { useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi";



export default function CustomerOrders({ page }: { page?: string }) {
  const [showModal, setShowModal] = useState(false);
   const [currentPage, setCurrentPage] = useState(1)

  const [searchTerm, setSearchTerm] = useState("");

  // Fetching data from the API
  const { data, isLoading ,refetch} = useGetPartnersQuery({
    role: "AGENT", // Role filter only
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

 
  const agents = data?.data?.data || []; // Access the "data" key in the response


 

  return (
    <div className="bg-white p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => refetch()} 
          className="ml-4 bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          Refresh
        </button>
      </div>

      {page !== "agents" && (
        <>
          <div className="max-w-3xl 2xl:max-w-xl mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{agents?.length}</div>
                  <div className="text-gray-600 text-sm">Total Customer</div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="mb-5 bg-[#E5C7A0] text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-[#d6b98e] transition-colors ml-auto"
            >
              Add New
              <Plus />
            </button>
          </div>
        </>
      )}
      {showModal && <AddAgentModal setShowModal={setShowModal} />}

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Agent Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Agent ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Company Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Country</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents
                .filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((agent, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{agent?.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent?.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.profile?.company || "N/A"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent?.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.profile?.phone || "N/A"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent?.profile?.country || "N/A"}</td>
    
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
       <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm rounded ${currentPage === page ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
}
