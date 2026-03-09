"use client"
import { Row, Typography, Col } from "antd";

import Lifestyles from "@/components/Dashboard/add-filters/Lifestyles";
import PropertyTypes from "@/components/Dashboard/add-filters/PropertyTypes";
import Country from "@/components/Dashboard/add-filters/Country";
import Cities from "@/components/Dashboard/add-filters/Cities";
import Features from "@/components/Dashboard/add-filters/Features";

const { Title } = Typography;

export default function FilterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Title level={2} className="mb-6 text-left">
        Filter Management
      </Title>

      <Row gutter={[24, 32]}>
        <Col span={24}>
          <Lifestyles />
        </Col>
 
        <Col span={24}>
          <PropertyTypes />
        </Col>

        <Col span={24}>
          <Country />
        </Col>

        <Col span={24}>
          <Cities />
        </Col>

        <Col span={24}>
          <Features />
        </Col>
      </Row>
    </div>
  );
}
