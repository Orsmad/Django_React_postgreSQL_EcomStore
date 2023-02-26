import { Grid, Paper, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProducts } from "../product/productSlice";
import { getAllCategoriesAsync, selectCategories } from "./categorySlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, []);

  //   const [category, setcategory] = useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <br></br>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={1000} key={index}>
            <Item>
              <h3>
                {" "}
                <Link to={`products/${category.id}`}>{category.name}</Link>
              </h3>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
