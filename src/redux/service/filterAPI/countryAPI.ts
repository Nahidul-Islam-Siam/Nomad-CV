/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

export interface Country {
  id: string;
  countryName: string;
  slug: string;
  createdAt: string;
  updateAt: string;
}

export interface CountryResponse {
  success: boolean;
  message: string;
  data: Country[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface CreateCountryPayload {
  countryName: string;
}

export interface UpdateCountryPayload {
  id: string;
  countryName: string;
}

export const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<CountryResponse, void>({
      query: () => ({
        url: "/country",
        method: "GET",
      }),
    }),
    addCountry: builder.mutation<any, CreateCountryPayload>({
      query: (body) => ({
        url: "/country",
        method: "POST",
        body,
      }),
    }),
    updateCountry: builder.mutation<any, UpdateCountryPayload>({
      query: ({ id, countryName}) => {
    
        return {
        url: `/country/${id}`,
        method: "PUT",
        body: { countryName: countryName },
      }
    
    },
    }),
    updateCountryNew: builder.mutation<any, UpdateCountryPayload>({
      query: ({ id, countryName}) => {
    
        return {
        url: `/country/${id}`,
        method: "PUT",
        body: { countryName: countryName },
      }
    
    },
    }),

    deleteCountry: builder.mutation<any, string>({
      query: (id) => ({
        url: `/country/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useAddCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useUpdateCountryNewMutation
} = countryApi;
