import { apiSlice } from "@/api/api/apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/profile`,
      }),
      providesTags: ["User"],
    }),
    putUserProfile: builder.mutation({
      query: ({ userId, username, tel, email, sessionId, customerId }) => ({
        url: `/user/${userId}/updateProfile`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          username,
          tel,
          email,
          sessionId,
          customerId,
        },
      }),
      invalidatesTags: ["User"],
    }),
    addProfilePicture: builder.mutation({
      query: (formData) => ({
        url: `/user/profile/picture/:userId`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getProfilePic: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/getProfilePic`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  usePutUserProfileMutation,
  useAddProfilePictureMutation,
  useGetProfilePicQuery,
} = userApiSlice;
