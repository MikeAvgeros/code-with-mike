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
  Button,
  IconButton,
  Rating,
  Avatar,
} from "@mui/material";
import store from "../Store/Store";
import { api } from "../Api/Api";

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

  const getCourseDetails = async () => {
    try {
      const { data } = await api.get(`store/products/${review.product.slug}`);
      store.courseDetails = data;
    } catch (err) {
      alert(
        `An error occured while trying to get the course details.\n\r${err}`
      );
    }
  };

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardHeader
        avatar={<Avatar alt="reviewer's avatar" src={review.customer.image} />}
        title={review.customer.user.username}
      />
      <CardContent>
        <h4>{review.product.name}</h4>
        <Rating name="read-only" value={review.rating} readOnly />
      </CardContent>
      <CardActions disableSpacing>
        <Link
          style={{ textDecoration: "none" }}
          to={`/course/${review.product.slug}`}
        >
          <Button onClick={getCourseDetails} className="btn">
            View Course
          </Button>
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
