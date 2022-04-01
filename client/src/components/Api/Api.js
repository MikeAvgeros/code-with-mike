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
    if (data.length > 0) {
      store.courses = data;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to fetch the courses.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data) {
      store.courseDetails = data;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to fetch the details.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data.length > 0) {
      store.categories = data;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to fetch the categories.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data) {
      store.categoryDetails = data;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to fetch the details.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      errorArray.push(`${error.response.data[key]}`);
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
    if (data) {
      store.promotionDetails = data;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to fetch the details.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      errorArray.push(`${error.response.data[key]}`);
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
      getReviews();
      store.successResponse = "Thank you for your review.";
    } else {
      store.errorResponses = [
        "Something went wrong when trying to save the review.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      store.successResponse = "You have successfully updated your review.";
    } else {
      store.errorResponses = [
        "Something went wrong when trying to update the review.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    const { status } = await api.delete(`store/reviews/${reviewId}/`, config);
    if (status === 204) {
      getReviews();
      store.successResponse = "Review was successfully deleted.";
    } else {
      store.errorResponses = [
        "Something went wrong when trying to delete the review.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data) {
      store.cartId = data.id;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to create the cart.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data.items) {
      store.cartItems = data.items.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      store.errorResponses = [
        "Something went wrong when trying to get the cart items.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    } else {
      store.errorResponses = [
        "Something went wrong when trying to add course to the cart.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    const { status } = await api.patch(
      `order/carts/${cartId}/items/${itemId}/`,
      body,
      config
    );
    if (status === 200) {
      getCartItems(cartId);
    } else {
      store.errorResponses = [
        "Something went wrong when trying to update the quantity.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    const { status } = await api.delete(
      `order/carts/${cartId}/items/${itemId}/`,
      config
    );
    if (status === 204) {
      getCartItems(cartId);
    } else {
      store.errorResponses = [
        "Something went wrong when trying to delete the course from the cart.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (data.items) {
      store.wishlistItems = data.items.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      store.errorResponses = [
        "Something went wrong when trying to get the wishlist items.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    } else {
      store.errorResponses = [
        "Something went wrong when trying to add course to the wishlist.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    const { status } = await api.delete(
      `order/wishlist/${wishlistId}/items/${wishlistItemId}/`,
      config
    );
    if (status === 204) {
      getWishlistItems(token, wishlistId);
    } else {
      store.errorResponses = [
        "Something went wrong when trying to delete course from the wishlist.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    if (Object.keys(data).length > 0) {
      store.customer = data;
      store.userAuthenticated = true;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to get your profile details.",
      ];
      store.token = null;
      store.customer = [];
      store.userAuthenticated = false;
    }
  } catch (error) {
    store.token = null;
    store.customer = [];
    store.userAuthenticated = false;
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      store.successResponse = "You have successfully signed up. Please log in.";
      window.location.assign("https://codewithmike.herokuapp.com/login");
    } else {
      store.errorResponses = ["Something went wrong when trying to sign up."];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      store.successResponse = "You have successfully logged in.";
    } else {
      store.errorResponses = ["Something went wrong went trying to login."];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const logout = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { status } = await api.post("auth/token/logout/", token, config);
    if (status === 204) {
      store.token = null;
      store.customer = [];
      store.userAuthenticated = false;
      store.successResponse = "You have successfully logged out.";
    } else {
      store.errorResponses = ["Something went wrong went trying to logout."];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      errorArray.push(`${error.response.data[key]}`);
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
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const deleteUser = async (token, current_password) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      current_password
    }
  };
  try {
    const { status } = await api.delete("auth/users/me/", config);
    if (status === 204) {
      store.successResponse = "Your account was successfully deleted.";
      store.customer = [];
      store.token = null;
      store.userAuthenticated = false;
    } else {
      store.errorResponses = [
        "Something went wrong when trying to delete your account.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
    } else {
      store.errorResponses = [
        "Something went wrong when trying to reset your password.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      store.successResponse = "You can now log in with your new password.";
    } else {
      store.errorResponses = [
        "Something went wrong when trying to reset your password.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const sendContactEmail = async (email, name, message) => {
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
    const { status } = await api.post("email/contact", body, config);
    if (status === 200) {
      store.successResponse =
        "Thank you for getting in touch. We'll respond as soon as possible.";
        window.location.assign("https://codewithmike.herokuapp.com/");
    } else {
      store.errorResponses = [
        "Something went wrong when trying to email the contact form.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const sendReceipt = async (email, message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    message,
  });
  try {
    await api.post("email/receipt", body, config);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
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
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const updateOrder = async (token, body, orderId, paid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { status } = await api.patch(
      `order/checkout/${orderId}/`,
      body,
      config
    );
    if (status === 200) {
      if (paid) {
        store.currentOrder.id = null;
        store.currentOrder.amount = 0;
        window.location.assign("https://codewithmike.herokuapp.com/orders");
      }
    } else {
      if (paid) {
        store.errorResponses = [
          "Something went wrong when trying to update the payment status of the order.",
        ];
      }
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};

export const createPaymentIntent = async (token, amount, orderId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  const body = JSON.stringify({ amount });
  try {
    const { data } = await api.post("payment/stripe", body, config);
    if (data.clientSecret) {
      store.clientSecret = data.clientSecret;
      const clientSecretBody = JSON.stringify({
        client_secret: data.clientSecret,
      });
      updateOrder(token, clientSecretBody, orderId, false);
    } else {
      store.errorResponses = [
        "Something went wrong when trying to access Stripe for the payment.",
      ];
    }
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
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
    store.currentOrder.id = data.id;
    store.successResponse = "Order submitted successfully.";
    store.cartItems = [];
    store.cartId = null;
    let prices = [];
    data.items.forEach((item) => prices.push(item.total_price));
    data.items.forEach((item) => prices.push(item.vat));
    const totalAmount = prices.reduce((a, b) => a + b, 0);
    store.currentOrder.amount = totalAmount.toFixed(2);
    const integerAmount = parseInt(totalAmount * 100);
    createPaymentIntent(token, integerAmount, data.id);
  } catch (error) {
    let errorArray = [];
    for (const key in error.response.data) {
      errorArray.push(`${error.response.data[key]}`);
    }
    store.errorResponses = errorArray;
  }
};
