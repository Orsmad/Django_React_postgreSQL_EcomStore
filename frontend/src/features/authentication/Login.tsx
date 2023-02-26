import React, { useState } from "react";
import { MY_SERVER } from "../../env";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync, selectAuth } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const notifyLogin = () => toast("Welcome back! ");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isauth = useAppSelector(selectAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password || emailError || passwordError) {
      return;
    }
    try {
      await new Promise((resolve, reject) => {
        dispatch(loginAsync({ email, password })).then(resolve).catch(reject);
      });
      notifyLogin()
      setTimeout(() => {
        navigate("/");
      }, 3000);    } catch (error) {
    
    }
  };

  const validateEmail = (value: string) => {
    setEmail(value);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length < 8) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value) || value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <div>
            <ToastContainer />

      <h1>Welcome back</h1>
      <br />
      <TextField
        onChange={(e) => validateEmail(e.target.value)}
        error={emailError}
        helperText={
          emailError && "Email should be at least 8 characters long and valid."
        }
        id="email"
        label="Email"
        type="email"
        variant="filled"
      />
      <br />
      <TextField
        onChange={(e) => validatePassword(e.target.value)}
        error={passwordError}
        helperText={
          passwordError &&
          "Password should be at least 8 characters long and contain at least one letter and one number."
        }
        id="password"
        label="Password"
        type="password"
        variant="filled"
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Login
      </Button>
      <br />
      Not a Customer? <br />
      <Button variant="outlined">
        <Link className="active" to="/register">
          Register
        </Link>
      </Button>
    </div>
  );
};

export default Login;
