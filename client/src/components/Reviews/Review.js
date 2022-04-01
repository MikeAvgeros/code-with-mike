import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Collapse,
  CardHeader,
  CardActions,
  IconButton,
  Rating,
  Avatar,
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

  return (
    <Card sx={{ minWidth: 250, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar alt="reviewer's avatar" src={review.customer.image} />}
        title={review.customer.user.username}
      />
      <CardContent>
        <h4>{review.product.name}</h4>
        <Rating name="read-only" value={review.rating} readOnly />
      </CardContent>
      <CardActions>
        <Link
          style={{ textDecoration: "none", marginLeft: "5px", marginBottom: "5px" }}
          className="btn"
          to={`/course/${review.product.slug}`}
        >
          View Course
        </Link>
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
          <p>{review.description}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Review;
