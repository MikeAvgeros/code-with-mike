import { proxy, subscribe } from "valtio";

const storedState = localStorage.getItem("storedState");

const initialState = storedState
  ? JSON.parse(storedState)
  : {
      courses: [],
      courseDetails: [],
      categories: [],
      categoryDetails: [],
      reviews: [],
      promotions: [],
      promotionDetails: [],
      cartId: null,
      cartItems: [],
      wishlistItems: [],
      orders: [],
      customer: [],
      token: null,
      userAuthenticated: false,
      errorResponses: [],
      successResponse: null,
    };

const store = proxy(initialState);

subscribe(store, () => {
  localStorage.setItem("storedState", JSON.stringify(store));
});

export default store;
