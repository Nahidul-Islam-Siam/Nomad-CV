'use client';

import { useState } from 'react';
import { useGetPartnersQuery } from '@/redux/service/allPartner/allPartnerApi';
import { Pagination, Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AllDeveloper() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading } = useGetPartnersQuery({
    page,
    limit,
    role: 'DEVELOPER',
  });

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading developers. Please try again later.</div>;
  }

  const developers = data?.data?.data || [];
  const meta = data?.data?.meta;

  if (developers.length === 0) {
    return <div className="text-center py-12 text-gray-500">No developers found.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="w-48 h-full flex-shrink-0 relative">
              <Image
                src={developer.profile?.Image?.[0]?.url || '/default-image.jpg'}
                alt={developer.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-1">{developer.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {developer.profile?.company || 'No company listed'}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Email:</span> {developer.email}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Phone:</span>{' '}
                {developer.profile?.phone || 'N/A'}
              </p>
              <p className="text-sm mb-4">
                <span className="font-medium">Location:</span>{' '}
                {developer.profile?.city || 'Not provided'}
              </p>
              <Link href={`/dashboard/all-developer/${developer.id}`}>
                <button className="mt-auto bg-[#E5D2B8] text-black text-sm px-4 py-2 rounded-full hover:bg-[#d6c2a4] transition">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center mt-10">
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
