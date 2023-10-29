import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const notClientUserQuery = createApi({
  reducerPath: "notClient-users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  tagTypes: ["notClient"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({ url: "users?role=user", method: "GET", params }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el?._id })),
        total: res.pagination.total,
      }),
      providesTags: ["notClient"],
    }),
    confirmUserToClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["notClient"],
    }),
  }),
});

const { reducer: notClientReducer, reducerPath: notClientName } =
  notClientUserQuery;

export { notClientUserQuery as default, notClientName, notClientReducer };

export const { useGetUsersQuery, useConfirmUserToClientMutation } =
  notClientUserQuery;
