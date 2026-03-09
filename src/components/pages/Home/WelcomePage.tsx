import { Col, Row } from "antd";

import Image from "next/image";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

import img1 from "@/assets/card-icon/image1.png";
import img2 from "@/assets/card-icon/image2.png";
import img3 from "@/assets/card-icon/image3.png";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <Row gutter={[32, 32]} align="middle" style={{ marginBottom: "48px" }}>
        <Col xs={24} lg={10}>
          <div style={{ paddingRight: "20px" }}>
            <Title
              level={1}
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "24px",
                color: "#171a2a",
              }}
            >
              {/* Welcome to our world */}
            </Title>
            <Paragraph
              style={{
                fontSize: "20px",
                color: "#6c6c6c",
                marginBottom: "32px",
                lineHeight: "1.6",
              }}
            >
              Discover the perfect balance of style and function with our
              premium interiors. From bold architectural statements to subtle
              minimalist touches, every space is thoughtfully designed to
              inspire and elevate modern living.
            </Paragraph>
            <button className="w-max bg-[#E2C59F] text-[#171A2A] hover:bg-[#171A2A] hover:text-[#E2C59F] text-sm font-medium px-5 py-2 rounded-md border  transition">
           <Link href="/development">
           
              Explore →
           </Link>
            </button>
          </div>
        </Col>
        <Col xs={24} lg={14}>
          <Image
            src={img1}
            alt="Modern interior with curved stairs"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>

      {/* Image Gallery Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Image
            src={img2}
            alt="Terraced agricultural fields on hillsides"
            width={500}
            height={300}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Image
            src={img3}
            alt="Mediterranean terrace with ocean view"
            width={500}
            height={300}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
