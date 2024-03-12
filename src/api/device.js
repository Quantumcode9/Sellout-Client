import axios from 'axios';
import apiUrl from '../apiConfig'

export const getDevices = () => {
    return axios(`${apiUrl}/devices`)
}

export const getDevice = (id) => {
    return axios(`${apiUrl}/devices/${id}`)
}


export const createDevice = (user, newDevice) => {
    return axios({
        url: `${apiUrl}/device`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { device: newDevice }
    })
}

export const updateDevice = (user, updatedDevice) => {
    return axios({
        url: `${apiUrl}/devices/${updatedDevice._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { device: updatedDevice }
    })
}


