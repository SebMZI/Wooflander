import apiSlice from "@/api/api/apiSlice";

export const animalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: (userId) => ({
        url: `/user/${userId}/animal`,
      }),
      providesTags: ["animals"],
    }),
    addAnimal: builder.mutation({
      query: (formData) => ({
        url: `/user/addAnimal`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["animals"],
    }),
    getAnimalImage: builder.query({
      query: (animalId) => ({
        url: `/user/${animalId}/getAnimalImage`,
      }),
    }),
  }),
});

export const {
  useGetAnimalsQuery,
  useAddAnimalMutation,
  useGetAnimalImageQuery,
} = animalsApiSlice;
