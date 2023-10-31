import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const accountQuery = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  tagTypes: ["account"],
  endpoints: (builder) => ({
    getAccount: builder.mutation({
      query: () => ({
        url: `auth/me`,
        method: "GET",
      }),
      invalidatesTags: ["account"],
    }),
    updateAccount: builder.mutation({
      query: ( body ) => ({
        url: `auth/updatedetails`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["account"],
    }),
    uploadPhoto: builder.mutation({
      query: (file) => ({
        url: "auth/upload",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["account"],
    }),
  }),
});

const { reducer: accountReducer, reducerPath: accountName } = accountQuery;

export { accountQuery as default, accountName, accountReducer };

export const {
  useGetAccountMutation,
  useUpdateAccountMutation,
  useUploadPhotoMutation,
} = accountQuery;
