import { Form, Button, Container } from 'react-bootstrap'

const SoundbarForm = (props) => {

    const { soundbar, handleSubmit, handleChange, heading } = props

    return (
        <Container>
        <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Brand</Form.Label>
            <Form.Control
                as='select'
                name='brand'
                value={soundbar.brand}
                onChange={handleChange}
            >
                <option value=''>Select a brand</option>
                <option value='Samsung'>Samsung</option>
                <option value='LG'>LG</option>
                <option value='Sony'>Sony</option>
                <option value='Bose'>Bose</option>
                <option value='JBL'>JBL</option>
                <option value='Sonos'>Sonos</option>
                <option value='other'>Other</option>

            </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Model Number</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Model Number"
                name="modelNumber"
                value={props.soundbar.modelNumber}
                onChange={props.handleChange}
            />
            </Form.Group>
    
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={props.soundbar.price}
                onChange={props.handleChange}
            />
            </Form.Group>
    
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={props.soundbar.image}
                onChange={props.handleChange}
            />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Image 2</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image2"
                value={props.soundbar.image2}
                onChange={props.handleChange}
            />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Channels</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Channels"
                name="channels"
                value={props.soundbar.channels}
                onChange={props.handleChange}
            />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Rating</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter Rating"
                name="rating"
                value={props.soundbar.rating}
                onChange={props.handleChange}
            />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>SKU</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter SKU"
                name="sku"
                value={props.soundbar.sku}
                onChange={props.handleChange}
            />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
    <Form.Label>Dolby Atmos</Form.Label>
    <Form.Check
        type="checkbox"
        name="dolbyAtmos"
        checked={props.soundbar.dolbyAtmos}
        onChange={props.handleCheckboxChange}
    />
</Form.Group>
    
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        </Container>
    )
    }

export default SoundbarForm
    
