/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form, Select, Card, Slider, Popover, Input } from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import FilterModal from "./FilterModal";

import { useRouter, useSearchParams } from "next/navigation";
// import { useGetCountriesQuery } from "@/redux/service/filterAPI/countryAPI";
import { useGetFilterCityQuery } from "@/redux/service/filterAPI/CityFilterApi";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";

const SearchForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyRent, setBuyRent] = useState<string>("Buy");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [priceRange, setPriceRange] = useState<[number, number | undefined]>([
    0,
    undefined,
  ]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const { data: countryData } = useGetCountriesQuery();
  const { data: cityData } = useGetFilterCityQuery({});
  const { data: propertyType } = useGetPropertyTypesFilterQuery({});

  // Prefill search input from URL
  useEffect(() => {
    const term = searchParams.get("searchQuery");
    if (term) setSearchQuery(term);
  }, [searchParams]);

  const handlePriceChange = (value: [number, number]) => {
    const [min, max] = value;
    const actualMax = max === 5000000 ? undefined : max;
    setPriceRange([min, actualMax]);
    form.setFieldsValue({ price: [min, actualMax] });
  };

  const handleSubmit = (values: Record<string, any>) => {
    const merged = { ...values, ...filters };
    const query = new URLSearchParams();

    // Combine search input and city
    let searchTerm = searchQuery;
    if (merged.city) {
      searchTerm = searchTerm ? `${searchTerm} ${merged.city}` : merged.city;
    }
    if (searchTerm) query.set("searchQuery", searchTerm);

    // Other filters
    if (merged.propertyType) query.set("propertyType", merged.propertyType);
    if (merged.bedrooms) query.set("beds", merged.bedrooms);
    if (merged.featureNames) query.set("featureNames", merged.featureNames);
    if (merged.lifestyle) query.set("lifestyle", merged.lifestyle);
    if (merged.listingType || buyRent) {
      query.set("listingType", merged.listingType || buyRent.toUpperCase());
    }
    if (merged.minArea) query.set("minArea", merged.minArea);
    if (merged.maxArea) query.set("maxArea", merged.maxArea);

    // Price range
    const [minPrice, maxPrice] = merged.price || priceRange;
    if (minPrice > 0 || maxPrice !== undefined) {
      query.set("priceRange", `${minPrice},${maxPrice ?? ""}`);
    }

    router.push(`/search-page?${query.toString()}`);
  };

  const handleFilterSubmit = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const priceContent = (
    <div style={{ width: 300, padding: 16 }}>
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>${priceRange[0].toLocaleString()}</span>
        <span>
          {priceRange[1] ? `$${priceRange[1].toLocaleString()}` : "No max"}
        </span>
      </div>
      <Slider
        range
        min={0}
        max={5000000}
        step={100000}
        value={[priceRange[0], priceRange[1] ?? 5000000]}
        onChange={(val) => handlePriceChange(val as [number, number])}
        onChangeComplete={() => setPopoverVisible(false)}
        tooltip={{
          formatter: (val) =>
            val !== undefined ? `$${val.toLocaleString()}` : "",
        }}
      />
      <div className="text-xs text-gray-500 text-center mt-1 italic">
        Slide right handle to end for “No maximum”
      </div>
    </div>
  );

  return (
    <Card className="w-full md:max-w-3xl lg:max-w-3xl :max-w-2xl mx-auto shadow-lg border-0 rounded-2xl overflow-hidden">
      <Form
        form={form}
        onFinish={handleSubmit}
        className="space-y-4 text-[#6C6C6C]"
        initialValues={{
          price: priceRange,
          listingType: buyRent.toUpperCase(),
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              size="large"
              placeholder="Search By Country"
              style={{ paddingLeft: 40 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* City Dropdown */}
          <Form.Item name="city" className="mb-0 w-full">
            <Select
              placeholder="City"
              size="large"
              suffixIcon={<DownOutlined />}
              options={
                Array.isArray(cityData?.data)
                  ? cityData.data.map((c: any) => ({
                      label: c.cityName,
                      value: c.cityName,
                    }))
                  : []
              }
              allowClear
            />
          </Form.Item>

          {/* Buy / Rent */}
          <div className="flex gap-2 w-full">
            {["Buy", "Rent"].map((type) => (
              <Button
                key={type}
                size="large"
                className="flex-1"
                onClick={() => {
                  setBuyRent(type);
                  form.setFieldsValue({ listingType: type });
                }}
                style={{
                  backgroundColor: buyRent === type ? "#E2C59F" : "#fff",
                  borderColor: buyRent === type ? "#CBB677" : "#d9d9d9",
                  color: buyRent === type ? "#171A2A" : "#6C6C6C",
                  fontWeight: 500,
                }}
              >
                FOR {type.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Property Type */}
          <Form.Item name="propertyType" className="mb-0 w-full">
            <Select
              placeholder="Property Type"
              size="large"
              suffixIcon={<DownOutlined />}
              options={
                Array.isArray(propertyType?.data)
                  ? propertyType.data.map((type: any) => ({
                      label: type.type,
                      value: type.slug,
                    }))
                  : []
              }
              allowClear
            />
          </Form.Item>

          {/* Price */}
          <Form.Item name="price " className="mb-0 w-full" noStyle>
            <Popover
              content={priceContent}
              title="Set Price Range"
              trigger="click"
              open={popoverVisible}
              onOpenChange={setPopoverVisible}
              overlayStyle={{ maxWidth: "90vw" }}
            >
              <Button
                size="large"
                block
                // icon={<DownOutlined />}
                className=" text-gray-400"
              >
                Price Range
                {/* ${priceRange[0].toLocaleString()} -{' '}
                {priceRange[1] ? `$${priceRange[1].toLocaleString()}` : "No max"}  */}
              </Button>
            </Popover>
          </Form.Item>

          {/* Bedrooms */}
          <Form.Item name="bedrooms" className="mb-0 w-full">
            <Select
              placeholder="Bedrooms"
              size="large"
              suffixIcon={<DownOutlined />}
              options={[
                { label: "Any Bedrooms", value: "" },
                { label: "1+ Beds", value: "1" },
                { label: "2+ Beds", value: "2" },
                { label: "3+ Beds", value: "3" },
                { label: "4+ Beds", value: "4" },
                { label: "5+ Beds", value: "5" },
              ]}
            />
          </Form.Item>

          {/* More Filters */}
          <Button
            type="default"
            size="large"
            icon={<FilterOutlined />}
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full"
          >
            More Filters
          </Button>

          {/* Save Search */}
          {/* <Button type="default" size="large" className="w-full">
            Save Search
          </Button> */}

          {/* Search */}
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full bg-[#E2C59F] hover:bg-[#B8A366] border-[#CBB677] hover:border-[#B8A366] text-[#171A2A]"
          >
            Search
          </Button>
        </div>
      </Form>

      <FilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSubmit={handleFilterSubmit}
      />
    </Card>
  );
};

export default SearchForm;
