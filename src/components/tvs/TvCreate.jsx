import { useState } from 'react'
import TVForm from '../shared/TVForm'
import { useNavigate } from 'react-router-dom'
import { createTV } from '../../api/tv'
import messages  from '../shared/AutoDismissAlert/messages'

const TVCreate = (props) => {
    // pull out  props
    const { user, msgAlert } = props

    const navigate = useNavigate()
    // build state object
    const [tv, setTV] = useState({
        modelNumber: '',
        size: '',
        type: '',
        refreshRate: '',
        highDynamicRangeFormat: '',
        brand: '',
        price: '',
        image: '',
        image2: '',
        image3: '',
        brightness: '',
        modelYear: '',
        smartOS: '',
        name: '',
        backlightType: '',
        buildQuality: '',
        contrastRatio: '',
        inputs: [],
        features: [],
        antiGlare: false,
        vrr: false,
        wideColorGamut: false,
        overallRating: '',
        overview: '',
        sku: '',
    })

    const onChange = (e) => {
        e.persist()
        setTV(prevTV => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (e.target.type === 'checkbox') {
                updatedValue = e.target.checked
            }

            const updatedTV = { [updatedName] : updatedValue }

            return {
                ...prevTV, ...updatedTV
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createTV(user, tv)
        .then(res => {
        msgAlert({
            heading: 'Oh Yeah!',
            message: res.data.message, 
            variant: 'success',
        });
        navigate(`/tvs/${res.data.tv._id}`);
    })
        .catch(err => {
            msgAlert({
            heading: 'Oh no!',
            message: messages.generalError,
            variant: 'danger'
            });
        });
    };

    console.log('the tv inside create', tv)
    return (
        <TVForm
            tv={tv}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new tv!"
        />
    )
}

export default TVCreate