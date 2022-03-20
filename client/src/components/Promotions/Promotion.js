import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../Store/Store";
import {
  Card,
  CardContent,
  Button,
  CardHeader,
  CardActions,
} from "@mui/material";

const Promotion = ({ promotion }) => {
  const getPromotionDetails = async () => {
    try {
      const { data } = await axios.get(promotion.url);
      store.promotionDetails = data;
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
    }
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
        <h3>{promotion.name}</h3>
      </CardContent>
      <CardActions>
        <Link
          style={{ textDecoration: "none" }}
          to={`/promotion/${promotion.slug}`}
        >
          <Button
            size="small"
            className="btn"
            sx={{ ml: 1, mb: 1 }}
            onClick={getPromotionDetails}
          >
            Discounted Courses
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Promotion;
