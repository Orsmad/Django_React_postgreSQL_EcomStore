import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MY_SERVER } from "../../env";
import { addToCart, itemExistsInList, removeFromCart } from "../../utils/cart";
import { selectAuth } from "../authentication/authSlice";
import Reviews from "../review/Reviews";
import {
  selectProducts,
  getAllProductsByidAsync,
  getProductByIDAsync,
} from "./productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../models/Product";

const ProductView = () => {
  const products = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [cartProducts, setCartProducts] = useState<{ [key: string]: boolean }>(
    {}
  );
  const handleClickAdd = (product: Product) => {
    addToCart(product);
    setCartProducts((prevProducts) => ({
      ...prevProducts,
      [product.id]: true,
    }));
    // setCartProducts((prevProducts) => [...prevProducts, product.id]);
  };
  const handleClickRemoved = (product: Product) => {
    removeFromCart(product);
    setCartProducts((prevProducts) => ({
      ...prevProducts,
      [product.id]: false,
    }));
    // setCartProducts((prevProducts) => [...prevProducts, product.id]);
  };

  useEffect(() => {
    const updatedCartProducts = { ...cartProducts };
    products.forEach((product) => {
      updatedCartProducts[product.id] = itemExistsInList(product);
    });
    setCartProducts(updatedCartProducts);
  }, [products]);

  useEffect(() => {
    dispatch(getProductByIDAsync(id || ""));
  }, []);

  const product = useAppSelector(selectProducts);

  const isauth = useAppSelector(selectAuth);

  return (
    <div>
      <ToastContainer />

      {product.map((product, index) => (
        <div
          key={index}
          style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={MY_SERVER + product.image}
              title={product.name}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
                <br />
                {product.price.toFixed(2)}$
              </Typography>
              <Typography gutterBottom variant='body1' component="div">
  {product.description?.slice(0, 200)}
  {/* {product.description && product.description.length > 120 ? "..." : ""} */}
</Typography>


              <CardActions>
                {cartProducts[product.id] ? (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleClickRemoved(product)}
                  >
                    Remove from cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    // onClick={() => addToCart(product)}
                    onClick={() => handleClickAdd(product)}
                  >
                    Add to cart
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
      <br></br>
      <br></br>

      <Reviews {...product[0]}></Reviews>
    </div>
  );
};

export default ProductView;
