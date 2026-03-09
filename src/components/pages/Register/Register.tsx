"use client";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import img from "@/assets/Auth/signUP.png";
import { Eye, EyeOff } from "lucide-react";
import {
  useRegisterUserMutation,
  UserRole,
} from "@/redux/service/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Define RegisterRequest interface
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  res: string;
  role: UserRole; // Using the UserRole enum for role
  confirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterRequest>();

  const confirmPassword = watch("confirmPassword");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data: RegisterRequest) => {
    if (data.password !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      const res = await registerUser(data).unwrap();
      if (res && res.message) {
        toast.success(res?.message);
        router.push(`/email-verification?email=${data.email}`);
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch {
      toast.error("Registration failed");
    }
  };

  return (




 <div className="relative w-full h-screen flex items-center justify-center">
    {/* Background Image */}
    <Image
      src={img}
      alt="Sign Up Background"
      layout="fill"
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Form Container */}
    <div className="relative z-10 w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg bg-white/90 backdrop-blur">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Join Now</h1>
        <p className="text-sm">Register your account</p>
      </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
             <label htmlFor="name" className="text-sm">
               Name
             </label>
             <input
                id="name"
                type="text"
                placeholder="Enter your Name"
                className="w-full pl-3 py-3 border border-black rounded"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-3 py-3 border border-black rounded"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>


            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-3 py-3 pr-10 border border-black rounded"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full py-3 pl-3 pr-10 border border-black rounded"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500"
                  aria-label="Toggle Confirm Password Visibility"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>


            
            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="role" className="text-sm">
                  Role
                </label>
                <select
                  id="role"
                  className="w-full pl-3 py-3 pr-10 border border-black rounded"
                  {...register("role", { required: "Role is required" })}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Please select your role
                  </option>
                  <option value={UserRole.USER}>USER</option>
                  <option value={UserRole.AGENT}>AGENT</option>
                  <option value={UserRole.DEVELOPER}>DEVELOPER</option>
                  <option value={UserRole.MORTGAGE}>MORTGAGE</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs">{errors.role.message}</p>
                )}
              </div>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 bg-[#E2C59F] text-lg font-semibold text-white"
              loading={isLoading}
            >
              Continue
            </Button>
          </form>

      <div className="relative mt-6 mb-4">
        <div className="absolute inset-0 flex items-center justify-center space-x-2">
          <span className="flex-grow border-t" />
          <div className="relative text-xs uppercase flex-shrink-0">
            <span className="text-gray-500">Or continue with</span>
          </div>
          <span className="flex-grow border-t" />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>

  );
}
