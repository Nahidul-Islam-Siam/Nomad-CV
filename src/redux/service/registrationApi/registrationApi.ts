/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";




export interface RegisterPayload{
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
  registrationId: string;
  nationalId: string;
  TaxId: string;
}

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  

    addRole:builder.mutation<any,RegisterPayload>({
        query:(body) =>({
            url:"/contact/send-contact",
            method:"POST",
            body
        })
    })
  }),
});

export const { useAddRoleMutation } = registerApi;
