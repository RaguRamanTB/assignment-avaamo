import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    isUploading: false,
    files: [],
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setUploading: (state, action) => {
      state.isUploading = action.payload;
    },
  },
});

export const { setFiles, setUploading } = filesSlice.actions;
export default filesSlice.reducer;
