import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import store from "./components/Store/Store";
import { useSnapshot } from "valtio";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import CourseDetails from "./components/Courses/CourseDetails";
import Categories from "./components/Categories/Categories";
import CategoryDetails from "./components/Categories/CategoryDetails";
import PromotionDetails from "./components/Promotions/PromotionDetails";
import Cart from "./components/Cart/Cart";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPassword/ResetPasswordConfirm";
import Profile from "./components/Profile/Profile";
import DeleteUser from "./components/Profile/DeleteUser";
import Orders from "./components/Profile/Orders";
import ReviewForm from "./components/Reviews/ReviewForm";
import EditReview from "./components/Reviews/EditReview";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import Contact from "./components/Contact/Contact";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";
import Alerts from "./components/Alerts/Alerts";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Box from "@mui/material/Box";
import {
  getCourses,
  getCategories,
  getReviews,
  getPromotions,
  createCart,
  getCartItems,
  getCustomer,
  getWishlistItems,
} from "./components/Api/Api";
import "./App.css";
import Reviews from "./components/Profile/Reviews";

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
        getWishlistItems(snap.token, snap.customer.wishlist);
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
        <ScrollToTop>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryDetails />} />
            <Route
              path="/promotion/:id"
              element={
                snap.promotions ? <PromotionDetails /> : <Navigate to="/" />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/signup"
              element={!snap.token ? <Signup /> : <Navigate to="/profile" />}
            />
            <Route
              path="/login"
              element={!snap.token ? <Login /> : <Navigate to="/profile" />}
            />
            <Route path="/reset/password" element={<ResetPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route
              path="/profile"
              element={snap.token ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/delete"
              element={snap.token ? <DeleteUser /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={snap.token ? <Orders /> : <Navigate to="/login" />}
            />
            <Route
              path="/reviews"
              element={snap.token ? <Reviews /> : <Navigate to="/login" />}
            />
            <Route
              path="/review/send/:id"
              element={snap.token ? <ReviewForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/review/edit/:id"
              element={snap.token ? <EditReview /> : <Navigate to="/login" />}
            />
            <Route
              path="/wishlist"
              element={snap.token ? <Wishlist /> : <Navigate to="/login" />}
            />
            <Route
              path="/checkout"
              element={
                snap.cartItems.length > 0 && snap.token ? (
                  <Checkout />
                ) : (
                  <Navigate to="/cart" />
                )
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </ScrollToTop>
        <Alerts />
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
