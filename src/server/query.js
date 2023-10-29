// import { message } from "antd";
// import { ENDPOINT, TOKEN } from "../constants";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
// import Cookies from "js-cookie";

// const baseQueryToasts = () => {
//   return async (args, api, extraOptions) => {
//     const { error, data } = await baseQuery(args, api, extraOptions);
//     if (error) {
//       message.error(error.data?.message || error.status || "unknown error");
//       return { error: { status: error.status, data: error.data } };
//     }
//     return { data };
//   };
// };

// const createQuery = (data) =>
//   createApi({
//     ...data,
//     baseQuery: baseQueryToasts(),
//   });

// export default createQuery;
