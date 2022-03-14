import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import store from "../Store/Store";
import { snapshot } from "valtio";
import { api } from "../Api/Api";

const Course = ({ course }) => {
  const snap = snapshot(store);

  const summarise = (text) => {
    const maxLength = 50;
    let words = text.split(" ");
    let totalChars = 0;
    let summary = [];

    words.every((word) => {
      summary.push(word);
      totalChars += word.length + 1;
      if (totalChars > maxLength) {
        return false;
      }
      return true;
    });

    return summary.join(" ") + "...";
  };

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(course.url);
      store.courseDetails = data;
    } catch (err) {
      alert(
        `An error occured while trying to get the full course description.\n\r${err}`
      );
    }
  };

  const getWishlistItems = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    try {
      const { data } = await api.get(`order/wishlist/${snap.customer.wishlist}/`, config);
      store.wishlistItems = data.items;
    } catch (err) {
      alert(`An error occured while trying to get the wishlist items.\n\r${err}`);
    }
  };

  const addToWishList = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    const wishlist = snap.customer.wishlist;
    const body = JSON.stringify({ item_id: course.id });
    try {
      await api.post(`order/wishlist/${wishlist}/items/`, body, config);
      getWishlistItems();
    } catch (err) {
      alert(
        `An error occured while trying to add course to the wishlist.\n\r${err}`
      );
    }
  };

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardMedia
        component="img"
        width="250"
        height="200"
        image={course.image}
        alt={course.name}
      />
      <CardContent>
        <h3>{course.name}</h3>
        <p>{summarise(course.tagline)}</p>
      </CardContent>
      <CardActions>
        {snap.userAuthenticated && (
          <IconButton sx={{ mb: 1 }} onClick={addToWishList}>
            <FavoriteIcon className="heart-icon" />
          </IconButton>
        )}
        <Link style={{ textDecoration: "none" }} to={`/course/${course.slug}`}>
          <Button size="small" className="btn" sx={{ ml: 1, mb: 1 }} onClick={getCourseDetails}>
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Course;
