import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null, profilePic: null },
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload.userInfo;
      if (data) {
        state.userInfo = data;
      }
    },
    setUserPicture: (state, action) => {
      const data = action.payload.img;
      if (data) {
        state.profilePic = data;
      }
    },
  },
});

export const { setUserInfo, setUserPicture } = userSlice.actions;

export const selectCurrentUserInfo = (state) => state.user.userInfo;
export const selectCurrentActive = (state) => state.user.userInfo?.isSubActive;
export const selectCurrentProfilePicture = (state) => state.user.profilePic;

export default userSlice.reducer;
