import React from "react";
import { Container, Grid, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Container sx={{ mt: 25 }} maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography className="landing-tag" variant="h1" component="div">
          Learn the coding skills you need to become an expert developer
        </Typography>
        <Stack direction="row" spacing={3}>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 10,
                width: "150px",
                height: "50px",
                color: "#fafafa",
                borderColor: "#fafafa",
                borderWidth: "medium",
              }}
            >
              Courses
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 10,
                width: "150px",
                height: "50px",
                color: "#fafafa",
                borderColor: "#fafafa",
                borderWidth: "medium",
              }}
            >
              Learn More
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Container>
  );
};

export default Landing;
