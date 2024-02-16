import { createSlice } from "@reduxjs/toolkit";



export const branchSclice = createSlice({
  name: "branches",
  initialState: { branches : [], totalbranchesCount : 0 },
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload.rows;
      state.totalbranchesCount = action.payload.count;
    },
    removeBranches: (state, action) => {
      state.branches = [];
      state.totalbranchesCount = 0;
    },
  },
});

export const { setBranches, removeBranches } = branchSclice.actions;
export default branchSclice.reducer;
