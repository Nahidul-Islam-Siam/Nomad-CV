/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
import { Plus } from "lucide-react";
import { Spin } from "antd";
import Swal from "sweetalert2";
import AddAgentModal from "../agent/AddAgentModal";
import { useDisablePartnerMutation, useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi";

// Utility Component for truncating text
const TruncatedText = ({ text, maxLength }: { text: string; maxLength: number }) => {
  if (!text) return "N/A";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function DashboardAgentList({ page }: { page?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [disable] = useDisablePartnerMutation();

  const limit = 10;
  const { data, isLoading, refetch } = useGetPartnersQuery({
    role: "AGENT",
    page: currentPage,
    limit,
    searchTerm,
  });

  const agents = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

 const handleDisable = async (id: string, isDeleted: boolean) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: isDeleted 
      ? "This agent will be enabled!" 
      : "This agent will be disabled!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: isDeleted ? "#28a745" : "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: isDeleted ? "Yes, enable it!" : "Yes, disable it!",
  });

  if (result.isConfirmed) {
    try {
      await disable(id).unwrap(); // backend handles toggle
      refetch();
      Swal.fire(
        isDeleted ? "Enabled!" : "Disabled!",
        `The agent has been ${isDeleted ? "enabled" : "disabled"}.`,
        "success"
      );
    } catch (error) {
      console.error("Failed to update agent:", error);
      Swal.fire("Error!", "Failed to update the agent.", "error");
    }
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      {/* Search & Refresh */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => refetch()}
          className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500"
        >
          Refresh
        </button>
      </div>

      {/* Add Agent Button */}
      {page !== "agents" && (
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#E5C7A0] text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-[#d6b98e]"
          >
            Add New <Plus className="inline-block ml-1" />
          </button>
        </div>
      )}
      {showModal && <AddAgentModal setShowModal={setShowModal} />}

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[900px] text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Agent Name</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.length > 0 ? (
              agents
                .filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((agent, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[14px]">
                      <TruncatedText text={agent?.name} maxLength={18} />
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      <TruncatedText text={agent?.profile?.company ?? ""} maxLength={18} />
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      <TruncatedText text={agent?.email} maxLength={22} />
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {agent?.profile?.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {agent?.profile?.country || "N/A"}
                    </td>
                    <td className={`px-6 py-4 font-semibold text-[14px] ${agent?.isDeleted ? "text-red-600" : "text-green-600"}`}>
                      {agent?.isDeleted ? "Disabled" : "Active"}
                    </td>
                    <td className="px-4 py-4 text-[14px]">
  <button
    onClick={() => handleDisable(agent.id, agent.isDeleted)}
    className={`px-3 py-1 text-sm rounded text-white ${
      agent.isDeleted ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
    }`}
  >
    {agent.isDeleted ? "Enable" : "Disable"}
  </button>
</td>

                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`p-2 rounded ${currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-2 text-sm rounded ${currentPage === pageNum
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-100"}`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${currentPage === totalPages ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
