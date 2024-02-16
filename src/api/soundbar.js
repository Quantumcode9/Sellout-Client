import apiUrl from '../apiConfig'
import axios from 'axios'





// export const createTV = (user, newTV) => {
//     return axios({
//         url: `${apiUrl}/tvs`,
//         method: 'POST',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { tv: newTV }
//     })
// }


export const createSoundbar = (user, newSoundbar) => {
    return axios({
        url: `${apiUrl}/soundbars`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { soundbar: newSoundbar }
    })
}


// Create soundbar

// POST	/soundbars/:tvId	
// export const createSoundbar = (tv, newSoundbar) => {
//     return axios({
//         url: `${apiUrl}/soundbars/${tv._id}`,
//         method: 'POST',
//         data: { soundbar: newSoundbar }
//     })
// }

// READ -> Get all soundbars
export const getSoundbars = () => {
    return axios({
        url: `${apiUrl}/soundbars`,
        method: 'GET'
    })
}

// READ -> Get a soundbar
export const getSoundbar = (id) => {
    return axios({
        url: `${apiUrl}/soundbars/${id}`,
        method: 'GET'
    })
}

// UPDATE -> Adjust a soundbar
export const updateSoundbar = (user, updatedSoundbar) => {
    return axios({
        url: `${apiUrl}/soundbars/${updatedSoundbar._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { soundbar: updatedSoundbar }
    })
}

// DELETE

export const removeSoundbar = (user, id) => {
    return axios({
        url: `${apiUrl}/soundbars/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
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

// DELETE 
export const removeTV = (user, id) => {
    return axios({
        url: `${apiUrl}/tvs/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}


