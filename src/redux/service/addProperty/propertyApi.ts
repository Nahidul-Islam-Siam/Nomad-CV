/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/service/addProperty/propertyApi.ts

import { RcFile } from "antd/es/upload/interface";
import baseApi from "@/redux/api/baseApi"; // ✅ use your shared baseApi
import { TPropertyResponse } from "@/interface/globalType";

export interface PropertyFormBody {
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
  featureNames: string[];
}

export interface PropertyFilterParams {
  maxSquareFeet?: number;
  minSquareFeet?: number;
  maxArea?: number;
  minArea?: number;
  lifestyle?: string[];
  featureNames?: string[];
  searchTerm?: string;
  listingType?: "BUY" | "RENT" | "SALE";
  minBedRooms?: number;
  minBathRooms?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string[];
  maxBedRooms?: number;
  sort?: string;
  developmentStatus?: "NEW_DEVELOPMENT" | "DEVELOPED";
}

export interface PropertyPayload {
  videos: RcFile;
  images: RcFile[];
  bodyData: PropertyFormBody;
}

export interface TPropertyIdResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    userId: string;
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
    featureNames: string[];
    listingType: "BUY" | "RENT" | string;
    developmentStatus: "DEVELOPED" | "UNDER_CONSTRUCTION" | string;
    createdAt: string;
    updatedAt: string;
    images: {
      id: string;
      refId: string;
      refType: string;
      url: string;
      alt: string;
      createdAt: string;
      updatedAt: string;
    }[];
    City: {
      id: string;
      cityName: string;
      country: {
        id: string;
        countryName: string;
      };
    };
    user: {
      id: string;
      name: string;
      email: string;
      profile: {
        phone: string;
      };
    };
    video: {
      id: string;
      propertyId: string;
      url: string;
      alt: string;
      createdAt: string;
      updatedAt: string;
    }[];
    PropertyType: {
      id: string;
    };
    Lifestyle: {
      id: string;
      lifestyle: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface TPropertyMedia {
  propertyId: string;
  url: string;
  type: "image" | "video";
}

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<any, PropertyPayload>({
      query: ({ videos, images, bodyData }) => {
        const formData = new FormData();
        formData.append("videos", videos);
        images.forEach((img) => formData.append("images", img));
        formData.append("bodyData", JSON.stringify(bodyData));

        return {
          url: "/property",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Property"], // Cache invalidation
    }),

    getProperty: builder.query<TPropertyResponse, PropertyFilterParams>({
      query: (params) => ({
        url: `/property`,
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Property"], // Cache provider
    }),

    deleteProperty: builder.mutation<any, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"], // Cache invalidation
    }),

    getPropertyCardData: builder.query<any, any>({
      query: () => ({
        url: `/dashboard/get-dashboard-stats`,
        method: "GET",
      }),
      providesTags: ["DashboardStats"],
    }),

    deletePropertyMedia: builder.mutation<
      TPropertyMedia,
      { url: string; type: "image" | "video"; propertyId: string }
    >({
      query: ({ url, type, propertyId }) => ({
        url: `/property/delete-property-media`,
        method: "DELETE",
        body: { url, type, propertyId },
      }),
      invalidatesTags: ["Property"],
    }),

    getDashboardPropertyData: builder.query<any, any>({
      query: () => ({
        url: `/dashboard/get-dashboard-properties`,
        method: "GET",
      }),
      providesTags: ["DashboardProperties"],
    }),

    updatePropertyById: builder.mutation<
      TPropertyIdResponse,
      { id: string; videos?: RcFile; images?: RcFile[]; bodyData: PropertyFormBody }
    >({
      query: ({ id, videos, images, bodyData }) => {
        const formData = new FormData();
        if (videos) formData.append("videos", videos);
        if (images?.length) images.forEach((img) => formData.append("images", img));
        formData.append("bodyData", JSON.stringify(bodyData));

        return {
          url: `/property/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Property"],
    }),



    madeFeaturedProperty: builder.mutation<any, string>({
      query: (id) => ({
        url: `property/make-featured/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Property"],
    }),

    getPropertyData: builder.query<any, void>({
      query: () => ({
        url: `/dashboard/get-dashboard-stats`,
        method: "GET",
      }),
      providesTags: ["DashboardStats"],
    }),

    getPropertyById: builder.query<TPropertyIdResponse, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),

    deletePropertyById: builder.mutation<TPropertyIdResponse, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePropertyMutation,
  useGetPropertyQuery,
  useGetPropertyByIdQuery,
  useGetPropertyDataQuery,
  useGetDashboardPropertyDataQuery,
  useDeletePropertyByIdMutation,
  useDeletePropertyMutation,
  useGetPropertyCardDataQuery,
  useUpdatePropertyByIdMutation,
  useDeletePropertyMediaMutation,
  useMadeFeaturedPropertyMutation
} = propertyApi;
