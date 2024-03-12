
import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm.jsx'
import messages from '../shared/AutoDismissAlert/messages'
import { Button } from 'react-bootstrap'

import { createProductReview } from '../../api/product'

const ProductReviewModal = ({ productId, user, show, handleClose, onHide, triggerRefresh, msgAlert }) => {
    const [review, setReview] = useState({
        rating: '',
        comment: ''
    })
    const [postingReview, setPostingReview] = useState(false)
    const [msgAlerts, setMsgAlerts] = useState([])

    const handleChange = (event) => {
        setReview({ ...review, [event.target.name]: event.target.value })
    }



    const handleSubmit = (event) => {
        if (!user) {
            setMsgAlerts([...msgAlerts, { heading: 'Error', message: 'You must be logged in to create a review', variant: 'danger' }]);
            return;
          }
      
          createProductReview(productId, user, review)
            .then(() => {
                setReview({ rating: '', comment: '' })
                setPostingReview(true);
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
        <Modal show={show} onHide={onHide} handleClose={handleClose}>
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
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default ProductReviewModal
