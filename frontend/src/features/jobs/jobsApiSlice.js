import apiSlice from "@/api/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOwners: builder.query({
      query: () => ({
        url: "/user/owners",
      }),
    }),
    getAllSitters: builder.query({
      query: () => ({
        url: "/user/sitters",
      }),
    }),
  }),
});

export const { useGetAllSittersQuery, useGetAllOwnersQuery } = jobsApiSlice;


