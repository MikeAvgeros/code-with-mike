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
import Reviews from "./components/Profile/Reviews";
import Orders from "./components/Profile/Orders";
import ReviewForm from "./components/Reviews/ReviewForm";
import EditReview from "./components/Reviews/EditReview";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import Contact from "./components/Contact/Contact";
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
  getCustomer,
  getWishlistItems,
} from "./components/Api/Api";
import "./App.css";

const App = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    getCategories();
    getCourses();
    getPromotions();
  }, []);

  useEffect(() => {
    getReviews();
  }, [snap.reviews.length]);

  useEffect(() => {
    if (!snap.cartId) {
      createCart();
    }
  }, [snap.cartId]);

  useEffect(() => {
    if (snap.token) {
      getCustomer(snap.token);
    }
  }, [snap.token]);

  useEffect(() => {
    if (snap.customer.wishlist) {
      getWishlistItems(snap.token, snap.customer.wishlist);
    }
  }, [snap.customer, snap.wishlistItems.length]);

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
              element={!snap.token ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!snap.token ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/reset/password" element={<ResetPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route
              path="/profile"
              element={snap.token ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/delete"
              element={snap.token ? <DeleteUser /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={snap.token ? <Orders /> : <Navigate to="/" />}
            />
            <Route
              path="/reviews"
              element={snap.token ? <Reviews /> : <Navigate to="/" />}
            />
            <Route
              path="/review/send/:id"
              element={snap.token ? <ReviewForm /> : <Navigate to="/" />}
            />
            <Route
              path="/review/edit/:id"
              element={snap.token ? <EditReview /> : <Navigate to="/" />}
            />
            <Route
              path="/wishlist"
              element={snap.token ? <Wishlist /> : <Navigate to="/" />}
            />
            <Route
              path="/checkout"
              element={snap.token ? <Checkout /> : <Navigate to="/" />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ScrollToTop>
        <Alerts />
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
