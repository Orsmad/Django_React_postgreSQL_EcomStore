import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Categories from "./features/category/Categories";
import Products from "./features/product/Products";
import Register from "./features/authentication/Register";
import Profile from "./features/profile/ProfileView";
import Login from "./features/authentication/Login";
import Product from "./features/product/ProductView";
import Cart from "./components/Cart";
import Logout from "./features/authentication/Logout";
import Payment from "./components/Payment";
import HomeScreen from "./components/HomeScreen";
import About from "./components/About";
import ContactUs from "./components/ContactUs";

const container = document.getElementById("root")!;
// const root = createRoot(container);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="logout" element={<Logout />} />
          <Route path="payment" element={<Payment />} />

          {/* <Route path='products/:id' element={< Products/>} /> */}
          <Route path="categories/products/:id" element={<Products />} />
          <Route
            path="categories/products/:id/product/:id"
            element={<Product />}
          />

          {/* <Route path="expenses" element={<Expenses />} /> */}
          <Route path="categories" element={<Categories />} />

          <Route path="about" element={<About />} />

          <Route path="register" element={<Register />}></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="contact" element={<ContactUs />}></Route>

          {/* <Route path="invoices" element={<Invoices />}> */}
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <HomeScreen></HomeScreen>
              </main>
            }
          />
          {/* <Route path=":myInvoiceId" element={<Invoice />} /> */}
          {/* </Route> */}
          {/* <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing g here!</p>
              </main>
            }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
