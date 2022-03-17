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
      window.location.assign("https://codewithmike.herokuapp.com/login");
      alert("You have successfully signed up. Please login");
    } else {
      alert(
        "An error occured while trying to get your user details. Please try again."
      );
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
      window.location.assign("https://codewithmike.herokuapp.com/");
    }
  } catch (err) {
    alert(`An error occured while trying to login.\n\r${err}`);
  }
};

const updatePhoto = async (token, image) => {
  let formData = new FormData();
  formData.append("image", image);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  };
  try {
    await api.patch("profile/customers/me/", formData, config);
    getCustomer(token);
  } catch (err) {
    alert(`An error occured while trying to update the image.\n\r${err}`);
  }
};

export const updateProfile = async (
  token,
  first_name,
  last_name,
  phone,
  birth_date,
  country,
  image,
  customer_type
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
    birth_date,
    country,
    customer_type,
  });
  try {
    await api.patch("profile/customers/me/", body, config);
    getCustomer(token);
    if (image) {
      updatePhoto(token, image);
    }
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
    window.location.assign("https://codewithmike.herokuapp.com/");
    alert("We have sent a password reset link to your email.")
  } catch (err) {
    alert(`An error occured while trying to reset the password.\n\r${err}`);
  }
};

export const resetPasswordConfirmation = async (
  uid,
  token,
  new_password,
  re_new_password
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token, new_password, re_new_password });
  try {
    await api.post("auth/users/reset_password_confirm/", body, config);
    window.location.assign("https://codewithmike.herokuapp.com/login");
    alert("You can now log in with your new password.")
  } catch (err) {
    alert(`An error occured while trying to reset the password.\n\r${err}`);
  }
};

export const sendReview = async (
  token,
  name,
  description,
  rating,
  product,
  customer
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({
    name,
    description,
    rating,
    product,
    customer,
  });
  try {
    await api.post("store/reviews/", body, config);
    window.location.assign("https://codewithmike.herokuapp.com/");
    alert("Thank you for your review.");
    getReviews();
  } catch (err) {
    alert(`An error occured while trying to send a review.\n\r${err}`);
  }
};

export const updateReview = async (
  token,
  name,
  description,
  rating,
  reviewId
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({
    name,
    description,
    rating,
  });
  try {
    await api.patch(`store/reviews/${reviewId}/`, body, config);
    window.location.assign("https://codewithmike.herokuapp.com/");
    alert("Thank you for updating your review.");
    getReviews();
  } catch (err) {
    alert(`An error occured while trying to update your review.\n\r${err}`);
  }
};
