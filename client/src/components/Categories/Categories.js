import React from "react";
import { Container, Grid } from "@mui/material";
import Category from "./Category";
import { useSnapshot } from "valtio";
import store from "../Store/Store";

const Categories = () => {
  const snap = useSnapshot(store); 

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <h2>Learning Paths</h2>
      <p style={{ marginBottom: 15 }}>
        Whether you're a beginner just starting out or an experienced developer
        looking for courses to enhance your skills and reach higher levels of
        software engineering, these learning paths will help you achieve your
        goal.
      </p>
      <Grid container spacing={5}>
        {snap.categories &&
          snap.categories.map((category, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Category category={category} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Categories;
