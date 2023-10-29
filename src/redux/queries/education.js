import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const educationQuery = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: (params) => ({ url: "education", method: "GET", params }),
      transformResponse: (res) => ({
        educations: res.data.map((el) => ({ ...el, key: el?._id })),
        total: res.pagination.total,
      }),
    }),
    addEducation: builder.mutation({
      query: (body) => ({
        url: "education",
        method: "POST",
        body,
      }),
    }),
    getEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ body, id }) => ({
        url: `education/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const { reducer: educationReducer, reducerPath: educationName } =
  educationQuery;

export { educationQuery as default, educationName, educationReducer };

export const {
  useGetEducationsQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useGetEducationMutation,
  useDeleteEducationMutation,
} = educationQuery;
