import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: { sessionUrl: null, sessionId: null },
  reducers: {
    setSessionUrl: (state, action) => {
      const data = action.payload;
      if (data) {
        state.sessionUrl = data;
      }
    },
    setSessionId: (state, action) => {
      const data = action.payload;
      if (data) {
        state.sessionId = data;
      }
    },
    delSession: (state, action) => {
      state.sessionId = null;
    },
  },
});

export const { setSessionUrl, setSessionId, delSession } = stripeSlice.actions;

export const selectCurrentSessionId = (state) => state.stripe.sessionId;
export const selectCurrentSessionUrl = (state) => state.stripe.sessionUrl;

export default stripeSlice.reducer;
