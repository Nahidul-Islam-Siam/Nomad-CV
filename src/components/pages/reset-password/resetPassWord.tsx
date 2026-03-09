/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "antd";
import Image from "next/image";
import img from "@/assets/Auth/login.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/service/auth/authApi";
import { toast } from "sonner";

// Define the interface for form data
interface ResetPasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const router = useRouter();

  // Initialize reset password mutation with status flags
  const [resetPassword, { isLoading, isError, error, data }] =
    useResetPasswordMutation();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: email || "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        token: token || "",
        user: {
          email: formData.email,
          newPassword: formData.newPassword,
        },
      }).unwrap();

      if (response && response.message) {
        toast.success(response.message);
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:border text-black w-full">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="bg-black/50 absolute w-full h-full" />
        <Image
          src={img}
          alt="Wind turbine background"
          width={800}
          height={700}
          className="object-cover w-full h-[800px]"
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold pb-5">Set new password</h1>
          </div>

          <form className="space-y-10 pb-10" onSubmit={handleSubmit}>
            <div className="space-y-2 relative">
              <label htmlFor="newPassword" className="text-sm">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full pl-3 py-3 pr-10 border border-black rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[42px] right-3 text-gray-500"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-3 py-3 pr-10 border border-black rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[42px] right-3 text-gray-500"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 bg-[#E2C59F] text-lg font-semibold text-white"
              loading={isLoading}
            >
              Continue
            </Button>

            {isError && (
              <p className="text-red-500 text-sm">
                Error:{" "}
                {(error as any)?.data?.message || "Something went wrong."}
              </p>
            )}
            {data && (
              <p className="text-green-500 text-sm">
                Password reset successful!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
