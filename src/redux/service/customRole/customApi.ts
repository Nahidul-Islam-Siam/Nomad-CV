import { baseApi } from "@/redux/api/baseApi";



export interface Custom {
  id?: string;
  name?: string;
  email?: string;
message?: string
}

// Define the RegistrationRequest type
export interface RegistrationRequest {
  username?: string;
  password?: string;
  email?: string;

}


const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCustomRole: builder.mutation<Custom, RegistrationRequest>({
      query: (userData) => ({
        url: "/users/create-custom-user",
        method: "POST",
        body: userData, 
      }),
    }),
  }),
});

export const { useAddCustomRoleMutation } = partnerApi;
