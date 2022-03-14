import React from "react";
import { api, getCartItems } from "../Api/Api";
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

  const getWishListItems = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    try {
      const wishlistId = snap.customer.wishlist;
      const { data } = await api.get(`order/wishlist/${wishlistId}/`, config);
      store.wishlistItems = data.items;
    } catch (err) {
      alert(
        `An error occured while trying to get the wishlist items.\n\r${err}`
      );
    }
  };

  const removeFromWishlist = async (itemId) => {
    const wishlistItem = snap.wishlistItems.find(
      (w) => w.item.id === parseInt(itemId)
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    try {
      await api.delete(
        `order/wishlist/${snap.customer.wishlist}/items/${wishlistItem.id}/`,
        config
      );
      getWishListItems();
    } catch (err) {
      alert(
        `An error occured while trying to delete the item that you added to the cart from the wishlist.\n\r${err}`
      );
    }
  };

  const addToCart = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      item_id: e.target.value,
      quantity: 1,
    });
    try {
      await api.post(`order/carts/${snap.cartId}/items/`, body, config);
      getCartItems(snap.cartId);
      removeFromWishlist(e.target.value);
    } catch (err) {
      alert(
        `An error occured while trying to add the course to cart.\n\r${err}`
      );
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          mt: 12,
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
          {snap.wishlistItems ? (
            snap.wishlistItems.map((course, i) => (
              <Stack key={i} direction="row" spacing={5}>
                <Avatar alt="course image" src={course.item.image} />
                <p
                  style={{
                    minWidth: "250px",
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  {course.item.name}
                </p>
                <Button
                  value={course.item.id}
                  size="small"
                  className="btn"
                  onClick={addToCart}
                >
                  Add To Cart
                </Button>
              </Stack>
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
