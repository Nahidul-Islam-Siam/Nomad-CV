import baseApi from "@/redux/api/baseApi";


export interface City {
  id: string;
  cityName: string;
  name: string;
  countryId: string;
  zipCode?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
  country?: {
    countryName: string;
  };
}

export interface CityPayload {
  cityName: string;
  countryId: string;
  description: string;
}

export interface UpdateCityPayload {
  description?: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CityListResponse {
  success: boolean;
  message: string;
  data: City[];
  meta: Meta;
}

export interface CityResponse {
  success: boolean;
  message: string;
  data: City;
}

export const cityFilterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFilterCity: builder.mutation<CityResponse, CityPayload>({
      query: (body) => ({
        url: "/city",
        method: "POST",
        body,
      }),
    }),
    getFilterCity: builder.query<
      CityListResponse,
      { searchTerm?: string; page?: number; limit?: number }
    >({
      query: ({ searchTerm = "", page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        params.append("page", String(page));
        params.append("limit", String(limit));
        return `/city?${params.toString()}`;
      },
    }),
    updateFilterCity: builder.mutation<
      CityResponse,
      { id: string; body: UpdateCityPayload }
    >({
      query: ({ id, body }) => ({
        url: `/city/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteFilterCity: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/city/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFilterCityMutation,
  useGetFilterCityQuery,
  useUpdateFilterCityMutation,
  useDeleteFilterCityMutation,
} = cityFilterApi;
