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
  Typography,
} from "@mui/material";
import axios from "axios";
import store from "../Store/Store";
import { snapshot } from "valtio";
import api from "../Api/Api";

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
      console.log(err);
    }
  };

  const addToWishList = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
    const wishlist = localStorage.getItem("wishlist");
    const body = JSON.stringify({ item_id: snap.courseDetails.id });
    try {
      await api.post(`order/wishlist/${wishlist}/items/`, body, config);
    } catch (err) {
      console.log(err)
    }
  }

  if (!course) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardMedia
        component="img"
        width="256"
        height="256"
        image={course.image}
        alt={course.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {course.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {summarise(course.tag)}
        </Typography>
      </CardContent>
      <CardActions>
        {snap.userAuthenticated && (
          <IconButton onClick={addToWishList}>
            <FavoriteIcon />
          </IconButton>
        )}
        <Link style={{ textDecoration: "none" }} to={`/course/${course.slug}`}>
          <Button onClick={getCourseDetails} className="btn">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Course;
