"use client";

import { useState } from "react";
import {
  useApprovedRejectPartnerMutation,
  useGetPartnersQuery,
} from "@/redux/service/allPartner/allPartnerApi";
import { Dropdown, Menu, Spin } from "antd";
import Link from "next/link";
import { toast } from "sonner";

export default function MortgageRequest({ page }: { page?: string }) {
  const [approvedRejectPartner] = useApprovedRejectPartnerMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useGetPartnersQuery({
    role: "MORTGAGE",
    page: currentPage,
    limit,
    searchTerm,
  });

  const handleApprovalStatusChange = async (id: string, status: string) => {
    try {
      const res = await approvedRejectPartner({ id, action: status }).unwrap();
      if (res?.message) toast.success(res.message);
      else toast.error("Failed to change status");
      refetch();
    } catch {
      toast.error("An error occurred while changing status.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const mortgages = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage || 1;

  const filteredAgents = mortgages.filter(
    (mortgage) => mortgage.approvalStatus === "PENDING"
  );

  const filteredAgentsBySearch = filteredAgents.filter((mortgage) =>
    mortgage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const actionMenu = (mortgageId: string) => (
    <Menu>
      <Menu.Item key="1">
        <button
          onClick={() => handleApprovalStatusChange(mortgageId, "APPROVED")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Approve
        </button>
      </Menu.Item>
      <Menu.Item key="2">
        <button
          onClick={() => handleApprovalStatusChange(mortgageId, "REJECTED")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Remove
        </button>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href={`/dashboard/all-agent/${mortgageId}`} passHref>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Details
          </button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
          className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
        >
          Refresh
        </button>
      </div>

      {page !== "mortgages" && (
        <div className="max-w-3xl mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {filteredAgentsBySearch.length || 0}
                </div>
                <div className="text-gray-600 text-sm">
                  Total Pending Mortgages
                </div>
              </div>
              <div className="text-gray-400">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                {[
                  "Mortgage Name",
                  "Mortgage ID",
                  "Company",
                  "Email",
                  "Status",
                  "Contact",
                  "Country",
                  "",
                ].map((title, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgentsBySearch.length > 0 ? (
                filteredAgentsBySearch.map((mortgage, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm">{mortgage.name}</td>
                    <td className="px-4 py-4 text-sm">{mortgage.id}</td>
                    <td className="px-4 py-4 text-sm">
                      {mortgage.profile?.company || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm">{mortgage.email}</td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          mortgage.approvalStatus === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : mortgage.approvalStatus === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {mortgage.approvalStatus || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {mortgage.profile?.phone || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {mortgage.profile?.country || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Dropdown
                        overlay={actionMenu(mortgage.id)}
                        trigger={["click"]}
                      >
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="text-gray-400"
                          >
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                          </svg>
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No Pending Mortgages
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-gray-700 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-2 text-sm rounded ${
                currentPage === pageNumber
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 border hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm text-gray-700 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
