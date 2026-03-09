/* components/pages/Home/LuxuryFiltermodal.tsx */
import { Modal, Collapse, Checkbox,  Divider } from "antd";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Panel } = Collapse;

interface LuxuryFilterModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: {
    listingType: string;
    squareFeet: string[];
    features: string[];
    lifestyles: string[];
  };
  onSubmit: (values: {
    listingType?: string;
    squareFeet?: string[];
    features?: string[];
    lifestyles?: string[];
  }) => void;
}

const LuxuryFilterModal = ({ open, onClose, initialValues, onSubmit }: LuxuryFilterModalProps) => {
  const [listingType, setListingType] = useState<string>(initialValues.listingType || "BUY");
  const [squareFeet, setSquareFeet] = useState<string[]>(initialValues.squareFeet || []);
  const [features, setFeatures] = useState<string[]>(initialValues.features || []);
  const [lifestyles, setLifestyles] = useState<string[]>(initialValues.lifestyles || []);

  // Mock data for features (replace with real API data)
  const featureCategories = [
    { name: "OUTDOOR", items: ["Garden", "Pool", "Patio", "Terrace"] },
    { name: "INDOOR", items: ["Air Conditioning", "Balcony", "Elevator", "Fireplace"] },
    { name: "VIEW", items: ["Ocean View", "City View", "Mountain View"] },
    { name: "LOT", items: ["Corner Lot", "Private Lot", "Waterfront"] },
  ];

  // Mock lifestyles
  const lifestyleOptions = [
    "Equestrian Homes",
    "Nature & Sustainability",
    "Urban & Modern",
    "High-End Fashion & Leisure",
    "Exclusive Housing & Properties",
  ];

  // Square feet options
  const sqftOptions = [
    "500+ sq ft",
    "1000+ sq ft",
    "1500+ sq ft",
    "2000+ sq ft",
    "3000+ sq ft",
    "5000+ sq ft",
  ];

  const handleApply = () => {
    onSubmit({
      listingType,
      squareFeet: squareFeet.length ? squareFeet : undefined,
      features: features.length ? features : undefined,
      lifestyles: lifestyles.length ? lifestyles : undefined,
    });
    onClose();
  };

  const handleClearAll = () => {
    setListingType("BUY");
    setSquareFeet([]);
    setFeatures([]);
    setLifestyles([]);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={680}
      centered
      closeIcon={null}
      styles={{
        content: {
          borderRadius: "12px",
          padding: 0,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Filters</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <CloseOutlined className="text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-4 space-y-6">
        {/* Listing Type */}
        <div>
          <h4 className="font-semibold mb-3">Listing Type</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setListingType("BUY")}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                listingType === "BUY"
                  ? "bg-[#D4B896] border-[#D4B896] text-black"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              FOR BUY
            </button>
            <button
              onClick={() => setListingType("RENT")}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                listingType === "RENT"
                  ? "bg-[#D4B896] border-[#D4B896] text-black"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              FOR RENT
            </button>
          </div>
        </div>

        <Divider className="my-0" />

        {/* Property Filters */}
        <div>
          <h4 className="font-semibold mb-3">Property Filters</h4>

          {/* Square Feet */}
          <Collapse
            bordered={false}
            ghost
            defaultActiveKey={["sqft"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-gray-600" />
              ) : (
                <PlusOutlined className="text-gray-600" />
              )
            }
            expandIconPosition="end"
            className="mb-4"
          >
            <Panel
              header={<span className="font-medium">Square Feet</span>}
              key="sqft"
              style={{ padding: "12px 0" }}
            >
              <Checkbox.Group
                value={squareFeet}
                onChange={(vals) => setSquareFeet(vals as string[])}
                className="flex flex-wrap gap-x-4 gap-y-2"
              >
                {sqftOptions.map((opt) => (
                  <Checkbox key={opt} value={opt}>
                    {opt}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
          </Collapse>

          {/* Features */}
          <Collapse
            bordered={false}
            ghost
            defaultActiveKey={["features"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-gray-600" />
              ) : (
                <PlusOutlined className="text-gray-600" />
              )
            }
            expandIconPosition="end"
            className="mb-4"
          >
            <Panel
              header={<span className="font-medium">Features</span>}
              key="features"
              style={{ padding: "12px 0" }}
            >
              {featureCategories.map((cat) => (
                <div key={cat.name} className="mb-3">
                  <div className="flex items-center gap-2 cursor-pointer p-2 bg-gray-50 rounded-md">
                    <PlusOutlined className="text-gray-500" />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                  <div className="ml-6 mt-2">
                    <Checkbox.Group
                      value={features}
                      onChange={(vals) => setFeatures(vals as string[])}
                      className="flex flex-wrap gap-x-4 gap-y-2"
                    >
                      {cat.items.map((item) => (
                        <Checkbox key={item} value={item}>
                          {item}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                </div>
              ))}
            </Panel>
          </Collapse>

          {/* Lifestyles */}
          <Collapse
            bordered={false}
            ghost
            defaultActiveKey={["lifestyles"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-gray-600" />
              ) : (
                <PlusOutlined className="text-gray-600" />
              )
            }
            expandIconPosition="end"
          >
            <Panel
              header={<span className="font-medium">Lifestyles</span>}
              key="lifestyles"
              style={{ padding: "12px 0" }}
            >
              <Checkbox.Group
                value={lifestyles}
                onChange={(vals) => setLifestyles(vals as string[])}
                className="flex flex-wrap gap-x-4 gap-y-2"
              >
                {lifestyleOptions.map((opt) => (
                  <Checkbox key={opt} value={opt}>
                    {opt}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={handleClearAll}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          CLEAR ALL
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-6 py-2 text-sm font-medium text-white bg-[#D4B896] hover:bg-[#C4A886] border border-[#D4B896] rounded-md transition-colors"
        >
          APPLY
        </button>
      </div>
    </Modal>
  );
};

export default LuxuryFilterModal;