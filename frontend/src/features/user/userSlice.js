import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload.userInfo;
      if (data) {
        state.userInfo = data;
      }
    },
    
  },
});

export const { setUserInfo } = userSlice.actions;

export const selectCurrentUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
