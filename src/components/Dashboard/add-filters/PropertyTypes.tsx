/* eslint-disable react-hooks/exhaustive-deps */
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
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useCreatePropertyTypeFilterMutation,
  useDeletePropertyTypeFilterMutation,
  useGetPropertyTypesFilterQuery,
  useUpdatePropertyTypeFilterMutation,
} from "@/redux/service/filterAPI/PropertyTypeAPI";

const { Title } = Typography;

interface PropertyType {
  id: string;
  type: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

type PropertyTypeFormValues = {
  type: string;
};

export default function PropertyTypes() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<{ visible: boolean; editing: string | null }>({
    visible: false,
    editing: null,
  });

  const [createPropertyType] = useCreatePropertyTypeFilterMutation();
  const [updatePropertyType] = useUpdatePropertyTypeFilterMutation();
  const [deletePropertyType] = useDeletePropertyTypeFilterMutation();
  const { data, isLoading, refetch } = useGetPropertyTypesFilterQuery({
    page: 1,
    limit: 10,
  });

  const propertyTypes = data?.data || [];

  useEffect(() => {
    if (modal.editing && propertyTypes.length) {
      const item = propertyTypes.find((pt) => pt.id === modal.editing);
      if (item) {
        form.setFieldsValue({ type: item.type });
      }
    }
  }, [modal, propertyTypes, form]);

  const handleSubmit = async (values: PropertyTypeFormValues) => {
    try {
      if (modal.editing) {
        await updatePropertyType({
          id: modal.editing,
          type: values.type,
        }).unwrap();
        toast.success("Property type updated successfully");
      } else {
        await createPropertyType(values).unwrap();
        toast.success("Property type added successfully");
      }
      refetch();
      form.resetFields();
      setModal({ visible: false, editing: null });
    } catch {
      toast.error("Failed to save property type");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyType(id).unwrap();
      toast.success("Property type deleted successfully");
      refetch();
    } catch {
      toast.error("Error deleting property type");
    }
  };

  const columns = [
    {
      title: "Property Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, record: PropertyType) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() =>
              setModal({ visible: true, editing: record.id })
            }
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
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
          <Title level={3} className="!mb-0">Property Types</Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => {
              form.resetFields();
              setModal({ visible: true, editing: null });
            }}
          >
            Add Property Type
          </Button>
        </div>

        <Table
          dataSource={propertyTypes}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{
            pageSize: 10,
            total: data?.meta?.total || 0,
          }}
          loading={isLoading}
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={modal.editing ? "Edit Property Type" : "Add Property Type"}
        open={modal.visible}
        onCancel={() => {
          setModal({ visible: false, editing: null });
          form.resetFields();
        }}
        footer={null}
        centered
      destroyOnHidden
        width={500}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="type"
            label="Property Type"
            rules={[{ required: true, message: "Please enter property type" }]}
          >
            <Input placeholder="e.g., Cottage" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {modal.editing ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
