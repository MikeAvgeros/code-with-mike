import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getCartItems, getReviews } from "../Api/Api";
import store from "../Store/Store";
import { useSnapshot } from "valtio";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Rating,
  Avatar,
  Stack,
} from "@mui/material";
import { Image } from "mui-image";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const CourseDetails = () => {
  const snap = useSnapshot(store);
  const [qty, setQty] = useState(1);
  const [courseReviews, setCourseReviews] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    if (snap.courseDetails.length === 0) {
      getCourseDetails(slug);
    }
    getReviews();
    if (snap.courseDetails.reviews) {
      setCourseReviews(
        snap.reviews.filter((r) => snap.courseDetails.reviews.includes(r.id))
      );
    }
  }, [snap.courseDetails, snap.reviews.length]);

  const getCourseDetails = async (slug) => {
    try {
      const { data } = await api.get(`store/products/${slug}`);
      store.courseDetails = data;
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
    }
  };

  const addToCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      item_id: snap.courseDetails.id,
      quantity: qty,
    });
    try {
      await api.post(`order/carts/${snap.cartId}/items/`, body, config);
      getCartItems(snap.cartId);
      store.successResponse = "Course added to the cart.";
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
    }
  };

  const deleteReview = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${snap.token}`,
      },
    };
    try {
      await api.delete(`store/reviews/${e.target.value}/`, config);
      getReviews();
      store.successResponse = "Review was successfully deleted.";
    } catch (error) {
      let errorArray = [];
      for (const key in error.response.data) {
        errorArray.push(`${key}: ${error.response.data[key]}`);
      }
      store.errorResponses = errorArray;
    }
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  const pStyle = {
    textAlign: "center",
    color: "gray",
    marginTop: 2,
  };

  return (
    <React.Fragment>
      <div className="course-detail">
        <Container maxWidth="md">
          <Grid container direction="column">
            <h1 className="title">{snap.courseDetails.name}</h1>
            <p className="subtitle">{snap.courseDetails.tagline}</p>
          </Grid>
        </Container>
      </div>
      <div>
        <Container sx={{ mt: 5 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item sm={12} md={6}>
              <div
                dangerouslySetInnerHTML={{
                  __html: snap.courseDetails.description,
                }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Stack direction="column" spacing={5}>
                <Image
                  sx={{ maxWidth: "350px" }}
                  src={snap.courseDetails.image}
                />
                <Card sx={{ width: "350px", alignSelf: "center" }}>
                  <CardHeader
                    title="Monthly Payment"
                    titleTypographyProps={{ align: "center", color: "#fafafa" }}
                    sx={{
                      height: "48px",
                      backgroundImage:
                        "linear-gradient(to right, #5e35b1, #d81b60)",
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography variant="h3" color="text.primary">
                        £{snap.courseDetails.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /month
                      </Typography>
                    </Box>
                    <p style={pStyle}>Frequent Course Updates</p>
                    <p style={pStyle}>Tutor Support</p>
                    <p style={pStyle}>Career Guidance</p>
                    <p style={pStyle}>Student Forum</p>
                  </CardContent>
                  <CardActions sx={{ mb: 1, justifyContent: "center" }}>
                    <Button onClick={addToCart} className="btn">
                      Add to Cart
                    </Button>
                    <Button onClick={decreaseQty}>
                      <ArrowDownwardIcon />
                    </Button>
                    <Typography>Qty: {qty}</Typography>
                    <Button onClick={increaseQty}>
                      <ArrowUpwardIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 style={{ textAlign: "center", fontSize: "28px" }}>
                Customer Reviews
              </h2>
            </Grid>
            {courseReviews.length > 0 ? (
              courseReviews.map((review, i) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card key={i} sx={{ mb: 5, maxWidth: "350px" }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="user's avatar"
                          src={review.customer.image}
                        />
                      }
                      title={review.customer.user.username}
                    />
                    <CardContent>
                      <Rating name="read-only" value={review.rating} readOnly />
                      <Typography paragraph>{review.description}</Typography>
                      {snap.customer.user &&
                        review.customer.user.username ===
                          snap.customer.user.username && (
                          <Stack direction="row" spacing={2}>
                            <Link
                              to={`/review/edit/${snap.courseDetails.slug}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button size="small" className="btn">
                                Edit Review
                              </Button>
                            </Link>
                            <Button
                              value={review.id}
                              size="small"
                              className="btn"
                              onClick={deleteReview}
                            >
                              Delete Review
                            </Button>
                          </Stack>
                        )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p style={{ textAlign: "center", marginBottom: "5vh" }}>
                  This course doesn't have any reviews yet.
                </p>
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CourseDetails;
