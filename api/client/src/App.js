import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
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
    if (localStorage.getItem("token")) {
      store.userAuthenticated = true;
      if (snap.user.length === 0) {
        getUser();
      }
    }
  }, []);

  const getCourses = async () => {
    try {
      const { data } = await api.get("store/products");
      store.courses = data.results;
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await api.get("store/categories");
      store.categories = data.results;
    } catch (err) {
      console.log(err);
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await api.get("store/reviews");
      store.reviews = data.results;
    } catch (err) {
      console.log(err);
    }
  };

  const getPromotions = async () => {
    try {
      const { data } = await api.get("store/promotions");
      store.promotions = data.results;
    } catch (err) {
      console.log(err);
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

  const getUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
    try {
      const { data } = await api.get("auth/users/me", config);
      localStorage.setItem("user", data.id);
      store.user = data;
      if (!localStorage.getItem("wishlist")) {
        createWishList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createWishList = async () => {
    const user = localStorage.getItem("user");
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
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
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
