import { Form, Button, Container } from 'react-bootstrap'

const TVForm = (props) => {
    const { tv, handleChange, handleSubmit, heading } = props; 
    
    
  return (

    <Container className="justify-content-center">
    <h3>{heading}</h3>
    <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
            <Form.Label>Model Number</Form.Label>
            <Form.Control
                type='text'
                name='modelNumber'
                value={tv.modelNumber}
                onChange={handleChange}
            />  
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Size</Form.Label>
            <Form.Control
                type='text'
                name='size'
                value={tv.size}
                onChange={handleChange}
            />  
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Type</Form.Label>
            <Form.Control
                as='select'

                name='type'
                value={tv.type}
                onChange={handleChange}
            >
                <option value=''>Select a type</option>
                <option value='OLED'>OLED</option>
                <option value='Mini LED'>Mini LED</option>
                <option value='QLED'>QLED</option>
                <option value='LED'>LED</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Refresh Rate</Form.Label>
            <Form.Control
                as='select'
                name='refreshRate'
                value={tv.refreshRate}
                onChange={handleChange}
            > 
                <option value=''>Select a refresh rate</option>
                <option value='120'>120</option>  
                <option value='60'>60</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>High Dynamic Range Format</Form.Label>
            <Form.Control
                as='select'
                name='highDynamicRangeFormat'
                value={tv.highDynamicRangeFormat}
                onChange={handleChange}
            > 
                <option value=''>Select a high dynamic range format</option>
                <option value='Dolby Vision'>Dolby Vision</option>
                <option value='HDR 10+'>HDR 10+</option>
                <option value='HDR 10'>HDR 10</option>
                <option value='null'>null</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
                as='select'
                name='brand'
                value={tv.brand}
                onChange={handleChange}
            >
                <option value=''>Select a brand</option>
                <option value='Samsung'>Samsung</option>
                <option value='LG'>LG</option>
                <option value='Sony'>Sony</option>
                <option value='TCL'>TCL</option>
                <option value='Roku'>Roku</option>
                <option value='Hisense'>Hisense</option>
                <option value='other'>other</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Price</Form.Label>
            <Form.Control
                type='number'
                name='price'
                value={tv.price}
                onChange={handleChange}
            />  
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control
                type='text'
                name='image'
                value={tv.image}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Image 2</Form.Label>
            <Form.Control
                type='text'
                name='image2'
                value={tv.image2}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Image 3</Form.Label>
            <Form.Control
                type='text'
                name='image3'
                value={tv.image3}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Brightness</Form.Label>
            <Form.Control
                type='text'
                name='brightness'
                value={tv.brightness}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Model Year</Form.Label>
            <Form.Control
                type='text'
                name='modelYear'
                value={tv.modelYear}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Smart OS</Form.Label>
            <Form.Control
                as='select'
                name='smartOS'
                value={tv.smartOS}
                onChange={handleChange}
            >
                <option value=''>Select a smart OS</option>
                <option value='Roku'>Roku</option>
                <option value='Android'>Android</option>
                <option value='webOS'>webOS</option>
                <option value='Tizen'>Tizen</option>
                <option value='Vidaa U'>Vidaa U</option>
                <option value='Fire TV'>Fire TV</option>
                <option value='Google'>Google</option>
                <option value='SmartCast'>SmartCast</option>
                <option value='other'>other</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                type='text'
                name='name'
                value={tv.name}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Backlight Type</Form.Label>
            <Form.Control
                as='select'
                name='backlightType'
                value={tv.backlightType}
                onChange={handleChange}
            >
                <option value=''>Select a backlight type</option>
                <option value='Full Array'>Full Array</option>
                <option value='Edge Lit'>Edge Lit</option>
                <option value='Direct Lit'>Direct Lit</option>
                <option value='Mini-LED'>Mini-LED</option>
                <option value='Pixel'>Pixel</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Build Quality</Form.Label>
            <Form.Control
                as='select'
                name='buildQuality'
                value={tv.buildQuality}
                onChange={handleChange}
            >
                <option value=''>Select a build quality</option>
                <option value='poor'>poor</option>
                <option value='fair'>fair</option>
                <option value='good'>good</option>
                <option value='excellent'>excellent</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Contrast Ratio</Form.Label>
            <Form.Control
                type='text'
                name='contrastRatio'
                value={tv.contrastRatio}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Inputs</Form.Label>
            <Form.Control
                type='text'
                name='inputs'
                value={tv.inputs}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Features</Form.Label>
            <Form.Control
                type='text'
                name='features'
                value={tv.features}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Check 
                label="Anti-Glare"
                name="antiGlare"
                defaultChecked={tv.antiGlare}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Check 
                label="Variable Refresh Rate"
                name="vrr"
                defaultChecked={tv.vrr}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Check 
                label="Wide Color Gamut"
                name="wideColorGamut"
                defaultChecked={tv.wideColorGamut}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Overall Rating</Form.Label>
            <Form.Control
                type='number'
                name='overallRating'
                value={tv.overallRating}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>Overview</Form.Label>
            <Form.Control
                as='textarea'
                rows={3}
                name='overview'
                value={tv.overview}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group className='m-2'>
            <Form.Label>SKU</Form.Label>
            <Form.Control
                type='text'
                name='sku'
                value={tv.sku}
                onChange={handleChange}
            />
        </Form.Group>
    
        <br/>
        <Button className='m-2' variant='primary' type='submit'>
            Submit
        </Button>
    </Form>
</Container>

);
};

export default TVForm;


