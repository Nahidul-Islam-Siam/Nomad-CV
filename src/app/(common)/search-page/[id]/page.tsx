"use client";

import PropertyDetails from "@/components/pages/PropertyDetails/PropertyDetails";
import { useGetPropertyByIdQuery } from "@/redux/service/addProperty/propertyApi";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import React from "react";

const PropertyDetailsPage = () => {
  const id = useParams().id as string;

  const { data: userData, isLoading } = useGetPropertyByIdQuery(id);

  // Transform to the expected prop shape
  const mappedData = userData
    ? {
        locations: [{ lat: userData.data.lat, long: userData.data.long }],
        results: [userData.data], 
      }
    : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto md:px-4 py-4">
      <PropertyDetails data={mappedData} />
    </div>
  );
};

export default PropertyDetailsPage;
