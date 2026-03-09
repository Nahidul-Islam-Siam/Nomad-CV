/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useAddCountryMutation,
  useDeleteCountryMutation,
  useGetCountriesQuery,
  useUpdateCountryNewMutation,
} from "@/redux/service/filterAPI/countryAPI";
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
  Input,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const { Title } = Typography;

export interface Country {
  id: string;
  countryName?: string;
}

export default function CountryComponent() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<{ visible: boolean; editingId: string | null }>({
    visible: false,
    editingId: null,
  });

  const [loading, setLoading] = useState(false);
  const { data, refetch, isLoading } = useGetCountriesQuery();
  const [addCountry] = useAddCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  const [updateCountryNew] = useUpdateCountryNewMutation();

const countries = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (modal.editingId) {
      const editData = countries.find((c) => c.id === modal.editingId);
      if (editData) {
        form.setFieldsValue({ countryName: editData.countryName });
      }
    } else {
      form.resetFields();
    }
  }, [modal, countries, form]);

  const handleSubmit = async (values: { countryName: string }) => {
    const { countryName } = values;
    setLoading(true);
    try {
      if (modal.editingId) {
        await updateCountryNew({
          id: modal.editingId,
          countryName: countryName.trim(),
        }).unwrap();
        toast.success("Country updated successfully");
      } else {
        await addCountry({ countryName: countryName.trim() }).unwrap();
        toast.success("Country added successfully");
      }
      refetch();
      setModal({ visible: false, editingId: null });
      form.resetFields();
    } catch (err: any) {
      const errorMessages = err?.data?.errorMessages;
      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((e: { message: string }) => toast.error(e.message));
      } else {
        toast.error(err?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCountry(id).unwrap();
      toast.success("Country deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete country");
    }
  };

  const columns = [
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, record: Country) => (
        <Space size="small">
          <Button
            size="small"
            type="default"
            icon={<EditOutlined />}
            onClick={() => setModal({ visible: true, editingId: record.id })}
          />
          <Button
            size="small"
            type="primary"
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
          <Title level={3} className="!mb-0">Countries</Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setModal({ visible: true, editingId: null })}
          >
            Add Country
          </Button>
        </div>

        <Table
          dataSource={countries}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          bordered
          pagination={false}
        />
      </Card>

      <Modal
        title={modal.editingId ? "Edit Country" : "Add Country"}
        open={modal.visible}
        onCancel={() => {
          setModal({ visible: false, editingId: null });
          form.resetFields();
        }}
        footer={null}
        centered
        width={450}
      destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="countryName"
            label="Country Name"
            rules={[{ required: true, message: "Country name is required" }]}
          >
            <Input placeholder="e.g., Bangladesh" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="mt-1"
            >
              {modal.editingId ? "Update Country" : "Add Country"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
