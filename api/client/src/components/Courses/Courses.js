import React, { useState, useEffect } from "react";
import Course from "./Course";
import api from "../Api/Api";
import { Container, Grid, Typography } from "@mui/material";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const { data } = await api.get("store/products");
    setCourses(data.results);
  };

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Typography gutterBottom variant="h3" component="div">
        All Courses
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Whether you are looking for a career as a frontend or backend or mobile
        developent, here you will find all the courses to help you get started.
      </Typography>
      <Grid container spacing={5}>
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

export default Courses;
