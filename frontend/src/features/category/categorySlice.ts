import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Category from "../../models/Category";
import Product from "../../models/Product";
import { getAllCategories } from "./categoryAPI";


interface CategoryState {
  status: "idle" | "loading" | "failed";
  categories: Category[];
}
const initialState: CategoryState = {
  status: "idle",
  categories: [],
};

export const getAllCategoriesAsync = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    const response = await getAllCategories();
    console.log(response.data);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = categorySlice.actions;
export const selectCategories = (state: RootState) => state.category.categories;
export default categorySlice.reducer;
