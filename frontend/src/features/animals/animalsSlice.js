import { createSlice } from "@reduxjs/toolkit";

const animalsSlice = createSlice({
  name: "animals",
  initialState: { animals: [], images: [] },
  reducers: {
    setAnimals: (state, action) => {
      const data = action.payload;
      console.log("data: ", data);
      if (data) {
        state.animals = data.animals;
      }
    },
    setImages: (state, action) => {
      const data = action.payload;
      console.log("Data: ", data);
      if (data) {
        state.images = data;
      }
    },
  },
});

export const { setAnimals } = animalsSlice.actions;

export const selectCurrentAnimals = (state) => state.animals.animals;
export const selectCurrentImages = (state) => state.animals.images;

export default animalsSlice.reducer;
