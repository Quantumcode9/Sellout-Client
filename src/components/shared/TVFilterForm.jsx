    import { Form, Button, Col, Row } from 'react-bootstrap';

const FilterForm = ({ handleInputChange, brands }) => (
        <Form>
            <Row>
            <Col md={3}>
                <Form.Group controlId="formGridSize">
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
                <Form.Group controlId="formGridRefreshRate">
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
                <Form.Label>Anti-Glare</Form.Label>
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
                <Form.Group controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Select name="brand" defaultValue="" onChange={handleInputChange}>
                    <option value="">All</option>
                    {brands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                    ))}
                </Form.Select>
                </Form.Group>
            </Col>
            </Row>
        </Form>
);

export default FilterForm;
