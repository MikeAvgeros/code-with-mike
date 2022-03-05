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
  userAuthenticated: false
});

subscribe(store, () => {
  sessionStorage.setItem("courses", JSON.stringify(store.courses));
  sessionStorage.setItem("course-details", JSON.stringify(store.courseDetails));
  sessionStorage.setItem("categories", JSON.stringify(store.categories));
  sessionStorage.setItem("reviews", JSON.stringify(store.reviews));
  sessionStorage.setItem("promotions", JSON.stringify(store.promotions));
});

export default store;