import axios from 'axios';
import apiUrl from '../apiConfig'

export const searchProducts = (keyword) => {
  return axios.get(`${apiUrl}/search/${keyword}`);
};

export const getProduct = (id) => {
  return axios.get(`${apiUrl}/products/${id}`);
};

export const createProduct = (product) => {
  return axios.post(`${apiUrl}/products`, { product });
};


export const getLaptops = () => {
  return axios.get(`${apiUrl}/laptops`);
};

