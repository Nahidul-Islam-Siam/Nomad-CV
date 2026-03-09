"use client";

import React from "react";
import "./custom_pagination.css"
import { Pagination } from "antd";

interface CustomPaginationProps {
    current: number;
    total: number;
    pageSize?: number;
    onChange: (page: number, pageSize: number) => void;
    className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    current,
    total,
    pageSize = 9,
    onChange,
    className = ""
}) => {
    return (
        <div className={`flex justify-end ${className}`}>
            <Pagination
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                showQuickJumper={false}
                size="default"
                className="custom-pagination"
            />
        </div>
    );
};

export default CustomPagination;