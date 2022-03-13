import React from "react";
import { Container, Grid } from "@mui/material";
import Course from "./Course";

const FeaturedCourses = ({ courses }) => {
  return (
    <Container sx={{ mt: 5 }}>
      <h2 style={{ textAlign: "center" }}>
        Featured Courses
      </h2>
      <Grid
        container 
        sx={{ mb: 5, mt: 5 }}
        justifyContent="center"
        spacing={5}
      >
        {courses &&
          courses.map((course, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Course course={course} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default FeaturedCourses;
