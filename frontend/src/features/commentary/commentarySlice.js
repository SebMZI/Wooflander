import { createSlice } from "@reduxjs/toolkit";

const commentarySlice = createSlice({
  name: "commentaries",
  initialState: { commentaries: [] },
  reducers: {
    setCommentaries: (state, action) => {
      const data = action.payload;
      state.commentaries = data?.comments;
    },
  },
});

export const { setCommentaries } = commentarySlice.actions;

export const selectCurrentCommentaries = (state) =>
  state.commentaries.commentaries;

export default commentarySlice.reducer;
