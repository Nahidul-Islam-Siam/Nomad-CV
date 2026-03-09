/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetCountriesQuery } from "@/redux/service/filterAPI/countryAPI";
import { Select, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Option } = Select;

export default function CountrySelect() {
  const { data: countryData, isLoading } = useGetCountriesQuery();
  const countries = countryData?.data || [];

  return (
    <Select
      showSearch
      placeholder={isLoading ? "Loading countries..." : "Select a country"}
      optionFilterProp="children"
      style={{ width: "100%" }}
      dropdownStyle={{ zIndex: 2000 }}
      notFoundContent={isLoading ? <LoadingOutlined spin /> : "No countries found"}
    >
      {countries.map((country: any) => (
        <Option key={country.id} value={country.slug}>
          <Link href={`/search-page?country=${country.slug}`} className="w-full block">
            <Space>{country.countryName}</Space>
          </Link>
        </Option>
      ))}
    </Select>
  );
}
