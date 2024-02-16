import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm.jsx'
import messages from '../shared/AutoDismissAlert/messages'
import { Button } from 'react-bootstrap'

import { updateReview } from '../../api/tv' 

const EditReviewModal = (props) => {
  const { user, show, handleClose, triggerRefresh, msgAlert, tvId } = props;
  const [updatedReview, setUpdatedReview] = useState({ rating: '', comment: '' });
    const [msgAlerts, setMsgAlerts] = useState([]);

  useEffect(() => {
    if (props.review) {
      setUpdatedReview(props.review);
    }
  }, [props.review]);

  const handleChange = (event) => {
    setUpdatedReview({ ...updatedReview, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateReview(tvId, user, updatedReview)
      .then(() => {
        triggerRefresh();
        handleClose();
        setMsgAlerts([...msgAlerts, messages.updateReviewSuccess]);
      })
      .catch(() => {
        handleClose();
    

        setMsgAlerts([...msgAlerts, messages.updateReviewFailure]);
      });
  };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReviewForm
                   review={updatedReview}
                   handleChange={handleChange}
                   handleSubmit={onSubmit}
                    heading='Edit Review'
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


export default EditReviewModal
    
