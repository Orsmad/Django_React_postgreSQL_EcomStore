import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import reviewSlice, { updateCanPostAsync } from "../review/reviewSlice";
import { updateIsAuth } from "./authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const doLogout = async () => {
    localStorage.clear();

    dispatch(updateIsAuth());
    dispatch(updateCanPostAsync());

    navigate("/");
  };

  return <Button onClick={() => doLogout()}>logout </Button>;
};

export default Logout;
