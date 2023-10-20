import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: { sessionUrl: null, sessionId: null, customerId: null },
  reducers: {
    setSessionUrl: (state, action) => {
      const data = action.payload;
      if (data) {
        state.sessionUrl = data;
      }
    },
    setSessionId: (state, action) => {
      const data = action.payload;
      console.log(data?.customerId, "ff");
      if (data) {
        state.sessionId = data;
      }
    },
    delSession: (state, action) => {
      state.sessionId = null;
    },
    setCustomerId: (state, action) => {
      const data = action.payload;
      state.customerId = data;
    },
  },
});

export const { setSessionUrl, setSessionId, delSession, setCustomerId } =
  stripeSlice.actions;

export const selectCurrentSessionId = (state) => state.stripe.sessionId;
export const selectCurrentSessionUrl = (state) => state.stripe.sessionUrl;
export const selectCurrentCustomerId = (state) => state.stripe.customerId;

export default stripeSlice.reducer;
