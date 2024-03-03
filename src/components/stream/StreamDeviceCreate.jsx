import React, { useState } from 'react';
import { createDevice } from '../../api/device';
import { useNavigate } from 'react-router-dom';

const StreamDeviceCreate = (props) => {

    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [device, setDevice] = useState({
        modelNumber: '',
        manufacturer: '',
        regularPrice: '',
        image: '',
        image2: '',
        smartOS: '',
        hdr: false,
        hdrFormat: '',
        resolution: '',
        name: '',
        details: [],
        features: [],
        overallRating: '',
        overview: '',
        sku: '',
    })

    const onChange = (e) => {
        e.persist()
        setDevice(prevDevice => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (e.target.type === 'checkbox') {
                updatedValue = e.target.checked
            }

            const updatedDevice = { [updatedName]: updatedValue }

            return {
                ...prevDevice, ...updatedDevice
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createDevice(user, device)
            .then(() => {
                msgAlert({
                    heading: 'Device Created',
                    message: 'You have successfully created a device.',
                    variant: 'success'
                })
                navigate('/streaming-devices')
            })
            .catch(() => {
                msgAlert({
                    heading: 'Device Create Failed',
                    message: 'Something went wrong. Please try again.',
                    variant: 'danger'
                })
            })
    }


    return (
        <div>
            <h1>Create a New Streaming Device</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Model Number</label>
                    <input type="text" name="modelNumber" value={device.modelNumber} onChange={onChange} />
                </div>
                <div>
                    <label>Manufacturer</label>
                    <input type="text" name="manufacturer" value={device.manufacturer} onChange={onChange} />
                </div>
                <div>
                    <label>Regular Price</label>
                    <input type="number" name="regularPrice" value={device.regularPrice} onChange={onChange} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" name="image" value={device.image} onChange={onChange} />
                </div>
                <div>
                    <label>Image 2</label>
                    <input type="text" name="image2" value={device.image2} onChange={onChange} />
                </div>
                <div>
                    <label>Smart OS</label>
                    <input type="text" name="smartOS" value={device.smartOS} onChange={onChange} />
                </div>
                <div>
                    <label>HDR</label>
                    <input type="checkbox" name="hdr" checked={device.hdr} onChange={onChange} />
                </div>
              
                <div>
                <label>HDR Format</label>
                <select name="hdrFormat" value={device.hdrFormat} onChange={onChange}>
                <option value="">Select...</option>
                <option value="Dolby Vision">Dolby Vision</option>
                <option value="HDR 10+">HDR 10+</option>
                <option value="HDR 10">HDR 10</option>
                <option value="null">null</option>
                </select>
            </div>
                <div>
                    <label>Resolution</label>
                    <input type="text" name="resolution" value={device.resolution} onChange={onChange} />
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={device.name} onChange={onChange} />
                </div>
                <div>
                    <label>Details</label>
                    <input type="text" name="details" value={device.details} onChange={onChange} />
                </div>
                <div>
                    <label>Features</label>
                    <input type="text" name="features" value={device.features} onChange={onChange} />
                </div>
                <div>
                    <label>Overall Rating</label>
                    <input type="text" name="overallRating" value={device.overallRating} onChange={onChange} />
                </div>
                <div>
                    <label>Overview</label>
                    <input type="text" name="overview" value={device.overview} onChange={onChange} />
                </div>
                <div>
                    <label>SKU</label>

                    <input type="text" name="sku" value={device.sku} onChange={onChange} /> </div> <button type="submit">Create Device</button>
            </form>
        </div>
    )
}


export default StreamDeviceCreate;


