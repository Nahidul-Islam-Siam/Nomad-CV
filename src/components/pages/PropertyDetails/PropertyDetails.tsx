/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';

import { useState } from "react";
import {  Bed, Bath } from "lucide-react";
import PropertyHero from "./PropertyHero/PropertyHero";
import { Button, Input, Form } from "antd";
import { toast } from "sonner";
import { useAddContactPartnerMutation } from "@/redux/service/contactApi/contactApi";

const { TextArea } = Input;

export default function PropertyDetails({ data }: { data: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addContactPartner] = useAddContactPartnerMutation();
  const [form] = Form.useForm();

  const property = data?.results?.[0];

  const toEmail = property?.user?.email;

  if (!property) {
    return <div>No property data available.</div>;
  }

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  const onFinish = async (values: any) => {
    const payload = {
      to: toEmail,
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    try {
      const res = await addContactPartner(payload).unwrap();

      if (res?.success) {
        toast.success(res.message || "Message sent successfully!");
        form.resetFields();
      } else {
        toast.error(res.message || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <PropertyHero images={property?.images} />

      <div className="mt-10 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 ">
          <span>Home</span>
          <span>›</span>
          <span>Homes For Sale</span>
          <span>›</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white border-b-2 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {property?.title}
                  </h1>
                  <p className="text-3xl font-bold text-gray-900">
                    ${property?.price?.toLocaleString?.() || property?.price}
                  </p>
                </div>
                {/* <div className="flex space-x-2">
                  <Button icon={<Heart className="h-4 w-4" />} />
                  <Button icon={<Share2 className="h-4 w-4" />} />
                </div> */}
              </div>

              <div className="flex py-6 space-x-6 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span className="font-semibold text-gray-900">
                    {property?.bedRooms}
                  </span>
                  <span>Bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span className="font-semibold text-gray-900">
                    {property?.bathRooms}
                  </span>
                  <span>Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <section className="bg-white py-6 border-b-2 border-gray-200">
              <h2 className="text-lg font-semibold mb-4">FEATURES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-gray-600">
                {property.featureNames?.map((feature: string, idx: number) => (
                  <p key={idx}>{feature}</p>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="bg-white py-6 border-b-2 border-gray-200">
              <h2 className="text-lg font-semibold mb-4">DESCRIPTION</h2>
              <p className="text-gray-600 leading-relaxed">
                {showFullDescription
                  ? property?.description
                  : property?.description?.slice(0, 300) + "..."}
              </p>
              <button
                onClick={toggleDescription}
                className="text-blue-600 hover:text-blue-800 mt-2 font-medium"
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            </section>

            {/* Map */}
            <section className="bg-white py-6 border-b-2 border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">MAP</h2>
              <div className="h-80 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.google.com/maps?q=${property?.lat},${property?.long}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 border-2 shadow-lg rounded-lg border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-2"
                >
                  <Form.Item
                    label="Full Name*"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>

                  <Form.Item
                    label="Email*"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Enter a valid email address" },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    label="Subject*"
                    name="subject"
                    rules={[
                      { required: true, message: "Please enter a subject" },
                    ]}
                  >
                    <Input placeholder="Subject" />
                  </Form.Item>

                  <Form.Item
                    label="Message*"
                    name="message"
                    rules={[
                      { required: true, message: "Please enter your message" },
                    ]}
                  >
                    <TextArea rows={4} placeholder="Write your message" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="w-full bg-[#e2c59f] py-5 text-black font-bold hover:bg-amber-700"
                    >
                      Send Now
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
