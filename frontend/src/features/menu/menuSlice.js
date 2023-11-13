import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { menuOpen: true },
  reducers: {
    setShowOpen: (state, action) => {
      const data = action.payload;
      state.menuOpen = data;
    },
  },
});

export const { setShowOpen } = menuSlice.actions;

export const selectShowOpen = (state) => state.menu.menuOpen;

export default menuSlice.reducer;
