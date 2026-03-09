/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateFeatureFilterApiMutation,
  useDeleteFeatureMutation,
  useGetFeaturesFilterQuery,
  useUpdateFeatureFilterMutation,
} from "@/redux/service/filterAPI/featureFilterApi";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { toast } from "sonner";

const { Title } = Typography;

interface Feature {
  id: string;
  category: string;
  subFeatures: string[];
}

type FeatureFormValues = {
  category: string;
  subFeatures: string[];
};

export default function Features() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<{ visible: boolean; editing: string | null }>({
    visible: false,
    editing: null,
  });

  const { data, isLoading, refetch } = useGetFeaturesFilterQuery({ page: 1, limit: 10 });
  const [createFeature] = useCreateFeatureFilterApiMutation();
  const [updateFeature] = useUpdateFeatureFilterMutation();
  const [deleteFeature] = useDeleteFeatureMutation();

  const features = data?.data || [];

  const handleFeatureSubmit = async (values: FeatureFormValues) => {
    const payload = {
      category: values.category,
      subFeatures: values.subFeatures,
    };

    try {
      if (modal.editing) {
        await updateFeature({ id: modal.editing, body: payload }).unwrap();
        toast.success("Feature updated successfully");
      } else {
        await createFeature(payload).unwrap();
        toast.success("Feature created successfully");
      }
      refetch();
      form.resetFields();
      setModal({ visible: false, editing: null });
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFeature(id).unwrap();
      toast.success("Feature deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const featureColumns = [
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Sub Features",
      dataIndex: "subFeatures",
      key: "subFeatures",
      render: (subFeatures: string[]) => (
        <Space wrap>
          {subFeatures.map((f) => (
            <Tag color="blue" key={f}>
              {f}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, record: Feature) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setModal({ visible: true, editing: record.id });
              form.setFieldsValue(record);
            }}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Col span={24}>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="!mb-0">Features</Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => {
              form.resetFields();
              setModal({ visible: true, editing: null });
            }}
          >
            Add Feature
          </Button>
        </div>

        <Table
          dataSource={features}
          columns={featureColumns}
          rowKey="id"
          bordered
          pagination={false}
          loading={isLoading}
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={modal.editing ? "Edit Feature" : "Add Feature"}
        open={modal.visible}
        onCancel={() => {
          setModal({ visible: false, editing: null });
          form.resetFields();
        }}
        footer={null}
        centered
      destroyOnHidden
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFeatureSubmit}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="OUTDOOR">OUTDOOR</Select.Option>
              <Select.Option value="INDOOR">INDOOR</Select.Option>
              <Select.Option value="AMENITIES">AMENITIES</Select.Option>
              <Select.Option value="SECURITY">SECURITY</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="subFeatures"
            label="Sub Features"
            rules={[{ required: true, message: "Please select sub features" }]}
          >
            <Select
              mode="tags"
              placeholder="Type or select sub features"
              tokenSeparators={[","]}
            >
              <Select.Option value="Balcony">Balcony</Select.Option>
              <Select.Option value="Swimming Pool">Swimming Pool</Select.Option>
              <Select.Option value="Tennis Court">Tennis Court</Select.Option>
              <Select.Option value="Deck">Deck</Select.Option>
              <Select.Option value="Outdoor Kitchen">Outdoor Kitchen</Select.Option>
              <Select.Option value="Garden">Garden</Select.Option>
              <Select.Option value="Parking">Parking</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {modal.editing ? "Update Feature" : "Add Feature"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
