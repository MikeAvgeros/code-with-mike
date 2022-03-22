import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const Copyright = () => {
    return (
      <p style={{ textAlign: "center", color: "#fafafa" }}>
        {"Copyright © "}
        <Link to="/" style={{ textDecoration: "none", color: "#fafafa" }}>
          Code with Mike
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </p>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#212121",
      }}
    >
      <Container maxWidth="sm">
        <Grid container justifyContent="center" alignItems="center">
          <a
            href="https://facebook.com"
            aria-label="Go to Facebook page"
            target="_blank"
            rel="noopener"
          >
            <FacebookIcon className="footer-icon" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Go to Twitter page"
            target="_blank"
            rel="noopener"
          >
            <TwitterIcon className="footer-icon" />
          </a>
          <a
            href="https://youtube.com"
            aria-label="Go to YouTube page"
            target="_blank"
            rel="noopener"
          >
            <YouTubeIcon className="footer-icon" />
          </a>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
};

export default Footer;
