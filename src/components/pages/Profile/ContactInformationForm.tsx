"use client";

import React from "react";
    import type { FormProps } from "antd";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { ContactInformationFormData } from "@/interface/globalType";

const ContactInformationForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: ContactInformationFormData) => {
        console.log("Contact Information Form Data:", values);
    };



    const onFinishFailed: FormProps<ContactInformationFormData>["onFinishFailed"] = (errorInfo) => {
        console.log("Form validation failed:", errorInfo);
    };

    return (
        <div className="container mx-auto pt-10 md:pt-16 lg:pt-20 2xl:pt-28">
            <Card className="border-4 border-[#DADADA] rounded-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="space-y-4"
                        requiredMark={false}
                    >
                        {/* Fast name */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Fast name*</span>}
                            name="firstName"
                            rules={[
                                { required: true, message: "Please enter your first name" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your fast name"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Last name */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Last name*</span>}
                            name="lastName"
                            rules={[
                                { required: true, message: "Please enter your last name" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your last name"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Email*</span>}
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Please enter a valid email address" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your name"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Phone number */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Phone number</span>}
                            name="phoneNumber"
                        >
                            <Input
                                placeholder="+0"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Street Address */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Street Address*</span>}
                            name="streetAddress"
                            rules={[
                                { required: true, message: "Please enter your street address" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your street address"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* City */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">City</span>}
                            name="city"
                        >
                            <Input
                                placeholder="Enter your city address"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Postal Code/ Zip Code */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Postal Code/ Zip Code</span>}
                            name="postalCode"
                        >
                            <Input
                                placeholder="Enter your postal/ zip code"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Street/Province/Region */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Street/Province/Region</span>}
                            name="streetProvinceRegion"
                        >
                            <Input
                                placeholder="Enter your Street/Province/Region"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Country */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Country</span>}
                            name="country"
                        >
                            <Input
                                placeholder="Enter your country name"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Agreement Checkbox */}
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            className="mt-6"
                        >
                            <Checkbox className="text-gray-600 text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum
                            </Checkbox>
                        </Form.Item>

                        {/* Save Changes Button */}
                        <Form.Item className="mb-0 mt-8">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="bg-[#E2C59F] hover:bg-[#D4B891] border-[#E2C59F] hover:border-[#D4B891] rounded-md font-medium px-8"
                            >
                                Save changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default ContactInformationForm;