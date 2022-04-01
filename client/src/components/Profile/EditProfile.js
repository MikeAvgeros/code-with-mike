import React, { useState } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { updateProfile } from "../Api/Api";
import {
  Box,
  Button,
  Grid,
  Avatar,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditProfile = () => {
  const snap = useSnapshot(store);

  const [formData, setFormData] = useState({
    first_name: snap.customer.first_name ? snap.customer.first_name : "",
    last_name: snap.customer.last_name ? snap.customer.last_name : "",
    phone: snap.customer.phone ? snap.customer.phone : "",
    country: snap.customer.country ? snap.customer.country : "",
    customer_type: snap.customer.customer_type
      ? snap.customer.customer_type
      : "",
    birth_date: snap.customer.birth_date
      ? snap.customer.birth_date
      : new Date(),
    image: null,
  });

  const {
    first_name,
    last_name,
    phone,
    country,
    customer_type,
    birth_date,
    image,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setDate = (e) => {
    setFormData({ ...formData, birth_date: new Date(e).toDateString() });
  };

  const uploadFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(
      snap.token,
      first_name,
      last_name,
      phone,
      birth_date,
      country,
      image,
      customer_type
    );
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
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
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
            <FormControl fullWidth>
              <InputLabel id="customer_type">Customer Type</InputLabel>
              <Select
                labelId="customer_type"
                id="customer_type"
                label="Customer Type"
                name="customer_type"
                value={customer_type}
                autoComplete="customer_type"
                onChange={onChange}
              >
                <MenuItem disabled>Choose...</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Hobbyist">Hobbyist</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birth Date"
                value={birth_date}
                maxDate={new Date()}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="image">
              <input
                style={{ display: "none" }}
                onChange={uploadFile}
                accept="image/*"
                id="image"
                type="file"
              />
              <Button
                variant="outlined"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload
              </Button>
            </label>
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
  );
};

export default EditProfile;
