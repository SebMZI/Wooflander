import apiSlice from "@/api/api/apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.query({
      query: () => ({
        url: "/stripe/createCheckout",
        method: "POST",
      }),
    }),
  }),
});

export const { useCheckoutQuery } = stripeApiSlice;
