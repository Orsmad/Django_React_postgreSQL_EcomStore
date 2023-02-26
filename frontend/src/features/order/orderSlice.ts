import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Category from "../../models/Category";
import Order from "../../models/Order";
import OrderDetail, { OrderDetailSeri } from "../../models/OrderDetail";
import Product from "../../models/Product";
import { getAllOrders, postOrder } from "./orderAPI";
// import Student from '../../models/Student';

// import { addStudent, getAllStudents,delStudent,updStudent } from './studentAPI';

interface OrderState {
  status: "idle" | "loading" | "failed";
  orders: OrderDetail[];
}
const initialState: OrderState = {
  status: "idle",
  orders: [],
};
// export const addProductAsync = createAsyncThunk(
//   "product/addProduct",
//   async (newProduct: Product) => {
//     const response = await addProduct(newProduct);
//     return response.data;
//   }
// );

// export const getAllOrdersAsync = createAsyncThunk(
//   "category/getAlaOrders",
//   async () => {
//     const response = await getAllOrders()
//     console.log(response.data)
//     return response.data;
//   }
// );
export const postOrdersAsync = createAsyncThunk(
  "orders/postOrders",
  async (order: OrderDetail[]) => {
    const orderDetailSeris: OrderDetailSeri[] = [];

    for (const orderDetail of order) {
      const orderDetailSeri = orderDetailSeris.find(
        (seri) => seri.product === orderDetail.product.id
      );

      if (orderDetailSeri) {
        orderDetailSeri.quantity += orderDetail.quantity;
      } else {
        orderDetailSeris.push(
          new OrderDetailSeri(orderDetail.product.id, orderDetail.quantity)
        );
      }
    }
    const response = await postOrder(orderDetailSeris);
    console.log(response.data);
    return response.data;
  }
);

// export const delProductAsync = createAsyncThunk(
//   "product/delProduct",
//   async (id: number) => {
//     const response = await delProduct(id);
//     return response.data;
//   }
// );

// export const updProductAsync = createAsyncThunk(
//   "Product/updProduct",
//   async (pro: Product) => {
//     const response = await updProduct(pro);
//     return response.data;
//   }
// );
export const orderSlice = createSlice({
  name: "order",
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
      .addCase(postOrdersAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        // state.orders.push(action.payload);
        state.orders = action.payload;
      });
    //   .addCase(delProductAsync.fulfilled, (state, action) => {

    //   })
    //       .addCase(updProductAsync.fulfilled, (state, action) => {
    //         // console.log(action.payload.id)
    //         const temp = state.products.filter(
    //           (s   // console.log(action.payload)
    //         state.products = state.products.filter(
    //           (stu) => stu.id !== action.payload
    //         );tu) => stu.id === action.payload.id
    //         )[0];
    //         temp.added_on = action.payload.added_on;
    //         temp.name = action.payload.pname;
    //         temp.image = action.payload.image;
    //         temp.category = action.payload.category;
    //       });
    //   },
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = orderSlice.actions;
export const selectOrders = (state: RootState) => state.order.orders;
export default orderSlice.reducer;
