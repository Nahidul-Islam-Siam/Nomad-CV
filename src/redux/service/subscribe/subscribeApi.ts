/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";




export interface SubscribePayload{
    email: string
}

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  

    subscribe:builder.mutation<any,SubscribePayload>({
        query:(body) =>({
            url:"/subscribe",
            method:"POST",
            body
        })
    })
  }),
});

export const { useSubscribeMutation } = registerApi;