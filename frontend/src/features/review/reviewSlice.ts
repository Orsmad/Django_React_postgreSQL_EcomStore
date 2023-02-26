import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Review from "../../models/Review";
import {
  addReview,
  canPostByID,
  GetAiReview,
  getReviewsByProductID,
} from "./reviewAPI";

interface ReviewState {
  status: "idle" | "loading" | "failed";
  reviews: Review[];
  canPost: boolean;
  recReview: string;
}
const initialState: ReviewState = {
  status: "idle",
  reviews: [],
  canPost: false,
  recReview: "",
};

export const getReviewsByProductIDAsync = createAsyncThunk(
  "reviews/getReviewsByProductID",
  async (id: number) => {
    const response = await getReviewsByProductID(id);
    console.log(response.data);
    return response.data;
  }
);
export const addReviewAsync = createAsyncThunk(
  "reviews/addReview",
  async (data: any) => {
    const response = await addReview(data);
    console.log(data);

    return response.data;
  }
);
export const updateCanPostAsync = createAsyncThunk(
  "reviews/update",
  async () => {
    console.log("logout!");
  }
);

export const GetAiReviewAsync = createAsyncThunk(
  "reviews/GetAiReview",
  async (data: any) => {
    const response = await GetAiReview(data);
    console.log(data);

    return response.data;
  }
);
export const canPostByIDAsync = createAsyncThunk(
  "reviews/canPostByID",
  async (id: number) => {
    const response = await canPostByID(id);

    return response;
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder

      .addCase(getReviewsByProductIDAsync.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(canPostByIDAsync.rejected, (state, action) => {
        console.log("cant!!!!!!!!");
        state.canPost = false;
      })

      .addCase(GetAiReviewAsync.pending, (state, action) => {
        state.recReview = "Loading....";
      })
      .addCase(GetAiReviewAsync.fulfilled, (state, action) => {
        state.recReview = action.payload;
      })
      .addCase(updateCanPostAsync.fulfilled, (state, action) => {
        state.canPost = false;
      })
      .addCase(canPostByIDAsync.fulfilled, (state, action) => {
        state.canPost = true;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = reviewSlice.actions;
export const selectReview = (state: RootState) => state.review.reviews;
export const selectCanPost = (state: RootState) => state.review.canPost;

export default reviewSlice.reducer;
