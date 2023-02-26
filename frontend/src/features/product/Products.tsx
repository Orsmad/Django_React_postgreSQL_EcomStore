import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addToCart, itemExistsInList, removeFromCart } from "../../utils/cart";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getAllProductsByidAsync, selectProducts } from "./productSlice";
import { SERVER_IMAGES } from "../../env";
import { ToastContainer } from "react-toastify";
import Product from "../../models/Product";

const LazyCard = lazy(() => import("@mui/material/Card"));

const Products = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [visibleProducts, setVisibleProducts] = useState<number>(3);
  const [cartProducts, setCartProducts] = useState<{ [key: string]: boolean }>(
    {}
  );

  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProductsByidAsync(id || ""));
  }, []);
  useEffect(() => {
    const updatedCartProducts = { ...cartProducts };
    products.forEach((product) => {
      updatedCartProducts[product.id] = itemExistsInList(product);
    });
    setCartProducts(updatedCartProducts);
  }, [products]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      setLoadMore(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loadMore) {
      setVisibleProducts((prevCount) => prevCount + 3);
      setLoadMore(false);
    }
  }, [loadMore]);
  const handleClickAdd = (product: Product) => {
    addToCart(product);
    setCartProducts((prevProducts) => ({
      ...prevProducts,
      [product.id]: true,
    }));
  };
  const handleClickRemoved = (product: Product) => {
    removeFromCart(product);
    setCartProducts((prevProducts) => ({
      ...prevProducts,
      [product.id]: false,
    }));
  };

  return (
    <div>
      <ToastContainer />

      <Grid
        container
        style={{ height: "100vh", overflowY: "scroll" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {products.slice(0, visibleProducts).map((product, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyCard sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={SERVER_IMAGES + product.image}
                  title={product.name}
                />

                <Grid item xs={6}></Grid>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                    <br />
                    {product.price.toFixed(2)}$
                  </Typography>
                  <CardActions>
                    {/* {itemExistsInList(product) ? <div>yes</div> : <div>no</div>} */}
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

                    <Button variant="outlined" size="small">
                      <Link to={`product/${product.id}`}>Product page</Link>
                    </Button>
                  </CardActions>
                </CardContent>
              </LazyCard>
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
