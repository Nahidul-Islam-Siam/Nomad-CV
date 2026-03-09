"use client";

import React, { useState, useMemo } from "react";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { fakeAreasData } from "@/data/fakeAreasData";
import AreaCard from "@/components/cards/AreaCard";
import CustomPagination from "@/components/shared/CustomPagination/CustomPagination";

const AreasSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>("aToZ");
    const pageSize = 9;

    // Sort data based on selected option
    const sortedData = useMemo(() => {
        const data = [...fakeAreasData];
        switch (sortBy) {
            case "aToZ":
                return data.sort((a, b) => a.areaName.localeCompare(b.areaName));
            case "zToA":
                return data.sort((a, b) => b.areaName.localeCompare(a.areaName));
            default:
                return data;
        }
    }, [sortBy]);

    // Get current page data
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">All Areas</h2>

                <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    suffixIcon={<DownOutlined />}
                    className="w-48"
                    size="large"
                >
                    <Select.Option value="aToZ">Short By: A to Z</Select.Option>
                    <Select.Option value="zToA">Short By: Z to A</Select.Option>
                </Select>
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentData.map((area) => (
                    <AreaCard
                        key={area.id}
                        id={area.id}
                        name={area.areaName}
                        image={area.images[0]}
                    />
                ))}
            </div>

            {/* Pagination */}
            <CustomPagination
                current={currentPage}
                total={sortedData.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                className="mt-8"
            />
        </div>
    );
};

export default AreasSection;