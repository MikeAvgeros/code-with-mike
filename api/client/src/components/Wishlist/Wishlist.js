import React from "react";
import { Box, Container, Avatar, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Wishlist = ({ items }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
          }}
        >
          <FavoriteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your wishlist
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          {items ? (
            items.map((item, i) => <Stack direction="row" spacing={3}></Stack>)
          ) : (
            <Typography align="center" variant="body1">
              The are no items in your wishlist
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Wishlist;
