import React, {useState} from 'react'
import { createSoundbar } from '../../api/soundbar';
import SoundbarForm from '../shared/SoundbarForm';
import messages from '../shared/AutoDismissAlert/messages'

const SoundbarCreate = (props) => {
    const [soundbar, setSoundbar] = useState({
        brand: '',
        modelNumber: '',
        price: '',
        image: '',
        image2: '',
        channels: '',
        rating: '',
        sku: '',
        dolbyAtmos: false
    })

    const handleChange = (event) => {
        setSoundbar({ ...soundbar, [event.target.name]: event.target.value })
    }

    const handleCheckboxChange = (event) => {
        setSoundbar({ ...soundbar, [event.target.name]: event.target.checked })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createSoundbar(props.user, soundbar)
            .then(() => {
                setSoundbar({
                    brand: '',
                    modelNumber: '',
                    price: '',
                    image: '',
                    image2: '',
                    channels: '',
                    rating: '',
                    sku: '',
                    dolbyAtmos: false
                })


                props.msgAlert({
                    heading: 'Soundbar Created',
                    message: messages.createSoundbarSuccess,
                    variant: 'success'
                })
            })
            .catch((error) => {
                props.msgAlert({
                    heading: 'Soundbar Creation Failed',
                    message: messages.createSoundbarFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <SoundbarForm
            soundbar={soundbar}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            heading='Add Soundbar'
        />
    )
}

export default SoundbarCreate


