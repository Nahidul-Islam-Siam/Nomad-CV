"use client";
import { Button } from "antd";
import Image from "next/image";

import img from "@/assets/Auth/login.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  return (
  <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={img}
        alt="Wind turbine background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Form */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center pb-5">
          Set new password
        </h1>

        <form className="space-y-8">
          <div className="space-y-2 relative">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full pl-3 py-3 pr-10 border border-black rounded"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full pl-3 py-3 pr-10 border border-black rounded"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button className="w-full py-6 bg-[#E2C59F] text-lg font-semibold text-white">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
