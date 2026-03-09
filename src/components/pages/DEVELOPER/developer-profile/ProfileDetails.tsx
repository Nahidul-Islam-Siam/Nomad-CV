/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  useGetProfilePropertyDetailsQuery,
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "@/redux/service/profileData";

import { ChangePassword } from "./ChangePassword";
import { useDeletePropertyByIdMutation } from "@/redux/service/addProperty/propertyApi";
import EditPropertyModal from "../../Modsal/EditPropertyModal";

export default function ProfileDetails() {
  const { data } = useGetUserQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data: propertyData, isLoading: isPropertyLoading, refetch } =
    useGetProfilePropertyDetailsQuery({ page: currentPage, limit: pageSize });
    const [deleteProperty] = useDeletePropertyByIdMutation()

  const profile = data?.data?.profile;
  const userData = data?.data;

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedProperty, setSelectedProperty] = useState<any>(null);

const handleEdit = (property: any) => {
  setSelectedProperty(property);
  setIsEditModalOpen(true);
};

// const closeModal = () => {
//   setIsEditModalOpen(false);
//   setSelectedProperty(null);
// };

  const [formData, setFormData] = useState({
    agencyName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    registrationNo: "",
    taxId: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    terms: false,
  });

  useEffect(() => {
    if (profile && userData) {
      setFormData({
        agencyName: profile?.company || "",
        email: userData?.email || "",
        phoneNumber: profile?.phone || "",
        streetAddress: profile?.streetAddress || "",
        city: profile?.city || "",
        postalCode: profile?.zipCode || "",
        state: profile?.region || "",
        country: profile?.country || "",
        registrationNo: profile?.registrationId || "",
        taxId: profile?.TaxId || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        terms: false,
      });

      const imageUrl =
        Array.isArray(profile?.Image) && profile.Image.length > 0
          ? profile.Image[0].url
          : null;
      setProfileImage(imageUrl);
    }
  }, [profile, userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImageFile) {
      toast("Please select a profile image.");
      return;
    }

    const bodyData = {
      name: formData.agencyName,
      phone: formData.phoneNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      zipCode: formData.postalCode,
      region: formData.state,
      country: formData.country,
      registrationId: formData.registrationNo,
      TaxId: formData.taxId,
      company: formData.agencyName,
    };

    try {
      const res = await updateUserProfile({
        image: profileImageFile,
        bodyData,
      }).unwrap();
      toast.success("Profile updated successfully!");
      console.log(res);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Something went wrong while updating profile.");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const properties = propertyData?.data?.properties ?? [];
  const pagination = propertyData?.data?.pagination;

 const handleDelete = async (id: number) => {






  // return
  


  try {
 await deleteProperty(String(id)).unwrap();





   
    toast.success("Property deleted successfully!");
    refetch();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete property.");
  }
};

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center mt-6 mb-8">
        <button className="bg-[#E2B887] text-white px-8 py-2 rounded-full text-sm font-medium shadow-none cursor-default">
          My Profile
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-4 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-4 relative">
            <div className="relative w-14 h-14">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full object-cover"
                  fill
                  sizes="56px"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 bg-gray-300 rounded-full" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                title="Change profile image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-base text-[#222]">
                  {formData.agencyName}
                </span>
              </div>
              <span className="text-xs text-[#666] block">
                {formData?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-8 mb-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Agency Name*", name: "agencyName" },
                { label: "Email*", name: "email", type: "email" },
                { label: "Phone number*", name: "phoneNumber" },
                { label: "Street Address*", name: "streetAddress" },
                { label: "City*", name: "city" },
                { label: "Postal Code*", name: "postalCode" },
                { label: "State/Province*", name: "state" },
                { label: "Country*", name: "country" },
                { label: "Registration No*", name: "registrationNo" },
                { label: "Tax ID*", name: "taxId" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-[#222] mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    id={field.name}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.label}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-[#E2B887] text-white px-8 py-2 rounded text-sm font-medium mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <ChangePassword />

        {/* Property List Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-8 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#222]">My Properties</h2>

          {/* Search bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">#</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Location</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Price</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isPropertyLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : properties.length > 0 ? (
                  properties
                    .filter((p) =>
                      p.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((property, index) => (
                      <tr key={property.id}>
                        <td className="px-4 py-2">
                          {index + 1 + (currentPage - 1) * pageSize}
                        </td>
                        <td className="px-4 py-2">{property.title}</td>
                        <td className="px-4 py-2">{property.address}</td>
                        <td className="px-4 py-2">${property.price}</td>
                        <td className="px-4 py-2 space-x-2">
                      <button
  className="text-blue-500 hover:underline"
  onClick={() => handleEdit(property)}
>
  Edit
</button>

<EditPropertyModal
  open={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  propertyData={selectedProperty}
  refetch={refetch}
/>


                          <button
                            className="text-red-500 hover:underline"
               onClick={() => handleDelete(property.id as number)}

                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No properties found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Showing {properties.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
              {Math.min(currentPage * pageSize, pagination?.total ?? 0)} of{" "}
              {pagination?.total ?? 0} results
            </span>
            <div className="space-x-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= (pagination?.totalPage ?? 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
