import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Profile from "../../models/Profile";
import { getProfile, updateProile } from "./profileAPI";

interface ProfileState {
  status: "idle" | "loading" | "failed";
  profile: Profile[];
}
const initialState: ProfileState = {
  status: "idle",
  profile: [],
};

export const getProfileAsync = createAsyncThunk(
  "profile/getProfile",
  async () => {
    const response = await getProfile();
    console.log(response.data);
    return response.data;
  }
);

export const updateProileAsync = createAsyncThunk(
  "profile/updateProile",
  async (prof: any) => {
    const response = await updateProile(prof);
    return response.data;
  }
);
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(addProductAsync.fulfilled, (state, action) => {
      //     // console.log(action.payload)
      //     state.products.push(action.payload);
      //   })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profile = [];
        state.profile.push(action.payload);
      })
      // .addCase(getProfileAsync.pending, (state, action) => {
      //   state.profile=;
      // })
      .addCase(updateProileAsync.fulfilled, (state, action) => {
        state.profile = [];
        state.profile.push(action.payload);
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile.profile;
export default profileSlice.reducer;
