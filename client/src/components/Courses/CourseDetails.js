import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getCartItems } from "../Api/Api";
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
} from "@mui/material";

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
    setCourseReviews(
      snap.reviews.filter((r) => snap.courseDetails.reviews.includes(r.id))
    );
  }, [snap.courseDetails, snap.reviews]);

  const getCourseDetails = async (slug) => {
    try {
      const { data } = await api.get(`store/products/${slug}`);
      store.courseDetails = data;
    } catch (err) {
      alert(
        `An error occured while trying to get the course details.\n\r${err}`
      );
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
    } catch (err) {
      alert(`An error occured while trying to add course to cart.\n\r${err}`);
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
        <Container sx={{ mt: 15 }} maxWidth="md">
          <Grid container direction="column" justifyContent="center">
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
              <Card sx={{ mb: 5, width: "350px" }}>
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
                  <Button onClick={decreaseQty}>🡻</Button>
                  <Typography>Qty: {qty}</Typography>
                  <Button onClick={increaseQty}>🡹</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={5}>
            <Grid item sm={12} md={6}>
              {courseReviews.length > 0 &&
                courseReviews.map((review, i) => (
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
                      {snap.customer.length > 0 &&
                        review.customer.user.username ===
                          snap.customer.user.username && (
                          <Link
                            to={`/edit-review/${snap.courseDetails.slug}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button size="small" className="btn">
                              Edit Review
                            </Button>
                          </Link>
                        )}
                    </CardContent>
                  </Card>
                ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CourseDetails;
