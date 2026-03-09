"use client"

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/Auth/forget.png";
import { ForgotPasswordResponse, useForgotPasswordMutation } from "@/redux/service/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form"; // Import React Hook Form
import { toast } from "sonner";

// Define the form data interface
interface ForgetPasswordFormData {
  email: string;
}

export default function ForgetPassword() {
  const [forgotPassword] = useForgotPasswordMutation();

  // Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordFormData>();

  // Handle form submission
const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (data) => {
const response = await forgotPassword({ email: data.email }).unwrap() as ForgotPasswordResponse;
  if (response) {
    toast.success(response?.message); 
  } else {
    toast.error("An error occurred"); 
  }
};;

  return (
  <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={img}
        alt="Forget Password Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg bg-white/90 backdrop-blur">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forget Password</h1>
          <p className="text-sm">Reset your password</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Please enter a valid email address"
                }
              })}
              className="w-full pl-3 py-3 border border-black rounded"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-6 bg-[#E2C59F] text-lg font-semibold text-white"
          >
            Send Verification Code
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Remember the password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
