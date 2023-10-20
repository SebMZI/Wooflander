import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  overrideExisting: false,
  transformRequest: (fetchBaseQueryConfig) => {
    if (
      fetchBaseQueryConfig.method === "POST" &&
      fetchBaseQueryConfig.body instanceof FormData
    ) {
      // Pour les requêtes POST avec FormData, assurez-vous que le Content-Type est correctement défini
      fetchBaseQueryConfig.headers["Content-Type"] = undefined; // Laissez le navigateur gérer le Content-Type
    }
    return fetchBaseQueryConfig;
  },
  endpoints: (builder) => ({}),
  tagTypes: ["animals", "User", "comments"],
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.token;
  //     headers.set("Content-type", "multipart/form-data");
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
});

export default apiSlice;
