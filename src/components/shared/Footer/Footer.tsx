"use client";

import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import CountrySelect from "../CountrySelect";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function Component() {
  return (
    <Footer
      style={{
        backgroundColor: "#171A1C",
        color: "#ffffff",
        padding: "60px 50px 30px 50px",
      }}
      className="font-inter"
    >
      <div className="max-w-7xl mx-auto">
        <Row gutter={[48, 32]}>
          {/* Properties Column */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px", fontWeight: "bold", fontSize: "26px" }}>
              Properties
            </Title>
            <Space direction="vertical" size="middle">
              <Link href="/search-page?listingType=BUY" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                Property for Sale
              </Link>
              <Link href="/search-page?listingType=RENT" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                Property for Rent
              </Link>
              <Link href="/search-page" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                New Developments
              </Link>
            </Space>
          </Col>

          {/* AIREALTY Column */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px", fontWeight: "bold", fontSize: "26px" }}>
              AIAREALTY
            </Title>
            <Space direction="vertical" size="middle" style={{ marginBottom: "32px" }}>
              <Link href="/about-us" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                About Us
              </Link>
              {/* <Link href="/signup" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                Join Us
              </Link> */}
              <Link href="/contact" style={{ color: "#d9d9d9", fontSize: "20px" }}>
                Contact Us
              </Link>
                   <Link href="/privacy&policy" style={{ color: "#d9d9d9", fontSize: "20px" }}>
              Privacy Policy
              </Link>
            </Space>
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ color: "#d9d9d9", fontSize: "16px", display: "block", marginBottom: "12px" }}>
                Follow Us
              </Text>
              <Space size="middle">
                <Link href="#">
                  <InstagramOutlined style={iconStyle} />
                </Link>
                <Link href="#">
                  <FacebookOutlined style={iconStyle} />
                </Link>
                <Link href="#">
                  <LinkedinOutlined style={iconStyle} />
                </Link>
                <Link href="#">
                  <TwitterOutlined style={iconStyle} />
                </Link>
              </Space>
            </div>
          </Col>

          {/* Global Column with Country Select */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px", fontWeight: "bold", fontSize: "26px" }}>
              Global
            </Title>
            <CountrySelect />
          </Col>

          {/* Professional Column (no collapse) */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#ffffff", marginBottom: "24px", fontWeight: "bold", fontSize: "26px" }}>
              Professional
            </Title>
            <Space direction="vertical" size="middle">
              {[
                { label: "Real Estate Agents", href: "/find-agent" },
                { label: "Developers", href: "/developer" },
                { label: "Mortgage Advisers", href: "/mortgage" },
                { label: "Currency Exchange", href: "/currency-exchange" },
                { label: "Property & Immigration Lawyers", href: "/immigration" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ color: "#d9d9d9", fontSize: "18px", fontWeight: 400 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d4b896")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#d9d9d9")}
                >
                  {label}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#666", margin: "48px 0 24px 0" }} />

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "#d9d9d9", fontSize: 14, display: "block", marginBottom: 16 }}>
            Copyright (c) AIARealty International Real Estate. All Rights Reserved.
          </Text>
          <Space size="large" wrap>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Terms of Service
            </Link>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Privacy Policy
            </Link>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Cookies
            </Link>
          </Space>
        </div>
      </div>
    </Footer>
  );
}

const iconStyle: React.CSSProperties = {
  fontSize: "20px",
  padding: "8px",
  border: "2px solid #E2C59F",
  borderRadius: "50%",
  color: "#ffffff",
};