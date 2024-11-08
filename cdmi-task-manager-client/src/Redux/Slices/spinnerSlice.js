import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    toggleSpinner: (state, action) => {
      state.open = action.payload
    },
  },
});

export const { toggleSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
