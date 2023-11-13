const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    roles: {},
    id: null,
    sessId: null,
    isActive: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const data = action.payload.result.data;
      console.log(data);
      if (data) {
        state.token = data.token;
        state.roles = data.roles;
        state.id = data.id;
        state.sessId = data.sessionId;
        state.isActive = data.isSubActive;
      }
    },
    logout: (state, action) => {
      state.token = null;
      state.id = null;
      state.roles = null;
      state.sessId = null;
      state.isActive = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrectRole = (state) => state.auth.roles;
export const selectCurrectToken = (state) => state.auth.token;
export const selectCurrentId = (state) => state.auth.id;
export const selectCurrentStripeId = (state) => state.auth.sessId;
export const selectCurrentActiveSub = (state) => state.auth.isActive;

export default authSlice.reducer;
