import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Course from "./Course";
import { useSnapshot } from "valtio";
import store from "../Store/Store";

const Courses = () => {
  const snap = useSnapshot(store); 

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Typography gutterBottom variant="h3">
        All Courses
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Whether you are looking for a career as a frontend or backend or mobile
        developent, here you will find all the courses to help you get started.
      </Typography>
      <Grid container spacing={5}>
        {snap.courses &&
          snap.courses.map((course, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Course course={course} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Courses;
