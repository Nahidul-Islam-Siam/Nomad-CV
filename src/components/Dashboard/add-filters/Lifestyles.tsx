/* eslint-disable @typescript-eslint/no-explicit-any */

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
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  useAddLifestyleMutation,
  useDeleteLifestyleMutation,
  useGetLifestylesQuery,
  useUpdateLifestyleMutation,
} from "@/redux/service/filterAPI/lifestyleAPI";

const { Title } = Typography;

export interface Lifestyle {
  id: string;
  lifestyle?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LifestyleFormValues = {
  lifestyle: string;
};

export default function Lifestyles() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<{ visible: boolean; editing: string | null }>({
    visible: false,
    editing: null,
  });
 
  const { data, refetch } = useGetLifestylesQuery();
  const [addLifestyle] = useAddLifestyleMutation();
  const [updateLifestyle] = useUpdateLifestyleMutation();
  const [deleteLifestyle] = useDeleteLifestyleMutation();

const lifestyles = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (modal.editing && lifestyles.length) {
      const item = lifestyles.find((i) => i.id === modal.editing);
      if (item) {
        form.setFieldsValue({ lifestyle: item.lifestyle });
      }
    }
  }, [modal, lifestyles, form]);

  const handleSubmit = async (values: LifestyleFormValues) => {
    try {
      if (modal.editing) {
        const res = await updateLifestyle({
          id: modal.editing,
          lifestyle: values.lifestyle,
        }).unwrap();

        toast.success(res?.message || "Lifestyle updated");
      } else {
        const res = await addLifestyle(values).unwrap();
        toast.success(res?.message || "Lifestyle added");
      }

      setModal({ visible: false, editing: null });
      form.resetFields();
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save lifestyle");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLifestyle(id).unwrap();
      toast.success("Lifestyle deleted successfully");
      refetch();
    } catch {
      toast.error("Error deleting lifestyle");
    }
  };

  const columns = [
    {
      title: "Lifestyle",
      dataIndex: "lifestyle",
      key: "lifestyle",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Lifestyle) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setModal({ visible: true, editing: record.id });
            }}
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
          <Title level={3} className="!mb-0">Lifestyles</Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => {
              form.resetFields();
              setModal({ visible: true, editing: null });
            }}
          >
            Add Lifestyle
          </Button>
        </div>

        <Table
          dataSource={lifestyles}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Card>

      <Modal
        title={modal.editing ? "Edit Lifestyle" : "Add Lifestyle"}
        open={modal.visible}
        onCancel={() => {
          setModal({ visible: false, editing: null });
          form.resetFields();
        }}
        footer={null}
        width={500}
        centered
      destroyOnHidden
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="lifestyle"
            label="Lifestyle"
            rules={[{ required: true, message: "Please enter lifestyle" }]}
          >
            <Input placeholder="e.g., Equestrian Homes" />
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
