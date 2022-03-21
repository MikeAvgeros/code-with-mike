import React from "react";
import { useSnapshot } from "valtio";
import store from "../Store/Store";
import { addItemToCart, deleteItemFromWishlist } from "../Api/Api";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const WishlistItem = ({ course }) => {
  const snap = useSnapshot(store);
  const wishlistItem = snap.wishlistItems.find(
    (w) => w.item.id === parseInt(course.item.id)
  );

  const handleAddItem = () => {
    addItemToCart(course.item.id, 1, snap.cartId);
    deleteItemFromWishlist(snap.token, snap.customer.wishlist, wishlistItem.id);
  };

  const handleDeleteItem = () => {
    deleteItemFromWishlist(snap.token, snap.customer.wishlist, wishlistItem.id);
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
          <p style={{ width: "250px" }}>{course.item.name}</p>
        </Grid>
        <Grid item>
          <p>£{course.item.price}/mo</p>
        </Grid>
        <Grid item>
          <IconButton sx={{ color: "#5e35b1" }} onClick={handleAddItem}>
            <ShoppingCartIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton sx={{ color: "#5e35b1" }} onClick={handleDeleteItem}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WishlistItem;
