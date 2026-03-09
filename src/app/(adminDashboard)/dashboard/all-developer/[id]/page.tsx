/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeveloperProfile from "@/components/Dashboard/Developer/DeveloperProfile";
import DashboardCommonHeader from "@/components/Dashboard/shared/DashboardCommonHeader";
import FeaturedPropertise from "@/components/pages/Home/FeaturedPropertise";
import { useGetPartnerByIdQuery } from "@/redux/service/allPartner/allPartnerApi";

import { useParams } from "next/navigation";
import React from "react";

// Define a type for the agent data
export interface DeveloperData {
  id: string;
  name: string;
  email: string;
  profile: {
    company: string | null;
    phone: string | null;
    city: string | null;
    Image: { url: string }[];
  };
}

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  console.log(id);

 
  const { data, isLoading } = useGetPartnerByIdQuery({ id });

  if (!id) {
    return <div>Developer ID not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-full space-y-10">
      <DashboardCommonHeader title="Developer's Profile" />
      <DeveloperProfile id={id} data={data?.data} /> 
      <FeaturedPropertise />
    </div>
  );
}
