import baseApi from "@/redux/api/baseApi";

// types/feature.types.ts
export interface Feature {
  id: string;
  category: string;
  subFeatures: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrUpdateFeaturePayload {
  category: string;
  subFeatures: string[];
}

export interface FeatureResponse {
  success: boolean;
  message: string;
  data: Feature;
}

export interface FeatureListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Feature[];
}

export const featureFilterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeatureFilterApi: builder.mutation<
      FeatureResponse,
      CreateOrUpdateFeaturePayload
    >({
      query: (payload) => ({
        url: "/feature",
        method: "POST",
        body: payload,
      }),
    }),
    getFeaturesFilter: builder.query<
      FeatureListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/feature?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    updateFeatureFilter: builder.mutation<
      FeatureResponse,
      { id: string; body: CreateOrUpdateFeaturePayload }
    >({
      query: ({ id, body }) => ({
        url: `/feature/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteFeature: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/feature/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFeatureFilterApiMutation,
  useGetFeaturesFilterQuery,
  useUpdateFeatureFilterMutation,
  useDeleteFeatureMutation,
} = featureFilterApi;
