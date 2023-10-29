import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const experienceQuery = createApi({
  reducerPath: "experience",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (params) => ({
        url: "experiences",
        method: "GET",
        params,
      }),
      transformResponse: (res) => ({
        experiences: res.data.map((el) => ({ ...el, key: el?._id })),
        total: res.pagination.total,
      }),
    }),
    addExperience: builder.mutation({
      query: (body) => ({
        url: "experiences",
        method: "POST",
        body,
      }),
    }),
    getExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "GET",
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ body, id }) => ({
        url: `experiences/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const { reducer: experienceReducer, reducerPath: experienceName } =
  experienceQuery;

export { experienceQuery as default, experienceName, experienceReducer };

export const {
  useGetExperiencesQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useGetExperienceMutation,
  useDeleteExperienceMutation,
} = experienceQuery;
