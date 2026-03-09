import baseApi from "@/redux/api/baseApi";

export interface PropertyType {
  id: string;
  type: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyTypeResponse {  
  success: boolean;
  message: string;
  data: PropertyType;
}

export interface PropertyTypeListResponse {
  success: boolean;
  message: string;
  data: PropertyType[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  }; 
}

export const propertyTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPropertyTypeFilter: builder.mutation<
      PropertyTypeResponse,
      { type: string }
    >({
      query: (body) => ({
        url: "/propertyType",
        method: "POST",
        body,
      }),
    }),
    getPropertyTypesFilter: builder.query<
      PropertyTypeListResponse,
      { searchTerm?: string; page?: number; limit?: number }
    >({
      query: ({ searchTerm, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/propertyType?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    updatePropertyTypeFilter: builder.mutation<
      PropertyTypeResponse,
      { id: string; type: string }
    >({
      query: ({ id, type }) => ({
        url: `/propertyType/${id}`,
        method: "PUT",
        body: { type },
      }),
    }),
    deletePropertyTypeFilter: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/propertyType/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePropertyTypeFilterMutation,
  useGetPropertyTypesFilterQuery,
  useUpdatePropertyTypeFilterMutation,
  useDeletePropertyTypeFilterMutation,
} = propertyTypeApi;
