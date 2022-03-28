import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const snap = useSnapshot(store);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 12,
          mb: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
          }}
        >
          <FavoriteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Wishlist
        </Typography>
        <Stack direction="column" spacing={5} sx={{ mt: 5 }}>
          {snap.wishlistItems.length > 0 ? (
            snap.wishlistItems.map((course, i) => (
              <WishlistItem key={i} course={course} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              The are no items in your wishlist
            </p>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Wishlist;
