import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import CourseDetails from "./components/Courses/CourseDetails";
import Categories from "./components/Categories/Categories";
import CategoryDetails from "./components/Categories/CategoryDetails";
import Cart from "./components/Cart/Cart";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import Contact from "./components/Contact/Contact";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";
import Footer from "./components/Footer/Footer";
import Box from "@mui/material/Box";
import api from "./components/Api/Api";
import store from "./components/Store/Store";
import { useSnapshot } from "valtio";

const App = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    if (snap.courses.length === 0) {
      getCourses();
    }
    if (snap.categories.length === 0) {
      getCategories();
    }
    if (snap.reviews.length === 0) {
      getReviews();
    }
    if (snap.courses.length === 0) {
      getPromotions();
    }
    if (!localStorage.getItem("cart")) {
      createCart();
    }
    if (localStorage.getItem("cart")) {
      getCart();
    }
    if (localStorage.getItem("token")) {
      store.userAuthenticated = true;
      if (snap.user.length === 0) {
        getUser();
      }
    }
  }, []);

  const getCourses = async () => {
    if (sessionStorage.getItem("courses")) {
      store.courses = JSON.parse(sessionStorage.getItem("courses"));
    } else {
      try {
        const { data } = await api.get("store/products");
        store.courses = data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCategories = async () => {
    if (sessionStorage.getItem("categories")) {
      store.categories = JSON.parse(sessionStorage.getItem("categories"));
    } else {
      try {
        const { data } = await api.get("store/categories");
        store.categories = data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getReviews = async () => {
    if (sessionStorage.getItem("reviews")) {
      store.reviews = JSON.parse(sessionStorage.getItem("reviews"));
    } else {
      try {
        const { data } = await api.get("store/reviews");
        store.reviews = data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getPromotions = async () => {
    if (sessionStorage.getItem("promotions")) {
      store.promotions = JSON.parse(sessionStorage.getItem("promotions"));
    } else {
      try {
        const { data } = await api.get("store/promotions");
        store.promotions = data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const createCart = async () => {
    try {
      const { data } = await api.post("order/carts/");
      localStorage.setItem("cart", data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const getCart = async () => {
    const cartId = localStorage.getItem("cart");
    try {
      const { data } = await api.get(`order/carts/${cartId}/`);
      store.cart = data.items;
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
    try {
      const { data } = await api.get("auth/users/me", config);
      store.user = data;
      if (!localStorage.getItem("wishlist")) {
        createWishList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createWishList = async () => {
    const user = snap.user.id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ user });
    try {
      const { data } = await api.post("order/wishlist/", body, config);
      localStorage.setItem("wishlist", data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
