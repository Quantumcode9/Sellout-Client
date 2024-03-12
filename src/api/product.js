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




//post product review
export const createProductReview = (productId, user, newReview) => {
  return axios({
    url: `${apiUrl}/products/${productId}/reviews`,
    method: 'POST',
      headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { 
      review: {
        ...newReview,
        user: user._id, 
        name: user.name 
      } 
    }
  });
};

//delete product review
export const deleteProductReview = (productId, reviewId, user) => {
  return axios({
    url: `${apiUrl}/products/${productId}/reviews/${reviewId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
};


// update product review
export const updateProductReview = (productId, user, updatedReview) => {
  return axios({
    url: `${apiUrl}/products/${productId}/reviews/${updatedReview._id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { 
      review: {
        ...updatedReview,
        user: user._id, 
        name: user.name 
      } 
    }
  });
};





