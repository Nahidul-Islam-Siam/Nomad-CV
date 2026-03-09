/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

// ======= Types =======
export interface Lifestyle {
  id: string;
  lifestyle: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface LifestyleResponse {
  success: boolean;
  message: string;
  data: Lifestyle[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface CreateLifestylePayload {
  lifestyle: string;
}

export interface UpdateLifestylePayload {
  id: string;
  lifestyle: string;
}

export const lifestyleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addLifestyle: builder.mutation<any, CreateLifestylePayload>({
      query: (body) => ({
        url: "/lifestyles",
        method: "POST",
        body,
      }),
    }),
    getLifestyles: builder.query<LifestyleResponse, void>({
      query: () => ({
        url: "/lifestyles",
        method: "GET",
      }),
    }),
    updateLifestyle: builder.mutation<any, UpdateLifestylePayload>({
      query: ({ id, lifestyle }) => ({
        url: `/lifestyles/${id}`,
        method: "PUT",
        body: { lifestyle },
      }),
    }),
    deleteLifestyle: builder.mutation<any, string>({
      query: (id) => ({
        url: `/lifestyles/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddLifestyleMutation,
  useGetLifestylesQuery,
  useUpdateLifestyleMutation,
  useDeleteLifestyleMutation,
} = lifestyleApi;
