"use client";

import { useState } from "react";
import {
  useApprovedRejectPartnerMutation,
  useGetPartnersQuery,
} from "@/redux/service/allPartner/allPartnerApi";
import { Dropdown, Menu, Spin } from "antd";
import Link from "next/link";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function DeveloperRequest({}: { page?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useGetPartnersQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    role: "DEVELOPER",
    searchTerm,
  });

  const [approvedRejectPartner] = useApprovedRejectPartnerMutation();

  const handleApprovalStatusChange = async (id: string, status: string) => {
    try {
      const res = await approvedRejectPartner({ id, action: status }).unwrap();

      if (res && res.message) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed to change status");
      }

      refetch();
    } catch (error) {
      console.error("Error changing approval status:", error);
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

  const agents = data?.data?.data || [];
  const meta = data?.data?.meta;

  const filteredAgents = agents.filter(
    (agent) => agent.approvalStatus === "PENDING"
  );

  const actionMenu = (agentId: string) => (
    <Menu>
      <Menu.Item key="1">
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => handleApprovalStatusChange(agentId, "APPROVED")}
        >
          Approve
        </button>
      </Menu.Item>
      <Menu.Item key="2">
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => handleApprovalStatusChange(agentId, "REJECTED")}
        >
          Remove
        </button>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href={`/dashboard/all-agent/${agentId}`} passHref>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Details
          </button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-6">
      {/* Search and Refresh */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="ml-4 bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Summary Card */}
      <div className="max-w-3xl 2xl:max-w-xl mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {filteredAgents.length}
              </div>
              <div className="text-gray-600 text-sm">Total Pending Agents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Agent Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Agent ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Company Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Country
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.profile?.company || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.profile?.phone || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {agent.profile?.country || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Dropdown
                        overlay={actionMenu(agent.id)}
                        trigger={["click"]}
                      >
                        <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                          <svg
                            width="20"
                            height="20"
                            fill="none"
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
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    No Pending Agents
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {meta?.totalPage && (
          <div className="flex gap-1">
            {Array.from({ length: meta.totalPage }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
