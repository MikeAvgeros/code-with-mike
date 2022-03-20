import React from "react";
import { Container, Grid } from "@mui/material";
import Promotion from "./Promotion";

const Promotions = ({ promotions }) => {
  return (
    <Container sx={{ mt: "10vh" }}>
      <h2 style={{ textAlign: "center" }}>Current Promotions</h2>
      <Grid container sx={{ mt: "5vh", mb: "15vh" }} spacing={5}>
        {promotions ? (
          promotions.map((promotion, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Promotion promotion={promotion} />
            </Grid>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            The are currently no available promotions.
          </p>
        )}
      </Grid>
    </Container>
  );
};

export default Promotions;
