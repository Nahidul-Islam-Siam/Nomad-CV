/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CardPage from "@/components/Filters/Card";
import LuxuryFilterModal from "@/components/pages/Home/LuxuryFiltermodal";
import {
  PropertyFilterParams,
  useGetPropertyQuery,
} from "@/redux/service/addProperty/propertyApi";
import { useGetFilterCityQuery } from "@/redux/service/filterAPI/CityFilterApi";

import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";
import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";
import {
  CloseOutlined,
  DownOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { CollapseProps, MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Dropdown,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Slider,
  Space,
  Spin,
  Typography,
} from "antd";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const bathroomOptions = [
  "1+ Bathrooms",
  "2+ Bathrooms",
  "3+ Bathrooms",
  "4+ Bathrooms",
];
const livingAreaOptions = [
  "1000+ sq ft",
  "2000+ sq ft",
  "3000+ sq ft",
  "4000+ sq ft",
];

export default function LuxuryHomesPage() {
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number | undefined]>([
    0,
    undefined,
  ]);
  const [sortOrder, setSortOrder] = useState<string>("Price High to Low");
  const [listingType, setListingType] = useState<string>("BUY");
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [beds, setBeds] = useState<number>(0);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>([]);
  const [selectedLivingArea, setSelectedLivingArea] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // API calls
  const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});
  const { data: lifestylesData } = useGetLifestylesQuery();
  const { data: categoriesData } = useGetFeaturesFilterQuery({});
  const { data: cityData } = useGetFilterCityQuery({}); // Load all cities

  useEffect(() => {
    const query = searchParams;

    if (query.get("priceRange")) {
      const [min, max] = query.get("priceRange")?.split(",").map(Number) ?? [
        0, 5000000,
      ];
      setPriceRange([min, max]);
    }
    if (query.get("sortOrder")) {
      setSortOrder(query.get("sortOrder") as string);
    }
    if (query.get("propertyType")) {
      setPropertyType(query.get("propertyType")?.split(",") ?? []);
    }
    if (query.get("beds")) {
      setBeds(Number(query.get("beds")));
    }
    if (query.get("lifestyle")) {
      setSelectedLifestyle(query.get("lifestyle")?.split(",") ?? []);
    }
    if (query.get("features")) {
      setSelectedFeatures(query.get("features")?.split(",") ?? []);
    }
    if (query.get("bathrooms")) {
      setSelectedBathrooms(query.get("bathrooms")?.split(",") ?? []);
    }
    if (query.get("livingArea")) {
      setSelectedLivingArea(query.get("livingArea")?.split(",") ?? []);
    }
    if (query.get("searchQuery")) {
      setSearchQuery(query.get("searchQuery") as string);
    }
    if (query.get("listingType")) {
      setListingType(query.get("listingType") as string);
    }
  }, [searchParams]);

  // Update URL params
  const updateUrlParams = (newParams: { [key: string]: any }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(newParams)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  };

  // Build search params
  const currentSearchParams: PropertyFilterParams = {};
  if (searchQuery) {
    currentSearchParams.searchTerm = searchQuery; // Used for both country and city
  }
  if (listingType) {
    currentSearchParams.listingType = listingType === "BUY" ? "BUY" : "RENT";
  }
  if (beds > 0) {
    currentSearchParams.minBedRooms = beds;
  }
  if (selectedBathrooms.length > 0) {
    const bathroomMin = Math.max(
      ...selectedBathrooms.map((opt) => parseInt(opt.match(/\d+/)?.[0] || "0"))
    );
    currentSearchParams.minBathRooms = bathroomMin;
  }
  if (selectedLivingArea.length > 0) {
    const livingAreaMin = Math.max(
      ...selectedLivingArea.map((opt) => parseInt(opt.match(/\d+/)?.[0] || "0"))
    );
    currentSearchParams.minSquareFeet = livingAreaMin;
  }
  if (priceRange[0] > 0) {
    currentSearchParams.minPrice = priceRange[0];
  }
  if (priceRange[1] !== undefined) {
    currentSearchParams.maxPrice = priceRange[1];
  }
  if (propertyType.length > 0) {
    currentSearchParams.propertyType = propertyType;
  }
  if (selectedLifestyle.length > 0) {
    currentSearchParams.lifestyle = selectedLifestyle;
  }
  if (selectedFeatures.length > 0) {
    currentSearchParams.featureNames = selectedFeatures;
  }

  const {
    data: propertiesData,
    isLoading: loadingProperties,
    isFetching,
  } = useGetPropertyQuery(currentSearchParams);

  const lifestyles =
    lifestylesData?.data?.map(
      (item: { lifestyle: string }) => item.lifestyle
    ) ?? [];

  // Handlers
  const handleLifestyleChange = (checkedValues: string[]) => {
    setSelectedLifestyle(checkedValues);
    updateUrlParams({ lifestyle: checkedValues.join(",") });
  };
  const handleFeatureChange = (checkedValues: string[]) => {
    setSelectedFeatures(checkedValues);
    updateUrlParams({ features: checkedValues.join(",") });
  };
  const handleBathroomChange = (checkedValues: string[]) => {
    setSelectedBathrooms(checkedValues);
    updateUrlParams({ bathrooms: checkedValues.join(",") });
  };
  const handleLivingAreaChange = (checkedValues: string[]) => {
    setSelectedLivingArea(checkedValues);
    updateUrlParams({ livingArea: checkedValues.join(",") });
  };
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    updateUrlParams({ sortOrder: value });
  };
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
    updateUrlParams({ priceRange: value.join(",") });
  };
  const handleTypeChange = (checkedValues: string[]) => {
    setPropertyType(checkedValues);
    updateUrlParams({ propertyType: checkedValues.join(",") });
  };
  const handleBedsChange = (value: number) => {
    setBeds(value);
    updateUrlParams({ beds: value });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateUrlParams({ searchQuery: value });
  };

  // Handle city selection → set searchQuery
  const handleCitySelect = (value: string) => {
    if (!value) return;
    setSearchQuery(value);
    updateUrlParams({ searchQuery: value });
  };

  // Collapse items
  const collapseItems: CollapseProps["items"] = [
    {
      key: "Lifestyle",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Lifestyle</div>,
      children: (
        <Checkbox.Group
          value={selectedLifestyle}
          onChange={handleLifestyleChange}
          style={{
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {lifestyles.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
    {
      key: "features",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Features</div>,
      children: (
        <div style={{ width: "100%" }}>
          {categoriesData?.data?.map((category) => (
            <div key={category.id}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>
                  {category.category}
                </div>
                <Checkbox.Group
                  value={selectedFeatures}
                  onChange={handleFeatureChange}
                  style={{ width: "100%" }}
                >
                  <Row gutter={[16, 8]}>
                    {category.subFeatures.map((feature) => (
                      <Col span={8} key={feature}>
                        <Checkbox value={feature}>{feature}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </div>
              {category.id !==
                categoriesData.data[categoriesData.data.length - 1].id && (
                <Divider style={{ margin: "12px 0" }} />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "bathrooms",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Bathrooms</div>,
      children: (
        <Checkbox.Group
          value={selectedBathrooms}
          onChange={handleBathroomChange}
          style={{
            width: "100%",
            paddingBottom: "12px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {bathroomOptions.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
    {
      key: "livingarea",
      label: (
        <div style={{ fontSize: "16px", fontWeight: 600 }}>Living Area</div>
      ),
      children: (
        <Checkbox.Group
          value={selectedLivingArea}
          onChange={handleLivingAreaChange}
          style={{
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {livingAreaOptions.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
  ];

  const dropdownContent = (
    <div
      style={{
        width: 680,
        padding: 24,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Button
          type="text"
          icon={<CloseOutlined />}
          size="small"
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <Collapse
        items={collapseItems}
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        expandIconPosition="end"
        ghost
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Checkbox.Group
          value={propertyType}
          onChange={handleTypeChange}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
            {propertyTypeData?.data?.map((type) => (
              <Checkbox key={type.id} value={type.type}>
                {type.type}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="w-full h-[40vh] md:h-[70vh] bg-no-repeat bg-cover relative font-inter text-base md:text-xl md:mb-24 mb-16"
        style={{
          backgroundImage: 'url("/assets/hero.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -bottom-12 w-full px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl md:px-3 px-3 md:py-3 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Location */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <Input
                  size="large"
                  placeholder="Search By Country"
                  style={{ paddingLeft: 40 }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {/* City Dropdown – updates searchQuery */}
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
                  onSelect={handleCitySelect}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>

              {/* Buy / Rent */}
              <div className="flex gap-2 w-full">
                {["BUY", "RENT"].map((type) => (
                  <Button
                    key={type}
                    size="large"
                    className="w-1/2"
                    onClick={() => {
                      setListingType(type);
                      updateUrlParams({ listingType: type });
                    }}
                    style={{
                      backgroundColor:
                        listingType === type ? "#D4B896" : "#fff",
                      borderColor: listingType === type ? "#D4B896" : "#d9d9d9",
                      color: listingType === type ? "#000" : "#666",
                      fontWeight: 500,
                    }}
                  >
                    FOR {type}
                  </Button>
                ))}
              </div>

              {/* Property Type */}
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button size="large" className="w-full">
                  {propertyType.length > 0
                    ? `${propertyType.length} Types Selected`
                    : "Property Type"}
                </Button>
              </Dropdown>

              {/* Price Range */}
              <Popover
                content={
                  <div style={{ width: 300, padding: 16 }}>
                    <div>
                      {priceRange[0].toLocaleString()} -{" "}
                      {priceRange[1]
                        ? priceRange[1].toLocaleString()
                        : "No max"}
                    </div>
                    <Slider
                      range
                      min={0}
                      max={5000000}
                      step={50000}
                      value={[priceRange[0], priceRange[1] ?? 5000000]}
                      onChange={(val) => {
                        const [min, max] = val as [number, number];
                        const actualMax = max === 5000000 ? undefined : max;
                        setPriceRange([min, actualMax]);
                        updateUrlParams({
                          priceRange: `${min},${actualMax ?? ""}`,
                        });
                      }}
                      tipFormatter={(v) => `$${v?.toLocaleString()}`}
                      style={{ marginTop: 16 }}
                    />
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginTop: "4px",
                      }}
                    >
                      Slide right to end for “No maximum”
                    </div>
                  </div>
                }
                trigger="click"
              >
                <Button size="large" className="w-full">
                  Price Range
                </Button>
              </Popover>

              {/* Beds */}
              <Select
                size="large"
                value={beds}
                onChange={handleBedsChange}
                placeholder="Beds"
                options={[
                  { label: "Any Bedrooms", value: 0 },
                  { label: "1+ Beds", value: 1 },
                  { label: "2+ Beds", value: 2 },
                  { label: "3+ Beds", value: 3 },
                  { label: "4+ Beds", value: 4 },
                  { label: "5+ Beds", value: 5 },
                ]}
              />

              <Button
                size="large"
                icon={<FilterOutlined />}
                onClick={() => setIsFilterModalOpen(true)}
                className="w-full"
              >
                More Filters
              </Button>

              <LuxuryFilterModal
                open={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                initialValues={{
                  listingType,
                  squareFeet: [], // You can pass actual state if needed
                  features: selectedFeatures,
                  lifestyles: selectedLifestyle,
                }}
                onSubmit={(values) => {
                  if (values.listingType) {
                    setListingType(values.listingType);
                    updateUrlParams({ listingType: values.listingType });
                  }
                  if (values.features !== undefined) {
                    setSelectedFeatures(values.features);
                    updateUrlParams({ features: values.features.join(",") });
                  }
                  if (values.lifestyles !== undefined) {
                    setSelectedLifestyle(values.lifestyles);
                    updateUrlParams({ lifestyle: values.lifestyles.join(",") });
                  }
                  // Add square feet logic if you implement it
                }}
              />

              {/* Search Button */}
              <Button
                size="large"
                type="primary"
                className="w-full"
                style={{
                  backgroundColor: "#D4B896",
                  borderColor: "#D4B896",
                  color: "#000",
                  fontWeight: 600,
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Property</Breadcrumb.Item>
          <Breadcrumb.Item>
            {listingType === "BUY" ? "For Sale" : "For Rent"}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Property for {listingType === "BUY" ? "Sale" : "Rent"}
            </Title>
            <Text type="secondary">
              {propertiesData?.data?.results?.length} properties found
            </Text>
          </div>
        </div>
      </div>

      {/* Results */}
      {loadingProperties || isFetching ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <CardPage filteredProperties={propertiesData?.data?.results || []} />
          {(propertiesData?.data?.results?.length ?? 0) > 0 && (
            <div className="text-center pb-8">
              <Button size="large">Load More Properties</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
