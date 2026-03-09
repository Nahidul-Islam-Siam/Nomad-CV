/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateFilterCityMutation,
  useDeleteFilterCityMutation,
  useGetFilterCityQuery,
  useUpdateFilterCityMutation,
} from "@/redux/service/filterAPI/CityFilterApi";
import { useGetCountriesQuery } from "@/redux/service/filterAPI/countryAPI";
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
  Select,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const { Title } = Typography;

interface City {
  id: string;
  cityName: string;
  countryId: string;
  description: string;
  country?: { countryName: string };
}

type CityFormValues = {
  cityName: string;
  countryId: string;
  description: string;
  images: File[];
};

export default function Cities() {
  const { data: countryData, isLoading: countryLoading } =
    useGetCountriesQuery();
  const {
    data: cityData,
    isLoading: cityLoading,
    refetch,
  } = useGetFilterCityQuery({
    page: 1,
    limit: 10,
  });

  const [createCity] = useCreateFilterCityMutation();
  const [updateCity] = useUpdateFilterCityMutation();
  const [deleteCity] = useDeleteFilterCityMutation();

  const [modal, setModal] = useState<{
    visible: boolean;
    editingId: string | null;
  }>({
    visible: false,
    editingId: null,
  });

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modal.editingId && cityData?.data) {
      const city = cityData.data.find((c) => c.id === modal.editingId);
      if (city) {
        form.setFieldsValue({
          cityName: city.cityName,
          countryId: city.countryId,
          description: city.description,
        });
      }
    } else {
      form.resetFields();
    }
  }, [modal, cityData, form]);

  const handleSubmit = async (values: CityFormValues) => {
    const payload = {
      cityName: values.cityName.trim(),
      countryId: values.countryId,
      description: values.description.trim(),
    };

    setLoading(true);
    try {
      if (modal.editingId) {
        await updateCity({ id: modal.editingId, body: payload }).unwrap();
        toast.success("City updated successfully");
      } else {
        await createCity(payload).unwrap();
        toast.success("City added successfully");
      }
      refetch();
      setModal({ visible: false, editingId: null });
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save city");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCity = async (id: string) => {
    try {
      await deleteCity(id).unwrap();
      toast.success("City deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete city");
    }
  };

  const cityColumns = [
    {
      title: "City Name",
      dataIndex: "cityName",
      key: "cityName",
      ellipsis: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "countryName",
      render: (country: { countryName: string }) =>
        country?.countryName || "N/A",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, record: City) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => setModal({ visible: true, editingId: record.id })}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCity(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (countryLoading || cityLoading) return <div>Loading cities...</div>;

  return (
    <Col span={24}>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="!mb-0">
            Cities
          </Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setModal({ visible: true, editingId: null })}
          >
            Add City
          </Button>
        </div>

        <Table
          dataSource={cityData?.data || []}
          columns={cityColumns}
          rowKey="id"
          bordered
          pagination={false}
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={modal.editingId ? "Edit City" : "Add City"}
        open={modal.visible}
        onCancel={() => {
          setModal({ visible: false, editingId: null });
          form.resetFields();
        }}
        footer={null}
        centered
      destroyOnHidden
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="cityName"
            label="City Name"
            rules={[{ required: true, message: "Please enter city name" }]}
          >
            <Input placeholder="e.g., Barisal" />
          </Form.Item>

          <Form.Item
            name="countryId"
            label="Country"
            rules={[{ required: true, message: "Please select a country" }]}
          >
            <Select placeholder="Select a country">
              {countryData?.data?.map((country) => (
                <Select.Option key={country.id} value={country.id}>
                  {country.countryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              rows={3}
              placeholder="e.g., A riverine city in southern Bangladesh known for its waterways."
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2"
              loading={loading}
            >
              {modal.editingId ? "Update City" : "Add City"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
