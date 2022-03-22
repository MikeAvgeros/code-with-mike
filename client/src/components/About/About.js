import React from "react";
import { Container, Grid } from "@mui/material";
import { Image } from "mui-image";
import coding from "../../images/coding.png";
import messages from "../../images/messages.png";

const About = () => {
  return (
    <Container sx={{ mt: "5vh" }}>
      <h2 style={{ textAlign: "center" }}>I love to teach you coding!</h2>
      <Grid container sx={{ mt: "1vh" }} alignItems="center" spacing={5}>
        <Grid item xs={12} md={6}>
          <p>
            My name is Mike and my team and I would love to teach you coding.
            Our mission is to help novice and professional software engineers
            increase their skills, make more money, and ultimately change their
            lives for the better. Our team of expert software developers have
            been teaching thousands of students for many years. Our students now
            work for big companies such as Facebook, Google, Microsoft and
            Amazon to name a few. Our courses offer students the skills and
            support to advance their careers quickly. We combine high-quality
            content, frequent updates to stay up to date with trends in
            technology, and most importantly one-to-one support to help you
            really understand the content and facilitate success.
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image sx={{ maxWidth: "320px" }} src={coding} />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: "1vh", mb: "5vh" }}
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12} md={6}>
          <Image
            sx={{ maxWidth: "350px", display: { xs: "none", md: "grid" } }}
            src={messages}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <p>
            All courses are simple to follow and beginner friendly. They break
            down complex topics into simple, digestible lessons that anyone can
            understand. Once students have fully grasped the fundamentals, we
            also cover advanced software engineering concepts for frontend,
            backend and mobile development. The way the content works is every
            course is split up into 3 difficulty levels, with a real-world
            project to submit upon completion. Upon successful completion of
            each level, students are awarded with a certificate of completion.
            The content is constantly being updated to reflect new trends in
            technology and best practices. Students can access courses on a
            monthly basis and can freeze and resume their membership as they
            deem necessary. We strive to add new courses frequently for every
            new cool framework or language.
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image
            sx={{ maxWidth: "350px", display: { md: "none" } }}
            src={messages}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
