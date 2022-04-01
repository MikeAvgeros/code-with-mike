import { proxy, subscribe } from "valtio";

const storedState = localStorage.getItem("storedState");

const initialState = storedState
  ? JSON.parse(storedState)
  : {
      courses: [],
      courseDetails: null,
      categories: [],
      categoryDetails: null,
      reviews: [],
      promotions: [],
      promotionDetails: [],
      cartId: null,
      cartItems: [],
      wishlistItems: [],
      orders: [],
      currentOrder: {
        id: null,
        amount: 0
      },
      customer: [],
      token: null,
      userAuthenticated: false,
      canSignup: true,
      clientSecret: null,
      errorResponses: [],
      successResponse: null,
    };

const store = proxy(initialState);

subscribe(store, () => {
  localStorage.setItem("storedState", JSON.stringify(store));
});

export default store;
