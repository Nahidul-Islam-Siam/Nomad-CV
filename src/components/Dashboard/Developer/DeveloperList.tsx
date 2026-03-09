/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Plus } from "lucide-react";
import { useState } from "react";
import AddAgentModal from "../agent/AddAgentModal";
import { Spin } from "antd";
import { useDisablePartnerMutation, useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi";
import Swal from "sweetalert2";

// ✅ Reusable TruncatedText component for consistent font & tooltip
const TruncatedText = ({ text, maxLength = 20 }: { text: string; maxLength?: number }) => {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= maxLength) return <span>{text}</span>;

  return (
    <span>
      {expanded ? text : `${text.substring(0, maxLength)}...`}{" "}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 text-[12px] ml-1"
      >
        {expanded ? "See less" : "See more"}
      </button>
    </span>
  );
};

export default function DeveloperList({ page }: { page?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [disable] = useDisablePartnerMutation();

  const limit = 10;

  const { data, isLoading, refetch } = useGetPartnersQuery({
    role: "DEVELOPER",
    page: currentPage,
    limit,
    searchTerm,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const developers = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

 const handleDisable = async (id: string, isDeleted: boolean) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: isDeleted 
      ? "This developer will be enabled!" 
      : "This developer will be disabled!",
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
        `The developer has been ${isDeleted ? "enabled" : "disabled"}.`,
        "success"
      );
    } catch (error) {
      console.error("Failed to update developer:", error);
      Swal.fire("Error!", "Failed to update the developer.", "error");
    }
  }
};

  return (
    <div className="bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[14px]"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => refetch()}
          className="ml-4 bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors text-[14px]"
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
                  <div className="text-3xl font-bold text-gray-900 mb-1">{developers?.length}</div>
                  <div className="text-gray-600 text-[14px]">Total Developer</div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="mb-5 bg-[#E5C7A0] text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-[#d6b98e] transition-colors ml-auto text-[14px]"
            >
              Add New
              <Plus />
            </button>
          </div>
        </>
      )}
      {showModal && <AddAgentModal setShowModal={setShowModal} />}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Developer Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Company Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Country</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {developers
                .filter((developer) => developer.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((developer, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 ">
                  <td className="px-4 py-4 text-sm text-gray-900 text-[14px]">
  <TruncatedText text={developer.name} maxLength={20} />
</td>
<td className="px-4 py-4 text-sm text-gray-900 text-[14px]">
  <TruncatedText text={developer.profile?.company || "N/A"} maxLength={20} />
</td>
<td className="px-4 py-4 text-sm text-gray-900 text-[14px]">
  <TruncatedText text={developer.email} maxLength={25} />
</td>

                    <td className="px-4 py-4 text-[14px]"><TruncatedText text={developer.profile?.phone || "N/A"} /></td>
                    <td className="px-4 py-4 text-[14px]"><TruncatedText text={developer?.profile?.country || "N/A"} /></td>
                    <td className={`px-4 py-4 text-[14px] font-semibold ${developer?.isDeleted ? "text-red-600" : "text-green-600"}`}>
                      {developer?.isDeleted ? "Disabled" : "Active"}
                    </td>
           <td className="px-4 py-4 text-[14px]">
  <button
    onClick={() => handleDisable(developer.id, developer.isDeleted)}
    className={`px-3 py-1 text-sm rounded text-white ${
      developer.isDeleted ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
    }`}
  >
    {developer.isDeleted ? "Enable" : "Disable"}
  </button>
</td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`p-2 ${currentPage === 1 ? "text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-2 text-sm rounded ${currentPage === pageNum ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`p-2 ${currentPage === totalPages ? "text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
