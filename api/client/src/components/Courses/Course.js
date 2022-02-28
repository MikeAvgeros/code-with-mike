import React from "react";
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

const Course = ({ course }) => {
  if (!course) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          height: "24px",
          backgroundImage: "linear-gradient(to right, #512da8, #c2185b)",
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
          {course.tag}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Course;
