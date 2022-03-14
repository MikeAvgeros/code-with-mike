import React, { useState } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { updateProfile } from "../Api/Api";
import {
  Box,
  Button,
  TextField,
  Grid,
  Avatar,
  Typography
} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const EditProfile = () => {
  const snap = useSnapshot(store);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    birth_date: ""
  });

  const { first_name, last_name, phone, country, birth_date } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(snap.token, first_name, last_name, phone, country, birth_date);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          m: 1,
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      >
        <ManageAccountsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              value={first_name}
              autoComplete="first_name"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              value={last_name}
              autoComplete="last_name"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={phone}
              autoComplete="phone"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={country}
              autoComplete="country"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="birth_date"
              label="Birth Date"
              name="birth_date"
              value={birth_date}
              autoComplete="birth_date"
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
          }}
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  )
};

export default EditProfile;
