const { default: apiSlice } = require("@/api/api/apiSlice");

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (infos) => ({
        url: "/user/signup",
        method: "POST",
        body: {...infos}
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
