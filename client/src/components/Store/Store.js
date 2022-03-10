import { proxy, subscribe } from "valtio";

const store = proxy({
  courses: [],
  courseDetails: {},
  categories: [],
  categoryDetails: {},
  reviews: [],
  promotions: [],
  cart: [],
  wishlist: [],
  user: [],
  orders: [],
  userAuthenticated: false
});

subscribe(store, () => {
  sessionStorage.setItem("courses", JSON.stringify(store.courses));
  sessionStorage.setItem("course-details", JSON.stringify(store.courseDetails));
  sessionStorage.setItem("categories", JSON.stringify(store.categories));
  sessionStorage.setItem("category-details", JSON.stringify(store.categoryDetails));
  sessionStorage.setItem("reviews", JSON.stringify(store.reviews));
  sessionStorage.setItem("promotions", JSON.stringify(store.promotions));
  sessionStorage.setItem("user", JSON.stringify(store.user));
  sessionStorage.setItem("cart-items", JSON.stringify(store.cart));
  sessionStorage.setItem("wishlist-items", JSON.stringify(store.wishlist));
});

export default store;