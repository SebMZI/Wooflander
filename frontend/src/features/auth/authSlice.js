const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, roles: {} },
  reducers: {
    setCredentials: (state, action) => {
      const data = action.payload.result.data;
      console.log(data);
      if (data) {
        state.token = data.token;
        state.roles = data.roles;
        state.id = data.id;
      }
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrectRole = (state) => state.auth.roles;
export const selectCurrectToken = (state) => state.auth.token;
export const selectCurrentId = (state) => state.auth.id;

export default authSlice.reducer;
