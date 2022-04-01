import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";

const Promotion = ({ promotion }) => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
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
          style={{ textDecoration: "none", marginLeft: "5px", marginBottom: "5px" }}
          className="btn"
          to={`/promotion/${promotion.slug}`}
        >
          Discounted Courses
        </Link>
      </CardActions>
    </Card>
  );
};

export default Promotion;
