/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PropertyFilter.tsx

import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

interface Props {
  onFilterChange: (filters: any) => void;
}

const PropertyFilter = ({ onFilterChange }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onFilterChange(values);
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item name="listingType">
        <Select placeholder="Listing Type" allowClear>
          <Option value="RENT">Rent</Option>
          <Option value="BUY">Buy</Option>
        </Select>
      </Form.Item>
      <Form.Item name="minPrice">
        <Input placeholder="Min Price" type="number" />
      </Form.Item>
      <Form.Item name="maxPrice">
        <Input placeholder="Max Price" type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Apply</Button>
      </Form.Item>
    </Form>
  );
};

export default PropertyFilter;
