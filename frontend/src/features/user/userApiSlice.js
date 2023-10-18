import apiSlice from "@/api/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/profile`,
      }),
      providesTags: ["User"],
    }),
    putUserProfile: builder.mutation({
      query: ({ userId, username, tel, email }) => ({
        url: `/user/${userId}/updateProfile`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          username,
          tel,
          email,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery, usePutUserProfileMutation } =
  userApiSlice;
