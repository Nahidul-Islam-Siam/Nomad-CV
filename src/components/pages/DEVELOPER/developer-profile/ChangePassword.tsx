/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useChangeUserPasswordMutation } from "@/redux/service/profileData";
import { toast } from "sonner";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [ChangePassword] = useChangeUserPasswordMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await ChangePassword({
        oldPassword: currentPassword,
        newPassword,
      }).unwrap();
      toast.success("Password updated successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-8 mb-8 shadow-sm">
      <h3 className="text-base font-semibold text-[#222] mb-6">
        Change Password
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-xs font-medium text-[#222] mb-1"
          >
            Current Password*
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full px-3 py-2 pr-12 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
            >
              {showPassword.current ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-xs font-medium text-[#222] mb-1"
          >
            New Password*
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full px-3 py-2 pr-12 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
            >
              {showPassword.new ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-[#222] mb-1"
          >
            Confirm New Password*
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full px-3 py-2 pr-12 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
            >
              {showPassword.confirm ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-[#E2B887] text-white px-8 py-2 rounded text-sm font-medium mt-2"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};
