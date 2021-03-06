import React from "react";
import { Container, Grid, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Container component="main">
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <h1 className="landing-tag">
          Learn the coding skills you need to become an expert developer
        </h1>
        <Stack direction="row" spacing={3}>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                mt: 10,
                width: "150px",
                height: "50px",
                color: "#fafafa",
                border: "2px solid #fafafa",
                textShadow: "1px 1px #212121"
              }}
              size="large"
              className="secondary-btn"
            >
              Courses
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                mt: 10,
                width: "150px",
                height: "50px",
                color: "#fafafa",
                border: "2px solid #fafafa",
                textShadow: "1px 1px #212121"
              }}
              size="large"
              className="secondary-btn"
            >
              Contact
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Container>
  );
};

export default Landing;
