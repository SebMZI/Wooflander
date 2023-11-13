import { logout, selectCurrectToken } from "@/features/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://wooflander.onrender.com",
  credentials: "include",

  overrideExisting: false,
  transformRequest: (fetchBaseQueryConfig) => {
    if (
      fetchBaseQueryConfig.method === "POST" &&
      fetchBaseQueryConfig.body instanceof FormData
    ) {
      // Pour les requêtes POST avec FormData, assurez-vous que le Content-Type est correctement défini
      fetchBaseQueryConfig.headers["Content-Type"] = undefined; // Laissez le navigateur gérer le Content-Type
    }
    return fetchBaseQueryConfig;
  },
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log(token);

    if (token) {
      console.log("authorization", `Bearer ${token}`);
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    console.log("Token invalid or expired!");
    api.dispatch(logout());

    // const refreshResult = await baseQuery(
    //   { url: "/refresh", method: "POST" },
    //   api,
    //   extraOptions
    // );
    // console.log("refresh reseult : ", refreshResult.data.token);

    // if (refreshResult?.data) {
    //   // store the new token
    //   console.log("New token: ", refreshResult?.data?.token);
    //   api.dispatch(setNewToken({ token: refreshResult?.data?.token }));

    //   // retry original query with new access token
    //   result = await baseQuery(args, api, extraOptions);
    //   console.log(result);
    // } else {
    //   if (refreshResult?.error?.status === 403) {
    //     refreshResult.error.data.message = "Your login has expired.";
    //     api.dispatch(logOut());
    //   }
    //   console.log("Didn't work: ", refreshResult);
    //   return refreshResult;
    // }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["animals", "User", "comments"],
});
