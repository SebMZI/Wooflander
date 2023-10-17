import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import animalsReducer from "../features/animals/animalsSlice";
import apiSlice from "./api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    animals: animalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
