import React, { useEffect } from "react";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import { getCategoryDetails } from "../Api/Api";
import { Container, Grid } from "@mui/material";
import Course from "../Courses/Course";

const CategoryDetails = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    getCategoryDetails(slug);
  }, []);

  if (!snap.categoryDetails) return null;

  return (
    <React.Fragment>
      <div className="category-detail">
        <Container maxWidth="md">
          <Grid
            container
            direction="column"
          >
            <h1 className="title">
              {snap.categoryDetails.name}
            </h1>
            <p className="subtitle">
              {snap.categoryDetails.description}
            </p>
          </Grid>
        </Container>
      </div>
      <div>
        <Container sx={{ mt: 5, mb: 5 }}>
          <Grid container spacing={5}>
            {snap.categoryDetails.name === "Full Stack Development"
              ? snap.courses
                .filter(
                  (x) =>
                    x.category.name === "Backend Development" ||
                    "Frontend Development"
                )
                .map((course, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <Course course={course} />
                  </Grid>
                ))
              : snap.courses
                .filter((x) => x.category.name === snap.categoryDetails.name)
                .map((course, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <Course course={course} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CategoryDetails;
