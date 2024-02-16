import { Form, Button, Container } from 'react-bootstrap'

const ReviewForm = (props) => {
    
    const { review, handleChange, handleSubmit, heading } = props

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Rating</Form.Label>
            <Form.Control
                as='select'
                name='rating'
                value={review.rating}
                onChange={handleChange}
            >
                <option value=''>Select a rating</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Comment</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Comment"
                name="comment"
                value={review.comment}
                onChange={handleChange}
            />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>
    )
}

export default ReviewForm
