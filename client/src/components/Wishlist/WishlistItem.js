import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { api, getCartItems, getWishListItems } from "../Api/Api";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const WishlistItem = ({ course }) => {
  const snap = useSnapshot(store);

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
      getWishListItems(snap.token, snap.customer.wishlist);
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
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: "#e0e0e0",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt={course.item.name} src={course.item.image} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <p>{course.item.name}</p>
        </Grid>
        <Grid item>
          <p>£{course.item.price}/mo</p>
        </Grid>
        <Grid item>
          <Button
            value={course.item.id}
            size="small"
            className="btn"
            onClick={addToCart}
          >
            Add To Cart
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WishlistItem;
