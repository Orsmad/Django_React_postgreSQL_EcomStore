import { Typography, TextField, Button, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { postOrdersAsync } from "../features/order/orderSlice";
import OrderDetail from "../models/OrderDetail";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const notifyClean = () => toast("Cleared! ");

  const [productID, setProductID] = useState(0);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<OrderDetail[]>([]);
  const [total, setTotal] = useState(0);

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

  function refreshProductList() {
    // Retrieve the list of products from local storage
    const productListJson = localStorage.getItem("cart");

    const productList = productListJson ? JSON.parse(productListJson) : [];
    // Convert the list of objects to a list of OrderDetail instances
    const productInstances = productList.map(
      (product: any) => new OrderDetail(product.product, product.quantity)
    );

    // Set the state with the list of OrderDetail instances
    setProducts(productInstances);
    setTotal(sumProducts(productInstances));
  }

  function clearCart() {
    notifyClean();
    localStorage.removeItem("cart");
    setProducts([]);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("quantity", quantity.toString());
    console.log(formData);
    dispatch(postOrdersAsync(products));
  };
  function sumProducts(products: OrderDetail[]) {
    let sum = 0;
    products.forEach((order) => {
      sum += order.product.price * order.quantity;
    });
    return sum;
  }

  function removeDetailFromList(detail: OrderDetail): void {
    const orderDetailListJson = localStorage.getItem("cart");
    if (orderDetailListJson) {
      const orderDetailList: OrderDetail[] = JSON.parse(orderDetailListJson);
      const index = orderDetailList.findIndex(
        (d) => d.product.id === detail.product.id
      );
      if (index !== -1) {
        orderDetailList.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(orderDetailList));
      }
      refreshProductList();
      setTimeout(() => toast("Item removed from cart"), 10);
    }
  }

  const handleQuantityChange = (detail: OrderDetail, quantity: number) => {
    const orderDetailListJson = localStorage.getItem("cart");
    if (orderDetailListJson) {
      const orderDetailList: OrderDetail[] = JSON.parse(orderDetailListJson);
      const index = orderDetailList.findIndex(
        (d) => d.product.id === detail.product.id
      );
      if (index !== -1) {
        orderDetailList[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(orderDetailList));
        setProducts(orderDetailList);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      {products.map((order: OrderDetail, index: number) => (
        <div key={index}>
          {order.product && order.product.name && (
            <Typography variant="h2">{order.product.name}</Typography>
          )}
          {order.product.price.toFixed(2)}:$
          <br />
          <Typography variant="body1">quantity: {order.quantity}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              placeholder="1"
              id="quantity"
              value={order.quantity}
              onChange={(e) =>
                handleQuantityChange(order, parseInt(e.target.value))
              }
              required
              inputProps={{ min: "1" }}
            />
            <ToastContainer />

            <Button onClick={() => removeDetailFromList(order)}>Remove</Button>
          </form>
        </div>
      ))}
      <h1> total : {total.toFixed()}$</h1>

      {products.length > 0 ? (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => clearCart()}
        >
          Clear cart
        </Button>
      ) : (
        <p>Cart is empty! </p>
      )}
      {products.length > 0 ? (
        <Button variant="contained" endIcon={<SendIcon />}>
          {" "}
          <Link className="active" to="/payment">
            {" "}
            Continue to payment
          </Link>
        </Button>
      ) : (
        <p></p>
      )}
      <br></br>      <br></br>      <br></br>


    </div>
  );
};

export default Cart;
