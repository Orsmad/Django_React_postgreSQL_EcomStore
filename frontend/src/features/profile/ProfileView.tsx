import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProfileAsync,
  selectProfile,
  updateProileAsync,
} from "./profileSclice";
import FormControl from "@mui/material/FormControl";
import { Box, Button, Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { SERVER_IMAGES } from "../../env";
import Profile from "../../models/Profile";
import SendIcon from "@mui/icons-material/Send";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileView = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast("Profile was updated! ");

  useEffect(() => {
    dispatch(getProfileAsync());
  }, []);
  const userProfile = useAppSelector(selectProfile);

  const [fixUserProfile, setFixUserProfile] = useState(userProfile[0]);
  const [full_name, setFull_name] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [image, setImage] = useState<File | null>(null);

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
    <Box mt={4}>
    <Grid container spacing={2}>

    <Grid item xs={12}>
          <Typography variant="h5" align="center">
            User Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Full Name:</strong>
          </Typography>
          <Typography>{fixUserProfile.full_name}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Address:</strong>
          </Typography>
          <Typography>{fixUserProfile.address}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            <strong>Mobile Number:</strong>
          </Typography>
          <Typography>{fixUserProfile.mobile_number}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={SERVER_IMAGES + fixUserProfile.image}
            alt="Example image"
            style={{ width: "40%" }}
          />
        </Grid>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Update Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="full_name"
                  name="full_name"
                  label="Full Name"
                  variant="outlined"
                  value={full_name}
                  onChange={handleFull_name}
                  fullWidth
                  required
                  inputProps={{ maxLength: 40 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={handleAddress}
                  fullWidth
                  required
                  />

</Grid>
<Grid item xs={12} md={6}>
                <TextField
                  id="mobile_number"
                  name="mobile_number"
                  label="mobile number"
                  variant="outlined"
                  value={mobile_number}
                  onChange={handleMobile_number}
                  fullWidth
                  required
                  inputProps={{ maxLength: 40 }}
             
                />
              </Grid>

        
        <Button type="submit" endIcon={<SendIcon />}>
          Update My Profile
        </Button>
        </Grid>

      </form>
      </Grid>

    </Box>
    </div>

  );
};

export default ProfileView;
