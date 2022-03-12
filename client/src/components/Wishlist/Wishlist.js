import React from "react";
import api from "../Api/Api";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Wishlist = () => {
  const snap = useSnapshot(store);

  const getCartItems = async () => {
    try {
      const { data } = await api.get(`order/carts/${snap.cartId}/`);
      store.cartItems = data.items;
    } catch (err) {
      alert(`An error occured while trying to get the cart items.\n\r${err}`);
    }
  };

  const addToCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ item_id: snap.courseDetails.id, quantity: 1 });
    try {
      await api.post(`order/carts/${snap.cartId}/items/`, body, config);
      getCartItems();
    } catch (err) {
      alert(`An error occured while trying to add the course to cart.\n\r${err}`);
    }
  };

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
            backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
          }}
        >
          <FavoriteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Wishlist
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
          {snap.wishlistItems ? (
            snap.wishlistItems.map((course, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <Typography>Course: {course.item.name}</Typography>
                <Button className="btn" onClick={addToCart}>Add To Cart</Button>
              </Stack>
            ))
          ) : (
            <Typography align="center" variant="body1">
              The are no items in your cart
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Wishlist;
