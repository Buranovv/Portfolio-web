import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const userQuery = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({ url: "users", method: "GET", params }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el?._id })),
        total: res.pagination.total,
      }),
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ body, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const { reducer: userReducer, reducerPath: userName } = userQuery;

export { userQuery as default, userName, userReducer };

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserMutation,
  useDeleteUserMutation,
} = userQuery;
