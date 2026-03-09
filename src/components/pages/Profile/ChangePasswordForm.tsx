"use client";

import React from "react";
import { Form, Input, Button, Card, message } from "antd";
    import type { ValidateErrorEntity } from "rc-field-form/lib/interface";
interface ChangePasswordFormData {
    actualPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePasswordForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: ChangePasswordFormData) => {
        console.log("Change Password Form Data:", values);
        message.success("Password updated successfully!");
        form.resetFields();
    };



    const onFinishFailed = (errorInfo: ValidateErrorEntity<ChangePasswordFormData>) => {
        console.log("Form validation failed:", errorInfo);
        message.error("Please fill in all required fields correctly.");
    };

    return (
        <div className="container mx-auto py-10 md:py-16 lg:py-20 2xl:py-28">
            <Card className="border-4 border-[#DADADA] rounded-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="space-y-4"
                        requiredMark={false}
                    >
                        {/* Actual Password */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Actual Password</span>}
                            name="actualPassword"
                            rules={[
                                { required: true, message: "Please enter your current password" }
                            ]}
                        >
                            <Input.Password
                                placeholder="••••••••••"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                                visibilityToggle={false}
                            />
                        </Form.Item>

                        {/* New Password */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">New Password</span>}
                            name="newPassword"
                            rules={[
                                { required: true, message: "Please enter your new password" },
                                { min: 6, message: "Password must be at least 6 characters long" }
                            ]}
                        >
                            <Input.Password
                                placeholder="••••••••••"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                                visibilityToggle={false}
                            />
                        </Form.Item>

                        {/* Confirm new Password */}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Confirm new Password</span>}
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: "Please confirm your new password" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="••••••••••"
                                size="large"
                                className="rounded-md border-gray-300 focus:border-[#E2C59F] focus:ring-[#E2C59F]"
                                visibilityToggle={false}
                            />
                        </Form.Item>

                        {/* Update password Button */}
                        <Form.Item className="mb-0 mt-8">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="w-auto bg-[#E2C59F] hover:bg-[#D4B891] border-[#E2C59F] hover:border-[#D4B891] rounded-md font-medium"
                            >
                                Update password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default ChangePasswordForm;