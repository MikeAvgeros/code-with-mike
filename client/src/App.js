import { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Orders from "./components/Profile/Orders";
import ReviewForm from "./components/Reviews/ReviewForm";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import Contact from "./components/Contact/Contact";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";
import Footer from "./components/Footer/Footer";
import Box from "@mui/material/Box";
import {
  getCourses,
  getCategories,
  getReviews,
  getPromotions,
  createCart,
  getCartItems,
  getCustomer,
  getWishListItems,
} from "./components/Api/Api";
import store from "./components/Store/Store";
import { useSnapshot } from "valtio";
import "./App.css";

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
    if (snap.promotions.length === 0) {
      getPromotions();
    }
  }, [
    snap.courses.length,
    snap.categories.length,
    snap.reviews.length,
    snap.promotions.length,
  ]);

  useEffect(() => {
    if (!snap.cartId) {
      createCart();
    }
    if (snap.cartId && snap.cartItems.length === 0) {
      getCartItems(snap.cartId);
    }
  }, [snap.cartId, snap.cartItems, snap.cartItems.length]);

  useEffect(() => {
    if (snap.token) {
      store.userAuthenticated = true;
      if (snap.customer.length === 0) {
        getCustomer(snap.token);
      }
      if (snap.customer.wishlist && snap.wishlistItems.length === 0) {
        getWishListItems(snap.token, snap.customer.wishlist);
      }
    }
  }, [snap.token, snap.customer, snap.wishlistItems.length]);

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
          <Route
            path="/login"
            element={!snap.token ? <Login /> : <Navigate to="/profile" />}
          />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={snap.token ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={snap.token ? <Orders /> : <Navigate to="/" />}
          />
          <Route
            path="/send_review/:id"
            element={snap.token ? <ReviewForm /> : <Navigate to="/" />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/checkout"
            element={
              snap.cartItems.length > 0 || snap.orders.length > 0 ? (
                <Checkout />
              ) : (
                <Navigate to="/" />
              )
            }
          />
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
