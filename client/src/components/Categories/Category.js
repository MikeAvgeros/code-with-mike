import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
  CardActions,
} from "@mui/material";
import axios from "axios";
import store from "../Store/Store";

const Category = ({ category }) => {
  const getCategoryDetails = async () => {
    try {
      const { data } = await axios.get(category.url);
      store.categoryDetails = data;
    } catch (err) {
      console.log(err);
    }
  };

  if (!category) return null;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        sx={{
          height: "18px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {category.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ ml: 1 }}>
        <Link style={{ textDecoration: 'none' }} to={`/category/${category.slug}`}>
          <Button onClick={getCategoryDetails} className="btn">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Category;
