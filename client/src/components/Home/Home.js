import React from "react";
import Landing from "../Landing/Landing";
import About from "../About/About";
import Reviews from "../Reviews/Reviews";
import FeaturedCourses from "../Courses/FeaturedCourses";
import { useSnapshot } from "valtio";
import store from "../Store/Store";

const Home = () => {
  const snap = useSnapshot(store); 
  const featuredCourses = snap.courses.filter(p => p.is_featured === true);
  const featuredReviews = snap.reviews.filter(p => p.rating === 5);

  return (
    <React.Fragment>
      <div className="landing">
        <Landing />
      </div>
      <div className="about">
        <About />
      </div>
      <div className="featured-reviews">
        <Reviews reviews={featuredReviews} />
      </div>
      <div className="featured-courses">
        <FeaturedCourses courses={featuredCourses} />
      </div>
    </React.Fragment>
  );
};

export default Home;
