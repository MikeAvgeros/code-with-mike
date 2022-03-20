import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
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
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
    }
  };

  const pStyle = {
    marginTop: 10,
    color: "gray",
    fontSize: 15,
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        sx={{
          height: "18px",
          backgroundImage: "linear-gradient(to right, #5e35b1, #d81b60)",
        }}
      />
      <CardContent>
        <h3>{category.name}</h3>
        <p style={pStyle}>{category.description}</p>
      </CardContent>
      <CardActions>
        <Link
          style={{ textDecoration: "none" }}
          to={`/category/${category.slug}`}
        >
          <Button
            size="small"
            className="btn"
            sx={{ ml: 1, mb: 1 }}
            onClick={getCategoryDetails}
          >
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Category;
