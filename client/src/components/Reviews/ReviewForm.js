import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { sendReview } from "../Api/Api";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

const ReviewForm = () => {
  const snap = useSnapshot(store);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setCourses(snap.orders.find((order) => order.id === parseInt(id)).items);
  }, [snap.orders]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: null,
    product: null,
    customer: snap.customer.id,
  });

  const { name, description, rating, product, customer } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendReview(snap.token, name, description, rating, product, customer);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 12,
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
          <RateReviewIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Write a review
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel required id="customer_type">
                  Select Course
                </InputLabel>
                <Select
                  labelId="product"
                  id="product"
                  label="Select Course"
                  name="product"
                  value={product}
                  autoComplete="product"
                  onChange={onChange}
                >
                  <MenuItem disabled>Choose...</MenuItem>
                  {courses.map((course, i) => (
                    <MenuItem key={i} value={course.item.id}>
                      {course.item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Rating name="rating" value={rating} onChange={onChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Title"
                name="name"
                value={name}
                autoComplete="name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={5}
                id="description"
                label="Description"
                name="description"
                value={description}
                autoComplete="description"
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
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ReviewForm;
