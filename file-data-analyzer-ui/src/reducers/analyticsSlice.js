import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
  name: "analysis",
  initialState: {
    analysisData: {},
  },
  reducers: {
    setAnalysisData: (state, action) => {
      state.analysisData = action.payload;
    },
  },
});

export const { setAnalysisData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
