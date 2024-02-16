
import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm.jsx'
import messages from '../shared/AutoDismissAlert/messages'
import { Button } from 'react-bootstrap'

import { createReview } from '../../api/tv'

const NewReviewModal = ({ tvId, user, show, handleClose, triggerRefresh, msgAlert }) => {
    const [review, setReview] = useState({
  
        rating: '',
        comment: ''
    })
    const [msgAlerts, setMsgAlerts] = useState([])

    const handleChange = (event) => {
        setReview({ ...review, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        if (!user) {
            setMsgAlerts([...msgAlerts, { heading: 'Error', message: 'You must be logged in to create a review', variant: 'danger' }]);
            return;
          }
      
          createReview(tvId, user, review)
            .then(() => {
                setReview({ rating: '', comment: '' })
                triggerRefresh()
                handleClose()
                setMsgAlerts([...msgAlerts, messages.reviewSuccess])
            })
            .catch(() => {
                setReview({ rating: '', comment: '' })
                handleClose()
                setMsgAlerts([...msgAlerts, messages.reviewFailure])
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReviewForm
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading='Add a Review'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default NewReviewModal

   