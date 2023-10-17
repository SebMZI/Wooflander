import apiSlice from "@/api/api/apiSlice";

export const animalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/animal`,
      }),
    }),
    addAnimal: builder.mutation({
      query: (formData) => ({
        url: `/user/addAnimal`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetAnimalsQuery, useAddAnimalMutation } = animalsApiSlice;
