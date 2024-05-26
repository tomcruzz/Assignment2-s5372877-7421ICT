const API_BASE_URL = 'https://your-api-endpoint.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error('API request failed');
    error.data = errorData;
    throw error;
  }
  return response.json();
};

export const fetchOrdersFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  return handleResponse(response);
};

export const fetchCategoriesFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return handleResponse(response);
};

export const fetchProductsFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return handleResponse(response);
};

export const fetchProductDetailsFromAPI = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  return handleResponse(response);
};

export const fetchCartItemsFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  return handleResponse(response);
};

export const fetchUserProfileFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`);
  return handleResponse(response);
};

export const signInUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const signUpUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};
