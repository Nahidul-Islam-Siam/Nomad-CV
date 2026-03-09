/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

// Adjusting the Partner interface based on the response structure

export interface Partner {
  id: string;
  data: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  userStatus: string;
  approvalStatus: string | null; // approvalStatus is nullable
  isEmailVerified: boolean;
  isDeleted: boolean;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  verificationToken: string | null;
  verificationTokenExpiry: string | null;
  createdAt: string;
  updatedAt: string;
  profile: {

    id: string;
    userId: string;
    name: string;
    phone: string | null;
    dateOfBirth: string | null;
    streetAddress: string | null;
    city: string | null;
    zipCode: string | null;
    region: string | null;
    country: string | null;
    presentAddress: string | null;
    permanentAddress: string | null;
    company: string | null;
    about: string | null;
    registrationId: string | null;
    nationalId: string | null;
    TaxId: string | null;
    createdAt: string;
    updatedAt: string;
    Image: { url: string }[]; 
  };
  map: string | null;
}

export interface AllPartnerResponse {
  success: boolean;
  message: string;
  data: {
    data: Partner[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
      map: string | null;
    };
  };
}

interface SinglePartnerResponse {
  success: boolean;
  message: string;
  data: Partner;
}

const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getPartners now dynamically handles query parameters
    getPartners: builder.query<
      AllPartnerResponse,
      {
        searchTerm?: string;
        page?: number;
        limit?: number;
        sort?: string;
        role?: string;
      }
    >({
      query: ({ searchTerm, page = 1, limit = 10, sort, role }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);
        if (role) params.append("role", role);

        return {
          url: `/users/get-all-partners?${params.toString()}`,
          method: "GET",
        };
      },
    }),   

    getPartnerById: builder.query<SinglePartnerResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

disablePartner: builder.mutation<any, string>({
  query: (id) => ({
    url: `/users/${id}`,
    method: "PUT",
  }),
}),



    approvedRejectPartner: builder.mutation<
      SinglePartnerResponse,
      { id: string; action: string }
    >({
      query: ({ id, action }) => ({
        url: `/users/approve-user/${id}`,
        method: "PUT",
        body: { action },
      }),
    }),
  }),
});

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useApprovedRejectPartnerMutation,
  useDisablePartnerMutation,

} = partnerApi;
