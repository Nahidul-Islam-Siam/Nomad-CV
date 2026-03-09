/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import AgentProfile from "@/components/Dashboard/agent/AgentProfile";
import MortgageProfile from "@/components/Dashboard/Mortgage/MortgageProfile";
import DashboardCommonHeader from "@/components/Dashboard/shared/DashboardCommonHeader";
import FeaturedPropertise from "@/components/pages/Home/FeaturedPropertise";
import { useGetPartnerByIdQuery } from "@/redux/service/allPartner/allPartnerApi";

import { useParams } from "next/navigation";
import React from "react";

// Define a type for the agent data
export interface MortgageData {
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
//   console.log(id);

 
  const { data, isLoading } = useGetPartnerByIdQuery({ id });

  if (!id) {
    return <div>Mortgage ID not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-full space-y-10">
      <DashboardCommonHeader title="Mortgage's Profile" />
      <MortgageProfile id={id} data={data?.data} /> 
      <FeaturedPropertise />
    </div>
  );
}
