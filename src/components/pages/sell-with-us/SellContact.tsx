/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { ContactFormData } from '@/interface/globalType';
import { useAddContactMutation } from '@/redux/service/contactApi/contactApi';
import { toast } from 'sonner';

export default function SellContact() {
  const [addContact] = useAddContactMutation();
    const [form] = Form.useForm(); // Access the form instance

  // Handle form submission
  const onFinish = async (values: ContactFormData) => {
    try {
      // Call the mutation with form data
      const response = await addContact(values).unwrap();

      // Success or failure message based on the response
      if (response?.success) {
        toast.success(response?.message);
        form.resetFields()
      } else {
        toast.error(response?.message);
      }
    } catch {
      // Display generic error message
      message.error("There was an error submitting your message. Please try again.");

    }
  };

  // Handle failed form submission
  const onFinishFailed = (errorInfo: { errorFields: any[] }) => {
  
    toast.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <section className="bg-[#F5EBDE] py-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - About Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-4">Sell your property with our expert agents</h2>
            <p className="text-gray-700 leading-relaxed">
              For those who demand an elevated service like none other, there&apos;s Sotheby&apos;s International Realty.
              We&apos;re the industry&apos;s best agents, curating with incomparable attention to style and detail.
              We&apos;re here for you to help sell your property at a scale you just won&apos;t find anywhere else.
            </p>
          </div>

          {/* Right Side - Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <Form
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="flex flex-col gap-4"
            >
              {/* Full Name */}
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item label="Phone number" name="phone">
                <Input placeholder="Enter your phone number" size="large" />
              </Form.Item>

              {/* Message */}
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea placeholder="Write your message" rows={4} size="large" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-[#E2C7A7] hover:bg-[#D1B48C] rounded-md"
                  size="large"
                >
                  Send Now
                </Button>
              </Form.Item>
            </Form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
