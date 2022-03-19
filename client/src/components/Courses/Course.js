import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../Api/Api";
import store from "../Store/Store";
import { snapshot } from "valtio";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Course = ({ course }) => {
  const snap = snapshot(store);
  const [allowWishlist, setAllowWishlist] = useState(false);

  useEffect(() => {
    let itemArray = [];
    snap.wishlistItems.forEach((x) => {
      itemArray.push(x.item.name);
    });
    setAllowWishlist(!itemArray.includes(course.name));
  }, []);

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
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
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
      const { data } = await api.get(
        `order/wishlist/${snap.customer.wishlist}/`,
        config
      );
      store.wishlistItems = data.items;
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
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
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
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
        {snap.userAuthenticated && allowWishlist && (
          <IconButton sx={{ mb: 1 }} onClick={addToWishList}>
            <FavoriteIcon className="heart-icon" />
          </IconButton>
        )}
        <Link style={{ textDecoration: "none" }} to={`/course/${course.slug}`}>
          <Button
            size="small"
            className="btn"
            sx={{ ml: 1, mb: 1 }}
            onClick={getCourseDetails}
          >
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Course;
