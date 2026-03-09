/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input, Button, Form, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSubscribeMutation } from "@/redux/service/subscribe/subscribeApi";
import { toast } from "sonner";

const { Title } = Typography;

export default function NewsletterSignup() {
  const [form] = Form.useForm();
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const onFinish = async (values: { email: string }) => {
    try {
      const response = await subscribe({ email: values.email }).unwrap();

      if (response.success) {
        toast.success("Subscription successful! Thank you for subscribing.");
        form.resetFields();
      } else {
        toast.error(
          response.message || "Subscription failed. Please try again later."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Subscription failed. Please try again later."
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "60px 20px",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
        <Title
          level={2}
          style={{
            color: "#2c3e50",
            marginBottom: "40px",
            fontSize: "25px",
            fontWeight: 600,
            lineHeight: "1.3",
          }}
        >
          Get the latest real estate news delivered to your inbox
        </Title>

        <div className="md:border md:bg-white py-2 p-3 rounded-md">
          <Form
            form={form}
            onFinish={onFinish}
            style={{
              display: "flex",
              gap: "20px",
              maxWidth: "800px",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
              style={{ flex: "1", minWidth: "300px", marginBottom: "0" }}
            >
              <Input
                placeholder="Enter email address*"
                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                size="large"
                style={{ height: "50px", fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0" }}>
        <Button
  type="primary"
  htmlType="submit"
  size="large"
  loading={isLoading}
  disabled={isLoading}
  style={{
    height: "50px",
    backgroundColor: "#d4b896",
    borderColor: "#d4b896",
    paddingLeft: "32px",
    paddingRight: "32px",
    fontSize: "16px",
    fontWeight: 500,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#c9a882";
    e.currentTarget.style.borderColor = "#c9a882";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#d4b896";
    e.currentTarget.style.borderColor = "#d4b896";
  }}
>
  {!isLoading && "Subscribe"}
</Button>

            </Form.Item>
          </Form>   
        </div>
      </div>
    </div>
  );
}
