
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SoundbarForm from '../shared/SoundbarForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateSoundbar } from '../../api/soundbar'

const EditSoundbarModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, tv } = props
    const [soundbar, setSoundbar] = useState(props.soundbar)

    const onChange = (e) => {
        e.persist()
        setSoundbar(prevSoundbar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedSoundbar = { [updatedName] : updatedValue }

            return {
                ...prevSoundbar, ...updatedSoundbar
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateSoundbar(user, tv, soundbar)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateSoundbarSuccess,
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
                <SoundbarForm 
                    soundbar={soundbar}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Soundbar"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSoundbarModal