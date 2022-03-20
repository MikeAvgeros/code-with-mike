import React, { useEffect } from "react";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import { getPromotionDetails } from "../Api/Api";
import { Container, Grid } from "@mui/material";
import Course from "../Courses/Course";

const PromotionDetails = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    getPromotionDetails(slug);
  }, []);

  return (
    <React.Fragment>
      <div className="promotion-detail">
        <Container maxWidth="md">
          <Grid container direction="column">
            <h1 className="title">{snap.promotionDetails.name}</h1>
            <p className="subtitle">
              View courses with special discount below
            </p>
          </Grid>
        </Container>
      </div>
      <div>
        <Container sx={{ mt: 5, mb: 5 }}>
          <Grid container spacing={5}>
            {snap.courses
              .filter(
                (x) =>
                  x.promotion && x.promotion.name === snap.promotionDetails.name
              )
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

export default PromotionDetails;
