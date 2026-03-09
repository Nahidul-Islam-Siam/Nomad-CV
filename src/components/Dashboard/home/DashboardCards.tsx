/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { HomeIcon } from "lucide-react";
import {
  useDeletePropertyByIdMutation,
  useGetDashboardPropertyDataQuery,
  useGetPropertyDataQuery,
  useMadeFeaturedPropertyMutation,
} from "@/redux/service/addProperty/propertyApi";
import { Spin, Table, Input, Button, Tooltip } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";

import { SearchOutlined } from "@ant-design/icons";

// Register chart elements
ChartJS.register(ArcElement, ChartTooltip, Legend);

export default function DashboardCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: propertyData, refetch, isLoading: tableLoading } =
    useGetDashboardPropertyDataQuery({
      page: currentPage,
      limit: 10,
    });

  const [madeFeaturedProperty, { isLoading: isToggling }] = useMadeFeaturedPropertyMutation();
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyByIdMutation();

  const { data: statsData, isLoading: statsLoading, isError } = useGetPropertyDataQuery();

  // Extract properties and pagination
  const properties = propertyData?.data?.data?.results || [];
  const totalPages = propertyData?.data?.meta?.totalPage || 1;

  // Filter based on search term
  const filteredProperties = properties.filter((property: any) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (statsLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" />
      </div>
    );
  if (isError || !statsData?.success) return <p>Failed to load dashboard stats.</p>;

  const stats = statsData.data;

  // Prepare region data for both progress bar and pie chart
  const regionList = Object.entries(stats.propertiesByCountry || {}).map(([name, count]) => ({
    name,
    units: count as number,
    progress: stats.totalProperties
      ? Math.round(((count as number) / stats.totalProperties) * 100)
      : 0,
  }));

  // Pie Chart Data
  const pieChartData = {
    labels: regionList.map((region) => region.name),
    datasets: [
      {
        data: regionList.map((region) => region.units),
        backgroundColor: ["#E2C59F", "#F8D8A3", "#D1A3A1", "#9E7B8A", "#C7A4A4", "#DDB6A6"],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    animation: { animateScale: true, animateRotate: true },
  };

  // Handle Delete Confirmation
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteProperty(id).unwrap();
        toast.success("Property deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Failed to delete property. Please try again.");
    }
  };

  // Handle Featured Toggle
  const handleToggleFeatured = async (id: string) => {
    const result = await Swal.fire({
      title: "Confirm Featured Status",
      text: "Do you want to toggle the featured status of this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await madeFeaturedProperty(id).unwrap();
        toast.success("Featured status updated successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to update featured status.");
        console.error("Failed to toggle featured:", error);
      }
    }
  };

  // Dynamic Columns for Ant Design Table
  const getColumns = () => {
    const baseColumns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 200,
        ellipsis: true,
        render: (text: string) => (
          <Tooltip title={text}>
            <span className="font-medium text-gray-900">
              {text?.length > 30 ? `${text.slice(0, 30)}...` : text}
            </span>
          </Tooltip>
        ),
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 180,
        ellipsis: true,
        render: (text: string) => (
          <Tooltip title={text}>
            <span className="text-gray-600">
              {text?.length > 40 ? `${text.slice(0, 40)}...` : text || "N/A"}
            </span>
          </Tooltip>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 100,
        render: (price: number) => <span className="font-medium">${price?.toLocaleString()}</span>,
      },
      {
        title: "City",
        dataIndex: ["City", "cityName"] as any,
        key: "city",
        width: 120,
        render: (city: string) => city || "N/A",
      },
      {
        title: "Bedrooms",
        dataIndex: "bedRooms",
        key: "bedRooms",
        width: 90,
      },
      {
        title: "Bathrooms",
        dataIndex: "bathRooms",
        key: "bathRooms",
        width: 90,
      },
      {
        title: "Status",
        dataIndex: "developmentStatus",
        key: "status",
        width: 100,
        render: (status: string) => (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {status}
          </span>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        fixed: "right" as const,
        render: (_: any, property: any) => (
          <div className="flex gap-2">
            <Button
              type="text"
              size="small"
              disabled={isToggling}
              onClick={() => handleToggleFeatured(property.id)}
              title={property.isFeatured ? "Remove from Featured" : "Make Featured"}
              style={{ color: property.isFeatured ? "#eab308" : "#9ca3af" }}
            >
              {property.isFeatured ? "★" : "☆"}
            </Button>
            <Button
              type="text"
              size="small"
              danger
              icon={<FiTrash2 />}
              disabled={isDeleting}
              onClick={() => handleDelete(property.id)}
            />
          </div>
        ),
      },
    ];
    // not nothingasd;fklasd'lf'asdofa[sdokf[asdkfasdfa]\sd[lkf\a]s[dkf]\a[sdfk]as[dpfka]sd[pkf]as[dpkf]\[asdpfk]\[akf][\asdpfk]\as]
    // Reset to first page when sort or searching changes

    // Use isMobile state instead of direct window check
    if (isMobile) {
      return [
        {
          title: "Property Details",
          key: "mobile",
          render: (_: any, property: any) => (
            <div className="py-3 border-b border-gray-100 last:border-b-0">
              <div className="font-semibold text-gray-900">
                {property.title?.length > 25 ? `${property.title.slice(0, 25)}...` : property.title}
              </div>
              <div className="text-sm text-gray-600 mt-1">{property.address}</div>
              <div className="text-blue-600 font-medium mt-1">${property.price}</div>
              <div className="text-xs text-gray-500 mt-1">
                City: {property.City?.cityName || "N/A"} | {property.bedRooms} bed •{" "}
                {property.bathRooms} bath
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {property.developmentStatus}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="text"
                    size="small"
                    disabled={isToggling}
                    onClick={() => handleToggleFeatured(property.id)}
                    style={{ color: property.isFeatured ? "#eab308" : "#9ca3af" }}
                  >
                    {property.isFeatured ? "★" : "☆"}
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<FiTrash2 />}
                    disabled={isDeleting}
                    onClick={() => handleDelete(property.id)}
                  />
                </div>
              </div>
            </div>
          ),
        },
      ];
    }

    return baseColumns;
  };

  return (
    <div className="space-y-10 p-4 md:p-6">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Properties */}
        <div className="bg-[#E2C59F] text-[#222] rounded-xl p-6 shadow-sm flex items-center gap-6">
          <HomeIcon className="text-white w-12 h-12" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Total Properties</h3>
            <div className="flex items-center justify-between mt-2">
              <div className="relative w-full h-2 bg-[#e9e6e0] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-2 bg-white rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="ml-4 text-3xl font-bold">{stats.totalProperties}</span>
            </div>
            <p className="text-sm mt-2 opacity-80">Live stats from database</p>
          </div>
        </div>

        {/* Sale & Rent Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-6 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.buyCount}</div>
              <div className="text-gray-600 text-sm">Properties for Sale</div>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E2C59F"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${parseFloat(stats.buyPercentage) * 1.76} 176`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{stats.buyPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl px-6 py-6 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.rentCount}</div>
              <div className="text-gray-600 text-sm">Properties for Rent</div>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E2C59F"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${parseFloat(stats.rentPercentage) * 1.76} 176`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{stats.rentPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Progress & Pie Chart */}
      <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Properties by Location</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Region Progress Bars */}
          <div className="w-full lg:w-1/2 max-w-xs mx-auto lg:mx-0">
            {regionList.length === 0 ? (
              <p className="text-gray-500 text-sm">No region data available</p>
            ) : (
              regionList.map((region, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{region.name}</span>
                    <span className="text-gray-500">{region.units} Units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#E2C59F]"
                      style={{ width: `${region.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Pie Chart */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            {regionList.length > 0 ? (
              <div style={{ width: "100%", maxWidth: 300, height: 300 }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No chart data available</p>
            )}
          </div>
        </div>
      </section>

      {/* Property Management Table */}
      <section className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <Input
            placeholder="Search properties..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 300 }}
            allowClear
          />
          <Button type="default" onClick={refetch} loading={isDeleting || isToggling}>
            Refresh
          </Button>
        </div>

        <Table
          dataSource={filteredProperties}
          columns={getColumns()}
          rowKey="id"
          loading={tableLoading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: totalPages * 10,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
          }}
          scroll={{ x: "max-content" }}
          bordered={false}
        />
      </section>
    </div>
  );
}