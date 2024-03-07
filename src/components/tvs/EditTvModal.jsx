import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TVForm from '../shared/TVForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditTVModal = (props) => {

    const { user, show, handleClose, updateTV, msgAlert, triggerRefresh } = props

    const [tv, setTV] = useState(props.tv)

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
        e.preventDefault()
        updateTV(user, tv)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateTVSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <TVForm 
                    tv={tv}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update TV"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditTVModal