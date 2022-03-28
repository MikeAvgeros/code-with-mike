import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { updateReview } from "../Api/Api";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
  Rating,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

const EditReview = () => {
  const snap = useSnapshot(store);
  const [review, setReview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: 5,
  });

  useEffect(() => {
    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    setReview(snap.reviews.find((review) => review.product.slug === slug));
  }, [snap.reviews]);

  useEffect(() => {
    setFormData({
      name: review ? review.name : "",
      description: review ? review.description : "",
      rating: review ? parseInt(review.rating) : 5,
    });
  }, [review]);

  const { name, description, rating } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateReview(snap.token, name, description, rating, review.id);
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
          Update your review
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditReview;
