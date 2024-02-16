import { Cards, Button } from 'react-bootstrap'



const ReviewShow = (props) => {
    const { review, handleDelete } = props
    return (
        <div>
            <h1>{review.rating}</h1>
            <p>{review.comment}</p>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
    )
}


export default ReviewShow