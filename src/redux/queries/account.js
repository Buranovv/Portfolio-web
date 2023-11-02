import createQuery from "../../server/query";

const accountQuery = createQuery({
  reducerPath: "account",
  tagTypes: ["account"],
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        url: `auth/me`,
        method: "GET",
      }),
    }),
    updateAccount: builder.mutation({
      query: (body) => ({
        url: `auth/updatedetails`,
        method: "PUT",
        body,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (file) => ({
        url: "auth/upload",
        method: "POST",
        body: file,
      }),
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
  useGetAccountQuery,
  useUpdateAccountMutation,
  useUploadPhotoMutation,
  useUpdatePasswordMutation,
} = accountQuery;
