import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import animalsReducer from "../features/animals/animalsSlice";
import userReducer from "../features/user/userSlice";
import stripeReducer from "../features/stripe/stripeSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import commentReducer from "../features/commentary/commentarySlice";
import { apiSlice } from "./api/apiSlice";
import menuReducer from "../features/menu/menuSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    menu: menuReducer,
    auth: persistedAuthReducer,
    user: userReducer,
    animals: animalsReducer,
    stripe: stripeReducer,
    jobs: jobsReducer,
    commentaries: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export const persistor = persistStore(store);
