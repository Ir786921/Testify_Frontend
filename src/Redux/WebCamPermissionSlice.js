import { createSlice } from "@reduxjs/toolkit";

const NetworkSpeedSlice = createSlice({
  name: "networkSpeed",
  initialState: {
    value: " "
  },
  reducers: {
    speed: (state, actions) => {
      state.value = actions.payload;
    }
  }
});

export const { speed } = NetworkSpeedSlice.actions;
export default NetworkSpeedSlice.reducer;