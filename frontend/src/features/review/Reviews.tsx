import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProducts } from "../product/productSlice";
import {
  canPostByIDAsync,
  getReviewsByProductIDAsync,
  selectCanPost,
  selectReview,
} from "./reviewSlice";
import Product from "../../models/Product";
import AddReview from "./AddReview";
import { Rating } from "@mui/material";
import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Reviews = (product: Product) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReviewsByProductIDAsync(product.id ?? 0));
  }, [dispatch, product.id]);

  const reviews = useAppSelector(selectReview);

  if (!reviews) {
    return (
      <div>
        {" "}
        No Reviews yet <br></br>
        <AddReview {...product}> </AddReview>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Grid container spacing={2}>
          {reviews.map((review, index) => {
            return (
              <Grid key={review.id} item xs={12} md={4}>
                <Card key={index} sx={{ height: "100%" }}>
                  <CardMedia
                    sx={{
                      height: 0,
                      paddingTop: "56.25%", // 16:9
                    }}
                    image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    title={product.name}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <Rating
                        name="read-only"
                        value={Number(review.rating)}
                        readOnly
                      />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <AddReview {...product}> </AddReview>
      </div>
    </div>
  );
};

export default Reviews;
