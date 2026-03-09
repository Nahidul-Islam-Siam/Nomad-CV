/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";
// import { logout, setAccessToken } from "../features/auth";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://pamelam.code-commando.com/api",
  // baseUrl: "https://roof-cost.onrender.com/api/v1",
  // baseUrl: "https://api.aiarealty.code-commando.com/api/v1",
  baseUrl: "https://api.aiarealty.com/api/v1",
  // baseUrl: "http://10.0.10.121:5000/api/v1",
  // baseUrl: "https://arcroofs.com/api/v1",
  // baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   // Refresh access token
  //   const refreshResult = await baseQuery(
  //     {
  //       url: "/auth/refresh-token",
  //       method: "POST",
  //       // body:
  //     },
  //     api,
  //     extraOptions
  //   );

  //   if (refreshResult.data) {
  //     const newAccessToken = (refreshResult.data as any).accessToken;

  //     api.dispatch(setAccessToken(newAccessToken));
  //   } else {
  //     api.dispatch(logout());
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auth", "roofing", "window","Property", "DashboardStats", "DashboardProperties"],
  endpoints: () => ({}),
});

export default baseApi;
