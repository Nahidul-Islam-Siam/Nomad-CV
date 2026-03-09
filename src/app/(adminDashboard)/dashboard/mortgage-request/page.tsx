// import AgentRequest from '@/components/Dashboard/agent/AgentRequest'
import MortgageRequest from "@/components/Dashboard/Mortgage/MortgagesRequest";

import DashboardCommonHeader from "@/components/Dashboard/shared/DashboardCommonHeader";

import React from "react";

export default function page() {
  return (
    <div>
      <DashboardCommonHeader title="Mortgage Request" />
      <MortgageRequest />
    </div>
  );
}
