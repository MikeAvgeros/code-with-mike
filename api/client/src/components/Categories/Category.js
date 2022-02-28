import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
  CardActions,
} from "@mui/material";

const Category = ({ category }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        sx={{
          height: "18px",
          backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
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
        <Button variant="contained" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Category;
