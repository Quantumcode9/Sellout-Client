import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllTVs = () => {
    return axios(`${apiUrl}/tvs`)
}

// READ -> Show
export const getOneTV = (id) => {
    return axios(`${apiUrl}/tvs/${id}`)
}

// CREATE -> Add a tv

export const createTV = (user, newTV) => {
    return axios({
        url: `${apiUrl}/tvs`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { tv: newTV }
    })
}

// UPDATE -> Adjust a tv
export const updateTV = (user, updatedTV) => {
    return axios({
        url: `${apiUrl}/tvs/${updatedTV._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { tv: updatedTV }
    })
}

// DELETE -> Set a tv free
export const removeTV = (user, id) => {
    return axios({
        url: `${apiUrl}/tvs/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// POST request to add a soundbar to a tv

export const addSoundbar = (tvId, user, newSoundbar) => {
    return axios({
        url: `${apiUrl}/soundbars/${tvId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { soundbar: newSoundbar }
    })
}
// REVIEWS
// POST REVIEW
export const createReview = (tvId, user, newReview) => {
    return axios({
      url: `${apiUrl}/tvs/${tvId}/reviews`,
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

  // UPDATE REVIEW not working
    export const updateReview = (tvId, user, updatedReview) => {
        return axios({
        url: `${apiUrl}/tvs/${tvId}/reviews/${updatedReview._id}`,
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


      export const deleteReview = (tvId, reviewId, user) => {
        return axios({
          url: `${apiUrl}/tvs/${tvId}/reviews/${reviewId}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
      };