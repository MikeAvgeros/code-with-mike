import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardActions } from "@mui/material";

const Category = ({ category }) => {
  const pStyle = {
    marginTop: 10,
    color: "gray",
    fontSize: 15,
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
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
          style={{ textDecoration: "none", marginLeft: "5px", marginBottom: "5px" }}
          className="btn"
          to={`/category/${category.slug}`}
        >
          Learn More
        </Link>
      </CardActions>
    </Card>
  );
};

export default Category;
