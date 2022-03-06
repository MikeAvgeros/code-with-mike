import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Image } from "mui-image";
import api from "../Api/Api";
import "./Course.css";

const CourseDetails = () => {
  const snap = useSnapshot(store);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf("/") + 1);
    if (snap.courses.length === 0) {
      getCourseDetails(slug);
    }
  }, []);

  const getCourseDetails = async (slug) => {
    try {
      const { data } = await api.get(`store/products/${slug}`);
      store.courseDetails = data;
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const cart = localStorage.getItem("cart");
    const body = JSON.stringify({ item_id: snap.courseDetails.id, quantity: qty });
    try {
      const { data } = await api.post(`order/carts/${cart}/items/`, body, config);
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  };

  const increaseQty = () => {
    setQty(prevQty => prevQty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(prevQty => prevQty - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="course-detail">
        <Container sx={{ mt: 15 }} maxWidth="sm">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ mb: 5 }} className="title" variant="h1">
              {snap.courseDetails.name}
            </Typography>
            <Typography sx={{ mb: 5 }} className="subtitle" variant="body1">
              {snap.courseDetails.tag}
            </Typography>
          </Grid>
        </Container>
      </div>
      <div>
        <Container sx={{ mt: 5 }} maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: 18 }} variant="body1">
                <div dangerouslySetInnerHTML={{ __html: snap.courseDetails.description }} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Image
                style={{ maxWidth: "256px" }}
                src={snap.courseDetails.image}
                alt={snap.courseDetails.name}
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div>
        <Container sx={{ mt: 15 }} maxWidth="md">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12} sm={6}>
              <Card sx={{ mb: 5 }}>
                <CardHeader
                  title="Monthly Payment"
                  titleTypographyProps={{ align: "center", color: "#fafafa" }}
                  sx={{
                    height: "48px",
                    backgroundImage:
                      "linear-gradient(to right, #512da8, #c2185b)",
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
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      £
                    </Typography>
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      {snap.courseDetails.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /month
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    align="center"
                    variant="body1"
                    color="text.secondary"
                  >
                    Frequent Course Updates
                  </Typography>
                  <Typography
                    sx={{ mt: 2 }}
                    align="center"
                    variant="body1"
                    color="text.secondary"
                  >
                    Tutor Support
                  </Typography>
                  <Typography
                    sx={{ mt: 2 }}
                    align="center"
                    variant="body1"
                    color="text.secondary"
                  >
                    Career Guidance
                  </Typography>
                  <Typography
                    sx={{ mt: 2 }}
                    align="center"
                    variant="body1"
                    color="text.secondary"
                  >
                    Student Forum
                  </Typography>
                  <Typography
                    sx={{ mt: 2 }}
                    align="center"
                    variant="body1"
                    color="text.secondary"
                  >
                    Software Discounts
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt:1, mb: 1, justifyContent: 'center' }}>
                  <Button onClick={addToCart} variant="contained">
                    Add to Cart
                  </Button>
                  <Button onClick={decreaseQty}>
                    <ArrowDropDownIcon />
                  </Button>
                    Qty: {qty}
                  <Button onClick={increaseQty}>
                    <ArrowDropUpIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CourseDetails;
