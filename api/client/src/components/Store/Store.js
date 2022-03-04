import { proxy } from "valtio";

const store = proxy({
  courses: [],
  categories: [],
  reviews: [],
  promotions: [],
  cart: [],
  wishlist: [],
  user: [],
  userAuthenticated: false
});

export default store;