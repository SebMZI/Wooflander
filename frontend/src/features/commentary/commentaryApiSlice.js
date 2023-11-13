import { apiSlice } from "@/api/api/apiSlice";

export const commentaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id) => ({
        url: `/commentary/getComments/${id}`,
      }),
      providesTags: ["comments"],
    }),
    addComment: builder.mutation({
      query: (content) => ({
        url: "/commentary/addComment",
        method: "POST",
        body: { ...content },
      }),
      invalidatesTags: ["comments"],
    }),
    addNotes: builder.mutation({
      query: (content) => ({
        url: `/commentary/addRating`,
        method: "POST",
        body: { ...content },
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useAddNotesMutation,
} = commentaryApiSlice;
