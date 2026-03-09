"use client";

import { useState, useMemo } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Select,
  Space,
  Row,
  Col,
  Collapse,
} from "antd";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";
import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => void;
}

type CheckboxValue = string | number;

const { Panel } = Collapse;

const squareFeetOptions = [
  { label: "500+ sq ft", value: "500" },
  { label: "1000+ sq ft", value: "1000" },
  { label: "1500+ sq ft", value: "1500" },
  { label: "2000+ sq ft", value: "2000" },
  { label: "3000+ sq ft", value: "3000" },
  { label: "5000+ sq ft", value: "5000" },
];

const FilterModal = ({ open, onClose, onSubmit }: FilterModalProps) => {
  const [filters, setFilters] = useState({
    listingType: "FOR BUY",

    squareFeet: [] as string[],
    acreageRange: [1, 5] as [number, number],
    exclusiveOnly: false,
    virtual: false,
    inPerson: false,
    openHousesOnly: false,
    selectedPropertyTypes: [] as string[],

    // change here: use an object to store selected features per category
    selectedFeaturesByCategory: {} as Record<string, string[]>,

    selectedLifestyles: [] as string[],
  });

  const [activePanels, setActivePanels] = useState<string[]>([
    "listing",
    "filters",
  ]);

  // API Queries
  const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});
  const { data: lifestyleData } = useGetLifestylesQuery();
  const { data: categoriesData } = useGetFeaturesFilterQuery({});

  const categorizedFeatures = useMemo(() => {
    return (
      categoriesData?.data?.map((category) => ({
        category: category.category,
        features: category.subFeatures.map((feature) => ({
          label: feature,
          value: feature,
        })),
      })) || []
    );
  }, [categoriesData]);

  const lifestyleOptions = useMemo(() => {
    return (
      lifestyleData?.data?.map((item) => ({
        label: item.lifestyle,
        value: item.id,
      })) || []
    );
  }, [lifestyleData]);

  // Handlers

  const handleSquareFeetChange = (checkedValues: string[]) => {
    setFilters((prev) => ({ ...prev, squareFeet: checkedValues }));
  };

  // 2. Update handleFeatureChange to accept category and new checked values for that category
  const handleFeatureChange = (
    category: string,
    checkedValues: CheckboxValue[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      selectedFeaturesByCategory: {
        ...prev.selectedFeaturesByCategory,
        [category]: checkedValues as string[],
      },
    }));
  };

  const handleLifestyleChange = (checkedValues: string[]) => {
    setFilters((prev) => ({ ...prev, selectedLifestyles: checkedValues }));
  };

  const handleClearAll = () => {
    setFilters({
      listingType: "FOR BUY",
      squareFeet: [],
      acreageRange: [1, 5],
      exclusiveOnly: false,
      virtual: false,
      inPerson: false,
      openHousesOnly: false,
      selectedPropertyTypes: [],
      selectedFeaturesByCategory: {} as Record<string, string[]>,
      selectedLifestyles: [],
    });
  };

  const handleApply = () => {
    const queryParams: Record<string, string> = {
      listingType: filters.listingType === "FOR BUY" ? "BUY" : "RENT",
      minArea: String(filters.acreageRange[0]),
      maxArea: String(filters.acreageRange[1]),
    };

    if (filters.squareFeet.length) {
      const squareFeetNums = filters.squareFeet.map(Number);
      queryParams.minSquareFeet = String(Math.min(...squareFeetNums));
      queryParams.maxSquareFeet = String(Math.max(...squareFeetNums));
    }

    if (filters.selectedLifestyles.length) {
      queryParams.lifestyle = filters.selectedLifestyles
        .map((id) => lifestyleOptions.find((l) => l.value === id)?.label)
        .filter(Boolean)
        .join(",");
    }

    // flatten all selected features from all categories
    const allSelectedFeatures = Object.values(
      filters.selectedFeaturesByCategory
    ).flat();

    if (allSelectedFeatures.length) {
      queryParams.featureNames = allSelectedFeatures.join(",");
    }

    if (filters.selectedPropertyTypes.length) {
      queryParams.propertyType = filters.selectedPropertyTypes
        .map((id) => {
          const type = propertyTypeData?.data?.find((t) => t.id === id);
          return type?.type;
        })
        .filter(Boolean)
        .join(",");
    }

    onSubmit(queryParams);
    onClose();
  };

  const handlePanelChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  const handleFilterChange = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      title={
        <div className="modal-header">
          <span className="modal-title">Filters</span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="close-button"
          />
        </div>
      }
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
      closeIcon={null}
      className="filter-modal"
    destroyOnHidden
    >
      <div className="modal-content">
        <Collapse
          activeKey={activePanels}
          onChange={handlePanelChange}
          bordered={false}
          expandIcon={({ isActive }) =>
            isActive ? <UpOutlined /> : <DownOutlined />
          }
          expandIconPosition="end"
          className="filter-collapse"
        >
          {/* Listing Type Section */}
          <Panel header="Listing Type" key="listing" className="filter-panel">
            <div className="section">
              <div className="section-header">
                <Select
                  defaultValue="Properties for Sale"
                  bordered={false}
                  suffixIcon={null}
                  className="listing-select"
                >
                  <Select.Option value="Properties for Sale">
                    Properties for Sale
                  </Select.Option>
                  <Select.Option value="Properties for Rent">
                    Properties for Rent
                  </Select.Option>
                </Select>
              </div>

              <div className="toggle-buttons">
                <Space size={8}>
                  <Button
                    type={
                      filters.listingType === "FOR BUY" ? "primary" : "default"
                    }
                    onClick={() => handleFilterChange("listingType", "FOR BUY")}
                    className={`toggle-button ${
                      filters.listingType === "FOR BUY" ? "active" : ""
                    }`}
                  >
                    FOR BUY
                  </Button>
                  <Button
                    type={
                      filters.listingType === "FOR RENT" ? "primary" : "default"
                    }
                    onClick={() =>
                      handleFilterChange("listingType", "FOR RENT")
                    }
                    className={`toggle-button ${
                      filters.listingType === "FOR RENT" ? "active" : ""
                    }`}
                  >
                    FOR RENT
                  </Button>
                </Space>
              </div>
            </div>
          </Panel>

          {/* Filter Rows */}
          <Panel
            header="Property Filters"
            key="filters"
            className="filter-panel"
          >
            <Collapse
              bordered={false}
              className="nested-collapse"
              expandIconPosition="end"
              defaultActiveKey={["squareFeet", "features", "lifestyles"]}
            >
              {/* Square Feet Filter */}
              <Panel header="Square Feet" key="squareFeet">
                <Checkbox.Group
                  options={squareFeetOptions}
                  value={filters.squareFeet}
                  onChange={handleSquareFeetChange}
                >
                  <Row gutter={[16, 8]}>
                    {squareFeetOptions.map((option) => (
                      <Col span={8} key={option.value}>
                        <Checkbox value={option.value}>{option.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Panel>

              {/* // 3. Update Features panel to pass category and use per-category selected values */}
              <Panel header="Features" key="features">
                <Collapse bordered={false}>
                  {categorizedFeatures.map(({ category, features }) => (
                    <Panel header={category} key={category}>
                      <Checkbox.Group
                        value={
                          filters.selectedFeaturesByCategory[category] || []
                        }
                        onChange={(checkedValues) =>
                          handleFeatureChange(category, checkedValues)
                        }
                      >
                        <Row gutter={[16, 8]}>
                          {features.map((option) => (
                            <Col span={8} key={option.value}>
                              <Checkbox value={option.value}>
                                {option.label}
                              </Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>

              {/* Lifestyles Filter */}
              <Panel header="Lifestyles" key="lifestyles">
                <Checkbox.Group
                  options={lifestyleOptions}
                  value={filters.selectedLifestyles}
                  onChange={handleLifestyleChange}
                >
                  <Row gutter={[16, 8]}>
                    {lifestyleOptions.map((option) => (
                      <Col span={8} key={option.value}>
                        <Checkbox value={option.value}>{option.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>

        {/* Footer */}
        <div className="modal-footer">
          <Button type="text" onClick={handleClearAll} className="clear-button">
            CLEAR ALL
          </Button>
          <Button type="primary" onClick={handleApply} className="apply-button">
            APPLY
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;

// CSS-in-JS styles (same as before)
const styles = `
  .filter-modal .ant-modal-header {
    border-bottom: none;
    padding-bottom: 16px;
  }
  
  .filter-modal .ant-modal-body {
    padding-top: 0;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-title {
    font-size: 24px;
    font-weight: normal;
  }
  
  .close-button {
    border: none;
    box-shadow: none;
  }
  
  .modal-content {
    padding: 0 0 24px 0;
  }
  
  .filter-collapse {
    background: transparent;
  }
  
  .filter-collapse > .ant-collapse-item {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .filter-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
  
  .filter-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    color: #666;
  }
  
  .filter-panel .ant-collapse-content-box {
    padding: 16px 0;
  }
  
  .section {
    margin-bottom: 16px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .listing-select {
    font-size: 14px;
    color: #666;
  }
  
  .toggle-buttons {
    margin-bottom: 20px;
  }
  
  .toggle-button {
    font-weight: 500;
    font-size: 13px;
  }
  
  .toggle-button.active {
    background-color: #D4B896;
    border-color: #D4B896;
    color: #000;
  }
  
  .checkbox-group {
    margin-top: 16px;
  }
  
  .checkbox-item {
    font-size: 13px;
    color: #666;
  }
  
  .filter-section {
    padding-top: 8px;
  }
  
  .filter-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px;
  }
  
  .filter-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .filter-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .filter-value {
    font-size: 14px;
    color: #666;
  }
  
  .clickable {
    cursor: pointer;
  }
  
  .filter-button {
    color: #999;
    padding: 0;
    min-width: 24px;
    height: 24px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
    margin-top: 24px;
  }
  
  .clear-button {
    color: #666;
    font-weight: 500;
    font-size: 13px;
    padding: 0;
    height: auto;
  }
  
  .apply-button {
    background-color: #D4B896;
    border-color: #D4B896;
    color: #000;
    font-weight: 500;
    font-size: 13px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
