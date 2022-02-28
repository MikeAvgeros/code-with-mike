import React, { useEffect, useState } from "react";
import api from "../Api/Api";
import Landing from "../Landing/Landing";
import About from "../About/About";
import Reviews from "../Reviews/Reviews";
import FeaturedCourses from "../Courses/FeaturedCourses";
import "./Home.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getFeaturedCourses = async () => {
    const { data } = await api.get("store/products");
    const featured = data.results.filter((p) => p.is_featured === true);
    setCourses(featured);
  };

  const getFeaturedReviews = async () => {
    const { data } = await api.get("store/reviews");
    const featured_reviews = data.results.filter((p) => p.on_site === true);
    setReviews(featured_reviews);
  };

  useEffect(() => {
    getFeaturedCourses();
    getFeaturedReviews();
  }, []);

  return (
    <>
      <div className="landing">
        <Landing />
      </div>
      <div className="about">
        <About />
      </div>
      <div className="reviews">
        <Reviews reviews={reviews} />
      </div>
      <div className="courses">
        <FeaturedCourses courses={courses} />
      </div>
    </>
  );
};

export default Home;
