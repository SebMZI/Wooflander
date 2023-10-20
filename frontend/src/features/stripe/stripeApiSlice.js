import apiSlice from "@/api/api/apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.query({
      query: () => ({
        url: "/stripe/createCheckout",
        method: "POST",
      }),
    }),
    getCustomerId: builder.query({
      query: (sessionId) => ({
        url: `/stripe/getCustomerId/${sessionId}`,
        method: "POST",
      }),
    }),
    webhook: builder.query({
      query: () => ({
        url: "/stripe/webhook",
        method: "POST",
        headers: {
          "stripe-signature": "we_1O3MiZKAfQUpwzxo0o4TKNmr",
        },
      }),
    }),
  }),
});

export const { useCheckoutQuery, useGetCustomerIdQuery, useWebhookQuery } =
  stripeApiSlice;
