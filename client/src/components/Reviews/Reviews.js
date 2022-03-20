import React from "react";
import { Container, Grid } from "@mui/material";
import Review from "./Review";

const Reviews = ({ reviews }) => {
  return (
    <Container sx={{ mt: "10vh" }}>
      <h2 style={{ textAlign: "center" }}>
        Some happy students!
      </h2>
      <Grid
        container 
        sx={{ mt: "5vh", mb: "15vh" }}
        spacing={5}
      >
        {reviews &&
          reviews.map((review, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Review review={review} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Reviews;
