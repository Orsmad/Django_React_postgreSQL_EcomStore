import { Typography, TextField, Button, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { postOrder } from "../features/order/orderAPI";
import { postOrdersAsync } from "../features/order/orderSlice";
import OrderDetail from "../models/OrderDetail";
import Product from "../models/Product";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { MY_SERVER } from "../env";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { selectAuth } from "../features/authentication/authSlice";

const Payment = () => {
  const [products, setProducts] = useState<OrderDetail[]>([]);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifyOrder = () => toast("A new order was created! ");
  const isauth = useAppSelector(selectAuth);

  useEffect(() => {
    // Retrieve the list of products from local storage
    const productListJson = localStorage.getItem("cart");

    const productList = productListJson ? JSON.parse(productListJson) : [];
    // Convert the list of objects to a list of Product instances
    const productInstances = productList.map(
      (product: any) => new OrderDetail(product.product, product.quantity)
    );

    // Set the state with the list of Product instances
    setProducts(productInstances);
    setTotal(sumProducts(productInstances));
  }, []);
  useEffect(() => {
    setTotal(sumProducts(products));
  }, [products]);

  function sumProducts(products: OrderDetail[]) {
    let sum = 0;
    products.forEach((order) => {
      sum += order.product.price * order.quantity;
    });
    console.log(sum);
    return sum;
  }
  const handleOrder = () => {
    dispatch(postOrdersAsync(products));
    localStorage.removeItem("cart");
    setProducts([]);
    notifyOrder();
    // navigate("/");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <ToastContainer />
      <h1> total : {total.toFixed()}$</h1>
      <br></br>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AVwCcq5PxD2rvDrIuOYJXV5UcR0TCddAvtYmnDbUKKDSCWpuCrDbP8LyFoYV5Y_DHeCZEHPlVewRlhiK",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: sumProducts(products).toFixed(2),
                  },
                },
              ],
            });
          }}
        />
      </PayPalScriptProvider>
      <Button variant="outlined" size="small">
        {" "}
        <Link to={`/cart`}> Edit cart</Link>{" "}
      </Button>{" "}
      <br></br>
      <br></br>
      {isauth ? (
        <Button
          onClick={() => handleOrder()}
          variant="outlined"
          endIcon={<SendIcon />}
        >
          ORDER(Creates an order for presentation purposes)
        </Button>
      ) : (
        <p>Please login to order (non related to Paypal checkout, you would unlock an add order button. :)</p>
      )}
    </div>
  );
};

export default Payment;
