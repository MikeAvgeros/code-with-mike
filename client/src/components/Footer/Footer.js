import React from "react";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";

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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
};

export default Footer;
