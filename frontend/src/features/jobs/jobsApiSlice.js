import { apiSlice } from "@/api/api/apiSlice";

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
    getSitterPdfs: builder.query({
      query: (sitterId) => ({
        url: `/pdf/${sitterId}/pdf`,
      }),
    }),
  }),
});

export const {
  useGetAllSittersQuery,
  useGetAllOwnersQuery,
  useGetSitterPdfsQuery,
} = jobsApiSlice;
