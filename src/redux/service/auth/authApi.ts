import { baseApi } from "@/redux/api/baseApi";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
  DEVELOPER = "DEVELOPER",
  MORTGAGE = "MORTGAGE",
}

// Request Interfaces
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  res: string;
  role: UserRole;
}

interface ForgotPasswordRequest {
  email: string;
}



export interface ResetPasswordRequest {
  email: string;
  newPassword: string;

}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// Response Interfaces
interface EmailVerificationRequest {
  email: string;
  token: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  streetAddress: string | null;
  city: string | null;
  zipCode: string | null;
  region: string | null;
  country: string | null;
  Image: string[];
  exp: number;
  iat: number;
  userId: string;
}

export interface LoginResponseData {
  user: UserType;
  accessToken: string;
  refreshToken: string;
  updatedUser: UserType | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

interface ResetPasswordResponse {
  message: string;
  user: {
    email: string;
    newPassword: string;
  };
}

interface ChangePasswordResponse {
  message: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),

    emailVerification: builder.mutation<AuthResponse, EmailVerificationRequest>(
      {
        query: (requestData) => ({
          url: "/auth/verify-email",
          method: "POST",
          body: requestData,
        }),
        invalidatesTags: ["auth"],
      }
    ),

    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (user) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),

    // Fixed Reset Password Mutation
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      { token: string; user: ResetPasswordRequest }
    >({
      query: ({ token, user }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (user) => ({
        url: "/auth/change-pass",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useEmailVerificationMutation,
} = authApi;

export const { endpoints: authEndpoints } = authApi;
