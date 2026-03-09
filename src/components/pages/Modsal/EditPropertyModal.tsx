/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, InputNumber, Row, Col, Select, Tag, Upload, Spin, Typography } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd";
import { toast } from "sonner";


import { useGetFilterCityQuery } from "@/redux/service/filterAPI/CityFilterApi";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";
import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";

import { useDeletePropertyMediaMutation, useUpdatePropertyByIdMutation } from "@/redux/service/addProperty/propertyApi";
import PlaceSearchInput, { LatLng } from "@/app/(common)/add-property/SearchInput";
import { UploadFileStatus } from "antd/es/upload/interface";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

interface PropertyFormValues {
  cityId: string;
  propertyTypeId: string;
  lifestyleId: string;
  title: string;
  description: string;
  address: string;
  zipCode: string;
  lat: number;
  long: number;
  bedRooms: number;
  bathRooms: number;
  price: number;
  squareFeet: number;
  area: number;
  listingType: "BUY" | "RENT" | "SALE";
  developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
}

interface EditPropertyModalProps {
  open: boolean;
  onClose: () => void;
  propertyData?: any; // Pass existing property data for editing
    refetch: () => void; // Function to refetch property data after update
}

export default function EditPropertyModal({ open, onClose, propertyData,refetch }: EditPropertyModalProps) {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubFeaturesMap, setSelectedSubFeaturesMap] = useState<{ [category: string]: string[] }>({});
  const [coordinates, setCoordinates] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});
  const { data: categoriesData } = useGetFeaturesFilterQuery({});
  const { data: citiesData } = useGetFilterCityQuery({});
  const { data: lifestylesData } = useGetLifestylesQuery();
  const [updateProperty] = useUpdatePropertyByIdMutation();
 const [deletePropertyMedia] = useDeletePropertyMediaMutation()


const formatImageFiles = (images: { id: string; url: string }[]) => {
  return images.map((img, index) => ({
    uid: img.id,
    name: `image-${index}.jpg`,
    status: 'done' as UploadFileStatus,
    url: img.url,
  }));
};

const formatVideoFiles = (videos: { id: string; url: string }[]) => {
  return videos.map((vid, index) => ({
    uid: vid.id,
    name: `video-${index}.mp4`,
    status: 'done' as UploadFileStatus,
    url: vid.url,
    type: 'video/mp4',
  }));
};


useEffect(() => {
  if (propertyData) {
    form.setFieldsValue(propertyData);
    setCoordinates({ lat: propertyData.lat, lng: propertyData.long });

    if (propertyData.images && propertyData.images.length > 0) {
      setImageFileList(formatImageFiles(propertyData.images));
    } else {
      setImageFileList([]);
    }

    if (propertyData.video && propertyData.video.length > 0) {
      setVideoFileList(formatVideoFiles(propertyData.video));
    } else {
      setVideoFileList([]);
    }
  }
}, [propertyData, form]);

  const toggleSubFeature = (category: string, feature: string) => {
    setSelectedSubFeaturesMap((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(feature) ? current.filter((f) => f !== feature) : [...current, feature];
      return { ...prev, [category]: updated };
    });
  };

  const handleImageChange: UploadProps["onChange"] = ({ fileList }) => setImageFileList(fileList);
  const handleVideoChange: UploadProps["onChange"] = ({ fileList }) => setVideoFileList(fileList);
  const handleCategoryChange = (value: string) => setSelectedCategory(value);

  const onFinish = async (values: PropertyFormValues) => {
    if (!coordinates) return toast.error("Please select a location on the map.");

    const allSelectedSubFeatures = Object.values(selectedSubFeaturesMap).flat();
    const featureNames = [...allSelectedSubFeatures];

    const imageFiles = imageFileList.map((file) => file.originFileObj).filter((f): f is RcFile => !!f);
    const videoFile = videoFileList[0]?.originFileObj;



    const payload = {
      id: propertyData?.id,
      videos: videoFile,
      images: imageFiles,
      bodyData: {
        ...values,       
        featureNames,
        lat: coordinates.lat,
        long: coordinates.lng,
      },
    };



    

    setIsLoading(true);
    try {
      const res = await updateProperty(payload).unwrap();


      
      toast.success(res?.message || "Property updated successfully!");
      refetch();
      onClose();
    } catch {
      toast.error("An error occurred while updating the property.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={900} destroyOnClose>
      <Title level={4}>Edit Property</Title>
      <Spin spinning={isLoading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Property Type" name="propertyTypeId" rules={[{ required: true }]}>
                <Select placeholder="Select Type" size="large">
                  {propertyTypeData?.data?.map((type) => (
                    <Option key={type.id} value={type.id}>{type.type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="City" name="cityId" rules={[{ required: true }]}>
                <Select placeholder="Select City" size="large">
                  {citiesData?.data?.map((city) => (
                    <Option key={city.id} value={city.id}>{city.cityName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Lifestyle" name="lifestyleId" rules={[{ required: true }]}>
                <Select placeholder="Select Lifestyle" size="large">
                  {lifestylesData?.data?.map((life) => (
                    <Option key={life.id} value={life.id}>{life.lifestyle}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

      <Form.Item label="Location">
  <PlaceSearchInput 
    coordinates={coordinates as any} 
    setCoordinates={setCoordinates as any} 
  />
</Form.Item>



            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} size="large" min={0} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            
                        <Row gutter={[24, 24]}>
                          <Col xs={12} md={6}>
                            <Form.Item
                              label="Bedrooms"
                              name="bedRooms"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input the number of bedrooms!",
                                },
                                {
                                  type: "number",
                                  message: "Please enter a valid number for bedrooms!",
                                },
                              ]}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} size="large" type="number"/>
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item
                              label="Bathrooms"
                              name="bathRooms"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input the number of bathrooms!",
                                },
                                {
                                  type: "number",
                                  message: "Please enter a valid number for bathrooms!",
                                },
                              ]}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} size="large" type="number" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item
                              label="Square Feet"
                              name="squareFeet"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input the square footage!",
                                },
                                {
                                  type: "number",
                                  message: "Please enter a valid number for square feet!",
                                },
                              ]}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} size="large" type="number" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item
                              label="Area"
                              name="area"
                              rules={[
                                { required: true, message: "Please input the area!" },
                                {
                                  type: "number",
                                  message: "Please enter a valid number for area!",
                                },
                              ]}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} size="large" type="number"/>
                            </Form.Item>
                          </Col>
                        </Row>
            
                        <Row gutter={[24, 24]}>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label="Listing Type"
                              name="listingType"
                              rules={[{ required: true }]}
                            >
                              <Select placeholder="Select Listing Type" size="large">
                                <Option value="BUY">Buy</Option>
                                <Option value="RENT">Rent</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label="Development Status"
                              name="developmentStatus"
                              rules={[{ required: true }]}
                            >
                              <Select placeholder="Select Status" size="large">
                                <Option value="NEW_DEVELOPMENT">New Development</Option>
                                <Option value="DEVELOPED">Developed</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
            

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Bedrooms" name="bedRooms" rules={[{ required: true }]}>
                <InputNumber min={0} className="w-full" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Bathrooms" name="bathRooms" rules={[{ required: true }]}>
                <InputNumber min={0} className="w-full" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                <InputNumber min={0} className="w-full" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Square Feet" name="squareFeet" rules={[{ required: true }]}>
                <InputNumber min={0} className="w-full" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <TextArea rows={4} size="large" />
          </Form.Item>

<Form.Item label="Images">
  <Upload
    listType="picture-card"
    fileList={imageFileList}
    onChange={handleImageChange}
    onRemove={async (file) => {
      if (file.url) {
        try {


            const payload={
                propertyId: propertyData?.id,
                url: file.url,
                type: "image" as const,
            }
        
          await deletePropertyMedia(payload).unwrap();

 refetch();
          
          toast.success("Image deleted successfully");
          return true;
        } catch (error) {
          toast.error("Failed to delete image");
          return false; // stops UI from removing file
        }
      }
      return true;
    }}
    beforeUpload={() => false}
    multiple
  >
    <UploadOutlined /> Upload
  </Upload>
</Form.Item>



<Form.Item label="Video">
  <Dragger
    fileList={videoFileList}
    onChange={handleVideoChange}
    onRemove={async (file) => {
      if (file.url) {
        try {
          await deletePropertyMedia({
            propertyId: propertyData?.id,
            url: file.url,
            type: "video",
          }).unwrap();
            refetch();
          toast.success("Video deleted successfully");
          return true;
        } catch (error) {
          toast.error("Failed to delete video");
          return false;
        }
      }
      return true;
    }}
    beforeUpload={(file) => {
      const isMP4 =
        file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4");
      if (!isMP4) {
        toast.error("Only MP4 video files are allowed!");
        return Upload.LIST_IGNORE;
      }
      return false;
    }}
    maxCount={1}
    accept=".mp4"
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag MP4 video to upload</p>
  </Dragger>
</Form.Item>





          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              Update Property
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
