import { createSlice } from "@reduxjs/toolkit";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: { owners: [], sitters: [], profile: null },
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
    getProfile: (state, action) => {
      const data = action.payload?.userInfo;
      state.profile = data;
    },
  },
});

export const { getSitters, getOwners, getProfile } = jobsSlice.actions;

export const selectCurrentOwners = (state) => state.jobs.owners;
export const selectCurrentSitters = (state) => state.jobs.sitters;
export const selectCurrentProfile = (state) => state.jobs.profile;

export default jobsSlice.reducer;
