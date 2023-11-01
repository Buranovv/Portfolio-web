import createQuery from "../../server/query";

const accountQuery = createQuery({
  reducerPath: "account",
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
      query: (body) => ({
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
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "auth/updatepassword",
        method: "PUT",
        body,
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
  useUpdatePasswordMutation,
} = accountQuery;
