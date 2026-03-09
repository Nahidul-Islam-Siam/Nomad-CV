'use client';

import { Button, Form, Row, Col, Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface HeroSectionProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  backgroundImage?: string;
}

const HeroSectionWithSearchBar: React.FC<HeroSectionProps> = ({
  backgroundImage = "/assets/hero.png",

}) => {
  const [form] = Form.useForm();
  const [buyRent] = useState<string>("Buy");

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Search values:", { ...values, buyRent });
  };

  return (
    <div
      className="w-full h-[76vh] bg-no-repeat bg-cover relative font-inter text-base md:text-xl md:mb-24 mb-72"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-[-50%] md:bottom-[-10%] w-full">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0">
            <Form form={form} onFinish={handleSubmit} className="text-[#6C6C6C]">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={18}>
                  <Form.Item name="search" className="mb-0">
                    <Input
                      size="large"
                      placeholder="Search by Location"
                      prefix={<SearchOutlined />}
                      allowClear
                      className="w-full"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={6}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="w-full text-[#171A2A] h-[40px] bg-[#E2C59F] hover:bg-[#B8A366] border-[#CBB677] hover:border-[#B8A366]"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionWithSearchBar;
