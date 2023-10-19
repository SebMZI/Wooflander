import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import animalsReducer from "../features/animals/animalsSlice";
import userReducer from "../features/user/userSlice";
import stripeReducer from "../features/stripe/stripeSlice";
import apiSlice from "./api/apiSlice";
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

const stipePersistConfig = {
  key: "stripe",
  storage: storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedStripeReducer = persistReducer(
  stipePersistConfig,
  stripeReducer
);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
    user: userReducer,
    animals: animalsReducer,
    stripe: persistedStripeReducer,
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
