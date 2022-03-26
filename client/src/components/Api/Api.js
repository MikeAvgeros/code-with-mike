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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const getCourseDetails = async (slug) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get(`store/products/${slug}/`, config);
    store.courseDetails = data;
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const getCategoryDetails = async (slug) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get(`store/categories/${slug}/`, config);
    store.categoryDetails = data;
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const getPromotionDetails = async (slug) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await api.get(`store/promotions/${slug}/`, config);
    store.promotionDetails = data;
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const createReview = async (
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
    const { status } = await api.post("store/reviews/", body, config);
    if (status === 201) {
      window.location.assign("https://codewithmike.herokuapp.com/");
      store.successResponse = "Thank you for your review.";
      getReviews();
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    const { status } = await api.patch(
      `store/reviews/${reviewId}/`,
      body,
      config
    );
    if (status === 200) {
      getReviews();
      window.location.assign("https://codewithmike.herokuapp.com/");
      store.successResponse = "You have successfully updated your review.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const deleteReview = async (token, reviewId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    await api.delete(`store/reviews/${reviewId}/`, config);
    getReviews();
    store.successResponse = "Review was successfully deleted.";
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    store.cartItems = data.items.sort((a, b) => {
      return a.id - b.id;
    });
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const addItemToCart = async (itemId, qty, cartId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    item_id: itemId,
    quantity: qty,
  });
  try {
    const { status } = await api.post(
      `order/carts/${cartId}/items/`,
      body,
      config
    );
    if (status === 201) {
      getCartItems(cartId);
      store.successResponse = "Course successfully added to the cart.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const updateCartItem = async (qty, cartId, itemId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    quantity: qty,
  });
  try {
    await api.patch(`order/carts/${cartId}/items/${itemId}/`, body, config);
    getCartItems(cartId);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const deleteItemFromCart = async (cartId, itemId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await api.delete(`order/carts/${cartId}/items/${itemId}/`, config);
    getCartItems(cartId);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const getWishlistItems = async (token, wishlistId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await api.get(`order/wishlist/${wishlistId}/`, config);
    store.wishlistItems = data.items.sort((a, b) => {
      return a.id - b.id;
    });
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const addItemToWishlist = async (token, wishlistId, courseId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({ item_id: courseId });
  try {
    const { status } = await api.post(
      `order/wishlist/${wishlistId}/items/`,
      body,
      config
    );
    if (status === 201) {
      getWishlistItems(token, wishlistId);
      store.successResponse = "Course successfully added to the wishlist.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const deleteItemFromWishlist = async (
  token,
  wishlistId,
  wishlistItemId
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    await api.delete(
      `order/wishlist/${wishlistId}/items/${wishlistItemId}/`,
      config
    );
    getWishlistItems(token, wishlistId);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    const { status } = await api.post("auth/users/", body, config);
    if (status === 201) {
      window.location.assign("https://codewithmike.herokuapp.com/login/");
      store.successResponse = "You have successfully signed up. Please log in.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
      store.successResponse = "You have successfully logged in.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    store.successResponse = "Your profile was successfully updated.";
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const deleteUser = async (token, current_password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({ current_password });
  try {
    const { status } = await api.delete("auth/users/me/", body, config);
    if (status === 204) {
      window.location.assign("https://codewithmike.herokuapp.com/");
      store.successResponse = "Your account was successfully deleted.";
      store.customer = [];
      store.token = null;
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    const { status } = await api.post(
      "auth/users/reset_password/",
      body,
      config
    );
    if (status === 204) {
      store.successResponse =
        "We have sent a password reset link to your email.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    const { status } = await api.post(
      "auth/users/reset_password_confirm/",
      body,
      config
    );
    if (status === 204) {
      window.location.assign("https://codewithmike.herokuapp.com/login/");
      store.successResponse = "You can now log in with your new password.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const sendEmail = async (email, name, message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    name,
    message,
  });
  try {
    const { status } = await api.post("contact/email", body, config);
    if (status === 200) {
      window.location.assign("https://codewithmike.herokuapp.com/");
      store.successResponse =
        "Thank you for getting in touch. We'll respond as soon as possible.";
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const updateOrder = async (token, body, orderId, redirect) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    await api.patch(`order/checkout/${orderId}/`, body, config);
    if (redirect) {
      window.location.assign("https://codewithmike.herokuapp.com/orders/");
      store.orderId = null;
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const createPaymentIntent = async (token, amount) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await api.post(
      "payment/stripe",
      { amount: amount },
      config
    );
    store.clientSecret = data.clientSecret;
  } catch (error) {
    store.errorResponses = Array.from(error);
  }
};

export const checkout = async (token, cartId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({ cart_id: cartId });
  try {
    const { data } = await api.post("order/checkout/", body, config);
    store.orderId = data.id;
    store.successResponse = "Order submitted successfully.";
    let prices = [];
    data.items.forEach((item) => prices.push(item.total_price));
    const totalAmount = prices.reduce((a, b) => a + b, 0);
    createPaymentIntent(token, totalAmount);
    store.cartId = null;
    store.cartItems = [];
    getOrders(token);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${key}: ${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};
