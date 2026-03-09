"use client";
import { Button } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEmailVerificationMutation } from "@/redux/service/auth/authApi";
import img from "@/assets/Auth/Otp.png";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth";

// Define the interface for the form data
interface EmailVerificationForm {
  otp: string;
  email: string;
}

export default function EmailVerification() {
  // Capture email from URL query parameters
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
  const router = useRouter();

  const dispatch = useDispatch();

  const [emailVerification, { isLoading }] = useEmailVerificationMutation();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationForm>();

  // Handle form submission
  const onSubmit = async (data: EmailVerificationForm) => {
    const { otp } = data;

    // Basic validation to ensure OTP is entered
    if (!otp) {
      toast.warning("Please enter the OTP");
      return;
    }

    if (!email) {
      toast.error("Email is missing in the verification link.");
      return;
    }

    // Prepare the data to be sent to the API
    const requestData = {
      email,
      token: otp,
    };

    try {
      const res = await emailVerification(requestData).unwrap();

      if (res && res.message) {
        toast.success(res?.message || "Email verified successfully!");
        dispatch(
          setUser({
            user: res?.data?.updatedUser,
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          })
        );

        Cookies.set("accessToken", res?.data?.accessToken, { expires: 7 });
        Cookies.set("refreshToken", res?.data?.refreshToken, { expires: 7 });
        if (
          res?.data?.updatedUser?.role === "AGENT" ||
          res?.data?.updatedUser?.role === "DEVELOPER" ||
          res?.data?.updatedUser?.role === "MORTGAGE"
        ) {
          router.push("/registration");
        } else {
          router.push("/");
        }
        // Redirect or show a success message as needed
      } else {
        toast.error(res?.message || "An error occurred. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:border text-black w-full">
      {/* Left side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="bg-black/50 absolute w-full h-full "></div>
        <Image
          src={img}
          alt="Wind turbine background"
          width={800}
          height={700}
          className="object-cover w-full h-[800px]"
          priority
        />
      </div>

      {/* Right side - Email Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-6 border shadow-xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold pb-5">Email Verification</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 pb-10">
            <div className="space-y-2">
              <div className="relative">
                <label htmlFor="otp" className="text-sm">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter your OTP Code"
                  className="w-full pl-3 py-3 pr-10 border mt-1 border-black rounded"
                  {...register("otp", { required: "OTP is required" })}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs">{errors.otp.message}</p>
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
        </div>
      </div>
    </div>
  );
}
