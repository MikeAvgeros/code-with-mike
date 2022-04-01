import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addItemToWishlist } from "../Api/Api";
import store from "../Store/Store";
import { snapshot } from "valtio";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
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
  }, [snap.wishlistItems, course.name]);

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

  const handleAddToWishlist = () => {
    addItemToWishlist(snap.token, snap.customer.wishlist, course.id);
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardMedia
        component="img"
        width="275"
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
          <IconButton sx={{ mb: 1 }} onClick={handleAddToWishlist}>
            <FavoriteIcon className="heart-icon" />
          </IconButton>
        )}
        <Link
          style={{
            textDecoration: "none",
            marginLeft: "5px",
            marginBottom: "5px",
          }}
          className="btn"
          to={`/course/${course.slug}`}
        >
          Learn More
        </Link>
      </CardActions>
    </Card>
  );
};

export default Course;
