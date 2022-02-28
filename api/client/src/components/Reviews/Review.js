import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Collapse,
  CardHeader,
  CardActions,
  Button,
  IconButton,
  Typography,
  Rating,
  Avatar
} from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!review) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar alt="user's avatar" src={review.customer.image} />}
        title={review.customer.user.username}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {review.product.name}
        </Typography>
        <Typography variant="body1">
          <Rating name="read-only" value={review.rating} readOnly />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" variant="outlined">
          View Course
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{review.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Review;
