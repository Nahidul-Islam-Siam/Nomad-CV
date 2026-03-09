"use client";

import { useForm, Controller } from "react-hook-form";
import { Form, Input, DatePicker, Button, Checkbox, Card, Typography, Row, Col } from "antd";
import { FormData } from "@/interface/globalType"; // Adjust types accordingly
import { useAddRoleMutation } from "@/redux/service/registrationApi/registrationApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const { Title, Text } = Typography;

export default function RegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const Router = useRouter();

  const [addRole] = useAddRoleMutation();

  const onSubmit = async (data: FormData) => {
    // Simulate successful form submission
    console.log("Form Submitted", data);

    try {
      const res = await addRole(data).unwrap();

      if (res && res.message) {
        toast.success(res?.message);
        reset();
        Router.push("/");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch {
      toast.error("Error adding custom role:");
    }

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <Card className="border-none shadow-xl p-8 rounded-lg bg-white">
          <div className="text-center mb-6">
            <Title level={2} className="text-gray-800 mb-4">
              Registration Form
            </Title>
            <Text className="text-gray-600">Please fill out the form to complete your registration.</Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Phone Number*"
                  validateStatus={errors.phone ? "error" : ""}
                  help={errors.phone?.message}
                  className="mb-6"
                >
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your phone number" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Date of Birth*"
                  validateStatus={errors.dateOfBirth ? "error" : ""}
                  help={errors.dateOfBirth?.message}
                  className="mb-6"
                >
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: "Date of Birth is required" }}
                    render={({ field }) => (
                      <DatePicker {...field} placeholder="Select your date of birth" size="large" className="w-full" />
                    )}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Street Address*"
                  validateStatus={errors.streetAddress ? "error" : ""}
                  help={errors.streetAddress?.message}
                  className="mb-6"
                >
                  <Controller
                    name="streetAddress"
                    control={control}
                    rules={{ required: "Street Address is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your street address" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="City*"
                  validateStatus={errors.city ? "error" : ""}
                  help={errors.city?.message}
                  className="mb-6"
                >
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your city" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Zip Code*"
                  validateStatus={errors.zipCode ? "error" : ""}
                  help={errors.zipCode?.message}
                  className="mb-6"
                >
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={{ required: "Zip Code is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter zip code" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Region*"
                  validateStatus={errors.region ? "error" : ""}
                  help={errors.region?.message}
                  className="mb-6"
                >
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: "Region is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your region" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Country*"
                  validateStatus={errors.country ? "error" : ""}
                  help={errors.country?.message}
                  className="mb-6"
                >
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your country" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Present Address*"
                  validateStatus={errors.presentAddress ? "error" : ""}
                  help={errors.presentAddress?.message}
                  className="mb-6"
                >
                  <Controller
                    name="presentAddress"
                    control={control}
                    rules={{ required: "Present Address is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your present address" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Permanent Address*"
                  validateStatus={errors.permanentAddress ? "error" : ""}
                  help={errors.permanentAddress?.message}
                  className="mb-6"
                >
                  <Controller
                    name="permanentAddress"
                    control={control}
                    rules={{ required: "Permanent Address is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your permanent address" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Company*"
                  validateStatus={errors.company ? "error" : ""}
                  help={errors.company?.message}
                  className="mb-6"
                >
                  <Controller
                    name="company"
                    control={control}
                    rules={{ required: "Company is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter your company name" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Registration ID (Optional)" className="mb-6">
                  <Controller
                    name="registrationId"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Enter your Registration ID" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="National ID" className="mb-6">
                  <Controller
                    name="nationalId"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Enter your National ID" size="large" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Tax ID (Optional)" className="mb-6">
                  <Controller
                    name="TaxId"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Enter your Tax ID" size="large" />}
                  />
                </Form.Item>
              </Col>

    <Col span={24}>
  <Form.Item>
    <Checkbox>
      <Text className="text-sm">
        I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a>.
      </Text>
    </Checkbox>
  </Form.Item>
</Col>

              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
}
