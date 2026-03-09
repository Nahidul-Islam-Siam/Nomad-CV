import { baseApi } from "@/redux/api/baseApi";

// ---- Interfaces ----
export interface Image {
  id: string;
  refId: string;
  refType: string;
  url: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  propertyId: string;
  url: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileImage {
  id: string;
  refId: string;
  refType: string;
  url: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  region: string;
  country: string;
  presentAddress: string;
  permanentAddress: string;
  company: string;
  about: string | null;
  registrationId: string;
  nationalId: string;
  TaxId: string;
  createdAt: string;
  updatedAt: string;
  Image: ProfileImage[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  userStatus: string;
  approvalStatus: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  verificationToken: string | null;
  verificationTokenExpiry: string | null;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

export interface Property {
  id: string | number;
  userId: string;
  cityId: string;
  propertyTypeId: string | null;
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
  isFeatured: boolean;
  featureNames: string[];
  listingType: string;
  developmentStatus: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  video: Video[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserPropertyResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    properties: Property[];
    pagination: Pagination;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    profile: Profile;
  };
}

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/users/get-profile-data",
        method: "GET",
      }),
    }),

    getProfilePropertyDetails: builder.query<
      UserPropertyResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/users/get-my-details-profile?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation<
      UpdateProfileResponse,
      {
        image: File;
        bodyData: {
          name: string;
          phone: string;
          streetAddress: string;
          city: string;
          zipCode: string;
          region: string;
          country: string;
          registrationId: string;
          TaxId: string;
          company: string;
        };
      }
    >({
      query: ({ image, bodyData }) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("bodyData", JSON.stringify(bodyData));

        return {
          url: "/users/update-profile",
          method: "PUT",
          body: formData,
        };
      },
    }),

    changeUserPassword: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: bodyData,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProfilePropertyDetailsQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
} = profileApi;
