import { createSlice } from "@reduxjs/toolkit";

const animalsSlice = createSlice({
  name: "animals",
  initialState: { animals: [] },
  reducers: {
    setAnimals: (state, action) => {
      const data = action.payload;
      console.log("data: ", data);
      if (data) {
        state.animals = data;
      }
    },
  },
});

export const { setAnimals } = animalsSlice.actions;

export const selectCurrentAnimals = (state) => state.animals.animals;

export default animalsSlice.reducer;
