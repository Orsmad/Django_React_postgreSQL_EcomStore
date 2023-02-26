import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProfileAsync,
  selectProfile,
  updateProileAsync,
} from "./profileSclice";
import FormControl from "@mui/material/FormControl";
import { Button, Card, CardMedia } from "@mui/material";
import { MY_SERVER } from "../../env";
import Profile from "../../models/Profile";
import SendIcon from "@mui/icons-material/Send";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileView = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectProfile);
  const notify = () => toast("Profile was updated! ");

  useEffect(() => {
    dispatch(getProfileAsync());
  }, []);
  const [fixUserProfile, setFixUserProfile] = useState(userProfile[0]);
  const [full_name, setFull_name] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // useEffect(() => {
  //   dispatch(getProfileAsync());
  // }, [dispatch]);
  // Listen for changes to the user profile in the Redux store
  useEffect(() => {
    // Check if the profile was updated
    if (
      userProfile &&
      userProfile.length > 0 &&
      userProfile[0].id === fixUserProfile.id
    ) {
      // Update the fixed user profile on the screen
      setFixUserProfile(userProfile[0]);
    }
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      setFixUserProfile(userProfile[0]);
    }
  }, [userProfile]);

  const handleFull_name = (e: any) => {
    e.preventDefault();
    setFull_name(e.target.value);
  };
  const handleAddress = (e: any) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  const handleMobile_number = (e: any) => {
    e.preventDefault();
    setMobile_number(e.target.value);
  };
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append("full_name", full_name);
    form_data.append("address", address);
    form_data.append("mobile_number", mobile_number);

    if (image) {
      form_data.append("image", image);
    }
    if (full_name) {
      form_data.append("full_name", full_name);
    }
    if (mobile_number) {
      form_data.append("mobile_number", mobile_number);
    }
    if (address) {
      form_data.append("address", address);
    }

    // form_data.append("id", userProfile.id);

    await dispatch(updateProileAsync(form_data));
    notify();
    setFull_name("");
    setAddress("");
    setMobile_number("");
    setImage(null);
  };

  if (!fixUserProfile) {
    return <div></div>;
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <div style={{ marginLeft: "20px" }}>
            <div>
              <p>
                <strong>Full Name:</strong>
              </p>
              <p>{fixUserProfile.full_name}</p>
            </div>
            <div>
              <p>
                <strong>Address:</strong>
              </p>
              <p>{fixUserProfile.address}</p>
            </div>
            <div>
              <p>
                <strong>Mobile Number:</strong>
              </p>
              <p>{fixUserProfile.mobile_number}</p>
            </div>
            <ToastContainer />
          </div>
        </div>
        <img
          src={MY_SERVER + fixUserProfile.image}
          alt="Example image"
          style={{ width: "20%", height: "50%" }}
        />

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="photo-input">Photo:</label>
            <input
              type="file"
              id="photo-input"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="titleFull_name">Full Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              id="titleFull_name"
              value={full_name}
              onChange={handleFull_name}
              required
              minLength={2}
              maxLength={40}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="content">Address:</label>
            <input
              type="text"
              placeholder="Address"
              id="content"
              value={address}
              onChange={handleAddress}
              minLength={2}
              maxLength={40}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              type="text"
              placeholder="Mobile Number"
              id="mobile_number"
              value={mobile_number}
              onChange={handleMobile_number}
              minLength={6}
              maxLength={14}
              required
            />
          </div>
          <Button type="submit" endIcon={<SendIcon />}>
            Update My Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
