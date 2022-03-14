import axios from "axios";
import store from "../Store/Store";

export const api = axios.create({
  baseURL: "https://codewithmike.herokuapp.com/api/",
});

export const getCourses = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get("store/products/", config);
    store.courses = data;
  } catch (err) {
    alert(`An error occured while trying to get the courses.\n\r${err}`);
  }
};

export const getCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get("store/categories/", config);
    store.categories = data;
  } catch (err) {
    alert(`An error occured while trying to get the categories.\n\r${err}`);
  }
};

export const getReviews = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get("store/reviews/", config);
    store.reviews = data;
  } catch (err) {
    alert(`An error occured while trying to get the reviews.\n\r${err}`);
  }
};

export const getPromotions = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get("store/promotions/", config);
    store.promotions = data;
  } catch (err) {
    alert(`An error occured while trying to get the promotions.\n\r${err}`);
  }
};

export const createCart = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.post("order/carts/", config);
    store.cartId = data.id;
  } catch (err) {
    alert(`An error occured while trying to create a cart.\n\r${err}`);
  }
};

export const getCartItems = async (cartId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get(`order/carts/${cartId}/`, config);
    store.cartItems = data.items;
  } catch (err) {
    alert(`An error occured while trying to get the cart items.\n\r${err}`);
  }
};

export const getCustomer = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await api.get("profile/customers/me/", config);
    store.customer = data;
  } catch (err) {
    alert(`An error occured while trying to get the user's data.\n\r${err}`);
  }
};

export const getWishListItems = async (token, wishlistId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await api.get(`order/wishlist/${wishlistId}/`, config);
    store.wishlistItems = data.items;
  } catch (err) {
    alert(`An error occured while trying to get the wishlist items.\n\r${err}`);
  }
};

export const signup = async (email, username, password, re_password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, username, password, re_password });
  try {
    const { data } = await api.post("auth/users/", body, config);
    if (data.username === username) {
      alert("Account created. Please login.");
    }
  } catch (err) {
    alert(`An error occured while trying to sign up.\n\r${err}`);
  }
};

export const login = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const { data } = await api.post("auth/token/login/", body, config);
    if (data.auth_token) {
      store.token = data.auth_token;
    }
  } catch (err) {
    alert(`An error occured while trying to login.\n\r${err}`);
  }
};

export const updateProfile = async (
  token,
  first_name,
  last_name,
  phone,
  country,
  birth_date
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({
    first_name,
    last_name,
    phone,
    country,
    birth_date,
  });
  try {
    await api.post("auth/users/", body, config);
  } catch (err) {
    alert(`An error occured while trying to update your profile.\n\r${err}`);
  }
};

export const getOrders = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await api.get("order/checkout/", config);
    store.orders = data;
  } catch (err) {
    alert(`An error occured while trying to get the wishlist items.\n\r${err}`);
  }
};

export const resetPassword = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    await api.post("auth/users/reset_password/", body, config);
  } catch (err) {
    alert(`An error occured while trying to reset the password.\n\r${err}`);
  }
};
