'use client';

import { useState } from 'react';
import { useGetPartnersQuery } from '@/redux/service/allPartner/allPartnerApi';
import { Spin, Pagination } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AllMortgage() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, error, isLoading } = useGetPartnersQuery({
    page,
    limit,
    role: 'MORTGAGE',
  });

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error loading agents. Please try again later.
      </div>
    );
  }

  const agents = data?.data?.data || [];
  const meta = data?.data?.meta;

  if (agents.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        No agents found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Mortgage Agents</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-36 h-36 flex-shrink-0 relative">
              <Image
                src={agent.profile?.Image?.[0]?.url || '/placeholder.jpg'}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h2 className="text-lg font-semibold truncate">{agent.name}</h2>
              <p className="text-sm text-gray-600 truncate">
                {agent.profile?.company || 'No company listed'}
              </p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Email:</span> {agent.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> {agent.profile?.phone || 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Location:</span>{' '}
                {agent.profile?.city || 'Not provided'}
              </p>
              <Link href={`/dashboard/all-agent/${agent.id}`} passHref>
                <button className="mt-4 bg-[#E5D2B8] hover:bg-[#d6c2a4] text-black text-sm px-4 py-1.5 rounded-full transition w-full">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center">
          <Pagination
            current={meta.page}
            total={meta.total}
            pageSize={meta.limit}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
