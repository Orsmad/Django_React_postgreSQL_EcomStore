import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { login, register } from "./authAPI";

interface authState {
  status: "idle" | "loading" | "failed";
  error: string;
  access: string;
  isAuth: boolean;
}
const initialState: authState = {
  status: "idle",
  error: "",
  access: "",
  isAuth: localStorage.getItem("token") !== null,
};

export const updateIsAuth = createAsyncThunk("auth/logout", async () => {
  console.log("logout!");
});

export const loginAsync = createAsyncThunk("auth/login", async (data: any) => {
  try {
    const response = await login(data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
});

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: any) => {
    const response = await register(data);
    console.log(response.data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginAsync.fulfilled, (state, action) => {
        state.access = action.payload;
        state.isAuth = true;
        localStorage.setItem("token", JSON.stringify(action.payload));
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.access = action.payload;
        state.isAuth = true;
        localStorage.setItem("token", JSON.stringify(action.payload));
      })
      .addCase(registerAsync.rejected, (state, action) => {
        // state.access = action.payload;
        state.isAuth = false;
        // localStorage.setItem("token", JSON.stringify(action.payload));
      })
      .addCase(updateIsAuth.fulfilled, (state, action) => {
        state.isAuth = false;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;
