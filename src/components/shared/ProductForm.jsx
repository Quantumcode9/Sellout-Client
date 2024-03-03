import { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap'

const ProductForm = ({ product, handleSubmit }) => {
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setProductData(product);
    }, [product]);


    const handleInputChange = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value
        });
    };

    const handleDetailChange = (event, index, field) => {
        const newDetails = [...productData.details];
        newDetails[index][field] = event.target.value;
        setProductData({
            ...productData,
            details: newDetails
        });
    };

    const addDetail = () => {
        setProductData({
            ...productData,
            details: [...productData.details, { name: '', value: '' }]
        });
    };


    return (
        <Container>
            <Form onSubmit={() => handleSubmit(productData)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                        type="text"
                        name="manufacturer"
                        value={productData.manufacturer}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Model Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="modelNumber"
                        value={productData.modelNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Regular Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="regularPrice"
                        value={productData.regularPrice}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sale Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="salePrice"
                        value={productData.salePrice}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>SKU</Form.Label>
                    <Form.Control
                        type="number"
                        name="sku"
                        value={product.sku}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={productData.image}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="image2"
                        value={productData.image2}
                        onChange={handleInputChange}
                    />  
                </Form.Group>
              
           
                <Button type="submit">Submit</Button>

            </Form>
        </Container>
    );
}



export default ProductForm;


