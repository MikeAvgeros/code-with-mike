import { proxy } from "valtio";

const store = proxy({
  courses: [],
  categories: [],
  reviews: [],
  promotions: [],
  cart: [],
  wishlist: [],
  userAuthenticated: false
});

export default store;