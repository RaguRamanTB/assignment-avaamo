import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: {
    currentStep: 0,
    stepProgress: 0,
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setStepProgress: (state, action) => {
      state.stepProgress = action.payload;
    },
  },
});

export const { setCurrentStep, setStepProgress } = stepSlice.actions;
export default stepSlice.reducer;
