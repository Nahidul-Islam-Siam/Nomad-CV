import DashboardCard from "@/components/Dashboard/home/DashboardCards";

import React from "react";

const DashbaordPage = () => {
  return (
    <section className="">
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="md:text-2xl text-xl mb-5">
          Welcome to <span className="font-semibold">Aiarealty</span> Property
          Admin
        </p>
      </div>
      <DashboardCard />
    </section>
  );
};

export default DashbaordPage;
