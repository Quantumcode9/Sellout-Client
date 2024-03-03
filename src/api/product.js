import axios from 'axios';
import apiUrl from '../apiConfig'

export const searchProducts = (keyword) => {
  return axios.get(`${apiUrl}/search/${keyword}`);
};

export const getProducts = () => {
  return axios.get(`${apiUrl}/products`);
}

export const getProduct = (id) => {
  return axios.get(`${apiUrl}/products/${id}`);
}



export const createProduct = (product) => {
  return axios.post(`${apiUrl}/products`, { product });
};
// Check if this is the correct route
export const updateProduct = (product) => {
  return axios.patch(`${apiUrl}/products/${product._id}`, { product });
}

export const getStreamingDevices = () => {
  return axios.get(`${apiUrl}/streaming/deals`);
};



export const getLaptops = () => {
  return axios.get(`${apiUrl}/laptops`);
};

export const getLaptopsDeals = () => {
  return axios.get(`${apiUrl}/laptop/deals`);
}

export const getTVDeals = () => {
  return axios.get(`${apiUrl}/tv/deals`);
};


