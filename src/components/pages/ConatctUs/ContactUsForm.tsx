"use client"; 

import React from "react";
import { Form, Input,  Button, Card, message } from "antd";
import type { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ContactFormData } from "@/interface/globalType";
import { useAddContactMutation } from "@/redux/service/contactApi/contactApi";
import { toast } from "sonner";

const { TextArea } = Input;


const ContactUsForm: React.FC = () => {
    const [form] = Form.useForm();
    const [addContact] = useAddContactMutation()

    const onFinish = async(values: ContactFormData) => {
    try{
        const res = await addContact(values).unwrap();

        if(res?.success){
            toast.success(res?.message);
            form.resetFields();
        }
    }catch{
     toast.error("Something went wrong");
    }
    };
    const onFinishFailed = (errorInfo: ValidateErrorEntity<ContactFormData>) => {
        console.log("Form validation failed:", errorInfo);
        message.error("Please fill in all required fields correctly.");
    };

    return (
        <div className="flex justify-center items-center py-10 md:py-16 lg:py-10 2xl:py-28">
            <Card className="container mx-auto border-4 border-[#DADADA] rounded-2xl">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Us</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="space-y-6"
                        requiredMark={false}
                    >
                        {/* Full Name */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Full name*</span>}
                            name="name"
                            rules={[
                                { required: true, message: "Please enter your full name" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your name"
                                size="large"
                                className="rounded-lg border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
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
                                placeholder="Enter your email"
                                size="large"
                                className="rounded-lg border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                  {/* Full Name */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Subject*</span>}
                            name="subject"
                            rules={[
                                { required: true, message: "Please enter subject name" }
                            ]}
                        >
                            <Input
                                placeholder="Enter your subject"
                                size="large"
                                className="rounded-lg border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>


                        {/* Phone Number */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Phone number</span>}
                            name="phone"
                        >
                            <Input
                                placeholder="+0"
                                size="large"
                                className="rounded-lg border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                            />
                        </Form.Item>

                        {/* Message */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Message*</span>}
                            name="message"
                            rules={[
                                { required: true, message: "Please enter your message" }
                            ]}
                        >
                            <TextArea
                                placeholder="Write about your message"
                                rows={6}
                                className="rounded-lg border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F] resize-none"
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="w-full h-12 bg-[#E2C59F] hover:bg-[#D4B891] border-[#E2C59F] hover:border-[#D4B891] rounded-lg font-medium text-base"
                            >
                                Send Now
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default ContactUsForm;