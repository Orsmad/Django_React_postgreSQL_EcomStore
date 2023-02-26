import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Product from "../../models/Product";
// import Student from '../../models/Student';
import {
  addProduct,
  getAllProductsByID,
  getProductByID,
  getAllProducts,
} from "./productAPI";
// import { addStudent, getAllStudents,delStudent,updStudent } from './studentAPI';

interface ProductState {
  status: "idle" | "loading" | "failed";
  products: Product[];
}
const initialState: ProductState = {
  status: "idle",
  products: [],
};
export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (newProduct: Product) => {
    const response = await addProduct(newProduct);
    return response.data;
  }
);
export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const getProductByIDAsync = createAsyncThunk(
  "product/getProductByID",
  async (id: string) => {
    const response = await getProductByID(id);
    console.log(response.data);
    return response.data;
  }
);
export const getAllProductsByidAsync = createAsyncThunk(
  "product/getAllProductsbyid",
  async (id: string) => {
    const response = await getAllProductsByID(id);
    console.log(response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.products.push(action.payload);
      })
      .addCase(getProductByIDAsync.fulfilled, (state, action) => {
        state.products = [action.payload];
        // console.log(action.payload)
      })
      .addCase(getAllProductsByidAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.products = action.payload;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.products = action.payload;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export default productSlice.reducer;
