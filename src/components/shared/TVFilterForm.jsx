import { Form, Button, Col, Row } from 'react-bootstrap';

const FilterForm = ({ handleInputChange, brands}) => (
        <Form>
            <Row xs={2} sm={2} lg={5} xl={6}>
            <Col md={3}>
                <Form.Group controlId="formGridSize"style={{ width: '80%', margin: 'auto' }}>
                <Form.Label style={{ textAlign: 'center' }}>Size</Form.Label>
                <Form.Control as="select" name="size" onChange={handleInputChange}>
                    <option value="">Select size...</option>
                    <option value="40-43">40-43</option>
                    <option value="48-50">48-50</option>
                    <option value="55-57">55</option>
                    <option value="58-60">58-60</option>
                    <option value="65-69">65</option>
                    <option value="70-74">70</option>
                    <option value="75-77">75-77</option>
                    <option value="80-85">80-85</option>
    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formGridRefreshRate" style={{ width: '80%', margin: 'auto' }}>
                <Form.Label>Refresh Rate</Form.Label>
                <Form.Control as="select" name="refreshRate" onChange={handleInputChange}>
                    <option value="">Select refresh rate...</option>
                    <option value="60">60</option>
                    <option value="120">120</option>
    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group controlId="formGridAntiGlare">
                <Form.Label style={{ textAlign: 'center' }}>
                    Anti-Glare</Form.Label>
                <Form.Check type="checkbox" name="antiGlare"  onChange={handleInputChange} />
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group controlId="formGridVRR">
                <Form.Label>VRR</Form.Label>
                <Form.Check type="checkbox" name="vrr"  onChange={handleInputChange} />
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group controlId="formGridBrand" style={{ width: '80%', margin: 'auto' }}>
                <Form.Label>Brand</Form.Label>
                <Form.Select name="brand" defaultValue="" onChange={handleInputChange}>
                    <option value="">All</option>
                    {brands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                    ))}
                </Form.Select>
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group controlId="formGridPrice" style={{ width: '80%', margin: 'auto' }}>
                <Form.Label>Price</Form.Label>
                <Form.Control as="select" name="price" onChange={handleInputChange}>
                    <option value="">Any</option>
                    <option value="500">Under $500</option>
                    <option value="1000">Under $1000</option>
                    <option value="2000">Under $2000</option>
                    <option value="3000">Under $3000</option>
                </Form.Control>
                </Form.Group>
            </Col>
            </Row>
        </Form>
);

export default FilterForm;
