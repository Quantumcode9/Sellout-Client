import {useState, useEffect} from 'react'
import { getAllTVs } from "../../api/tv"

import LoadingScreen from '../shared/LoadingScreen'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import './TvsIndex.css'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}





const TVsIndex = (props) => {
    const [tvs, setTVs] = useState(null)
    const [error, setError] = useState(false)

    // destructure our props
    const { msgAlert } = props

	useEffect(() => {
		getAllTVs()
			.then(res => {
				console.log('use Effect hook ran')
				setTVs(res.data.tvs)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!tvs) {
        return <LoadingScreen />

    } else if (tvs.length === 0) {
        return <p>No tvs yet</p>
    }

    const cardStyle  = {
        width: '18rem',
        margin: '1rem',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Lucida Sans ,Lucida Sans Regular'
    }








    const tvCards = tvs.map(tv => (
        <Link to={`/tvs/${tv._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card key={tv.id} style={cardStyle}>
            <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
              {tv.modelNumber}
            </Card.Header>
            <img src={tv.image} alt={tv.modelNumber} style={{ width: '100%', marginTop: 6 }} />
            <Card.Body>
              <Card.Text className="h5">
                ${tv.price}.99
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
              View
            </Card.Footer>
          </Card>
        </Link>
      ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { tvCards }
        </div>
    )
}


export default TVsIndex