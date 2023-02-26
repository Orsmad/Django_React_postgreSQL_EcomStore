import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync, registerAsync, selectAuth } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const notifyRegister = () =>
    toast("Welcome! Lest start By creating your profile");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isauth = useAppSelector(selectAuth);

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // enforce password policy
    if (/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
      setPassword(value);
    } else {
      setPassword("");
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === confirmEmail) {
      dispatch(registerAsync({ email, password }));
      notifyRegister();
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    } else {
      alert("Emails do not match!");
    }
  };

  return (
    <div>
      <ToastContainer />

      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          variant="filled"
          required
        />
        <br />
        <TextField
          onChange={(e) => setConfirmEmail(e.target.value)}
          id="confirm-email"
          label="Confirm Email"
          type="email"
          autoComplete="current-email"
          variant="filled"
          required
        />
        <br />
        <TextField
          onChange={handleChangePassword}
          id="password"
          label="Password"
          type="password"
          variant="filled"
          required
          inputProps={{ minLength: 8 }}
          helperText="Minimum 8 characters with at least one letter and one digit"
        />
        <br />
        <Button variant="outlined" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
