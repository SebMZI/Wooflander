import { createSlice } from "@reduxjs/toolkit";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: { owners: [], sitters: [] },
  reducers: {
    getOwners: (state, action) => {
      const data = action.payload.owners;
      if (data) {
        state.owners = data;
      }
    },
    getSitters: (state, action) => {
      const data = action.payload.sitters;
      state.sitters = data;
    },
  },
});

export const { getSitters, getOwners } = jobsSlice.actions;

export const selectCurrentOwners = (state) => state.jobs.owners;
export const selectCurrentSitters = (state) => state.jobs.sitters;

export default jobsSlice.reducer;
