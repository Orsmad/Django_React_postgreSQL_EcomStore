import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Product from "../../models/Product";
import { selectProducts } from "../product/productSlice";
import {
  addReviewAsync,
  canPostByIDAsync,
  GetAiReviewAsync,
  getReviewsByProductIDAsync,
  selectCanPost,
} from "./reviewSlice";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

import { Button, Box, Typography } from "@mui/material";
import { selectAuth } from "../authentication/authSlice";

const AddReview = (product: Product) => {
  const notify = () => toast("Review added! ");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(canPostByIDAsync(product.id));
  }, [dispatch, product.id]);

  const canPost = useAppSelector(selectCanPost);
  const isauth = useAppSelector(selectAuth);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState("1");
  const [recReview, setRecReview] = useState("");

  if (!canPost) {
    return (
      <div> You can post a review only on previously bought products.</div>
    );
  }
  if (!isauth) {
    return <div> Please login to post a review.</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let form_data = new FormData();
    form_data.append("product", product.id.toString());
    form_data.append("content", content);
    form_data.append("rating", rating);
    form_data.append("is_active", "true");

    dispatch(addReviewAsync(form_data));
    notify();
    setContent("");
    setRating("");
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    const target = event.target as HTMLInputElement;
    setRating(target.value);
  };

  const handleAIrequest = () => {
    dispatch(GetAiReviewAsync({ rating }))
      .then((response) => {
        setRecReview(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start">
      <Box maxWidth="100%" margin="0 auto">
        <Typography variant="body1">
          Not a man of words? That's OK! Select a rating, click on the button,
          and our AI will do the work for you. Just copy the prompt and paste
          it. You can click it again to regenerate a response.
        </Typography>
        <br />
        <Button variant="contained" onClick={handleAIrequest}>
          Get AI response
        </Button>
        <Typography sx={{ mt: 2, fontWeight: 'bold'}}>
          {recReview}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Typography variant="body1" component="span">
              Review:
            </Typography>
            <textarea
              name="content"
              value={content}
              onChange={handleContentChange}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="body1" component="span">
              Rating:
            </Typography>
            <Rating
              name="simple-controlled"
              value={Number(rating)}
              onChange={handleRatingChange}
            />
          </Box>
          <Box
            mt={2}
            mb={20}
            flexGrow={1}
            display="flex"
            justifyContent="flex-end"
          >
            <Button type="submit" variant="contained">
              Submit Review
            </Button>
          </Box>

          <input type="hidden" name="product" value={product.id} />
        </form>
      </Box>

    </Box>
  );
};

export default AddReview;
