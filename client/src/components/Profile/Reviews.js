import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import { getReviews, deleteReview } from "../Api/Api";
import {
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
} from "@mui/material";

const Reviews = () => {
  const snap = useSnapshot(store);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    getReviews();
    setMyReviews(
      snap.reviews.filter(
        (review) =>
          review.customer.user.username === snap.customer.user.username
      )
    );
  }, [snap.reviews.length]);

  const handleDeleteReview = (e) => {
    deleteReview(snap.token, e.target.value);
  };

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <h2 style={{ textAlign: "center" }}>My Reviews</h2>
      <p style={{ marginBottom: 25, marginTop: 10, textAlign: "center" }}>
        Below you can find a list of all the reviews you have written.
      </p>
      <Grid
        container
        spacing={5}
        justifyContent="space-evenly"
      >
        {myReviews && (
          myReviews.map((review, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card sx={{ mb: 5, minWidth: 275, boxShadow: 3 }}>
                <CardContent>
                  <h4>{review.product.name}</h4>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <p>{review.description}</p>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Link
                      to={`/review/edit/${review.product.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" className="btn">
                        Edit Review
                      </Button>
                    </Link>
                    <Button
                      value={review.id}
                      size="small"
                      className="btn"
                      onClick={handleDeleteReview}
                    >
                      Delete Review
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )))}
      </Grid>
    </Container>
  );
};

export default Reviews;
