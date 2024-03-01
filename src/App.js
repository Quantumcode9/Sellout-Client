// import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
// import TVForm from './components/shared/TVForm';
// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import TVShow from './components/tvs/TvShow'
import TVCreate from './components/tvs/TvCreate'
import TVIndex from './components/tvs/TvsIndex'
import Cart from './components/cart/Cart'
import SoundbarCreate from './components/soundbar/SoundbarCreate';
import SoundbarShow from './components/soundbar/SoundbarShow/SoundbarShow';
import SoundbarIndex from './components/soundbar/SoundbarIndex';
import Search from './components/shared/Search';
import ProductShow from './components/products/ProductShow';


const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])

	useEffect(() => {
		// access localStorage
		const loggedInUser = localStorage.getItem('user')

		if (loggedInUser) {
			// we need to parse the json string
			const foundUser = JSON.parse(loggedInUser)
			// then set that saved user in state
			setUser(foundUser)
		}
	}, [])

	console.log('user in app', user)
	console.log('message alerts', msgAlerts)

	const clearUser = () => {
		console.log('clear user ran')
		// to clear the user saved in local storage
		localStorage.removeItem('user')
		// to clear the user saved in state
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
    )
		})
	}

	return (
		<Fragment>
			<Header user={user} />
			<div className="App-body">
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
					<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
					<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
					</RequireAuth>}
				/>
				<Route 
					path='/add-tv'
					element={
						<RequireAuth user={user} >
							<TVCreate msgAlert={msgAlert} user={user}/>
						</RequireAuth>
					}
				/>
				<Route 
                path='/soundbars'
                element={
                <SoundbarIndex user={user} msgAlert={msgAlert}/>
                }
                />               
				<Route 
					path='/soundbars/:id'
					element={
						<SoundbarShow user={user} msgAlert={msgAlert}/>
					}
				/>
				<Route 
					path='/add-soundbar'
					element={
						<RequireAuth user={user}>
							<SoundbarCreate msgAlert={msgAlert} user={user}/>
						</RequireAuth>
					}
				/>
				<Route 
					path='tvs/:tvId'
					element={
						<TVShow user={user} msgAlert={msgAlert}/>
					}
				/>
				<Route
				   path='/cart'
				   element={
					   <RequireAuth user={user}>
						   <Cart user={user} msgAlert={msgAlert}/>
					   </RequireAuth>
				   }
				/>
				<Route 
					path='/search'
					element={
						<Search user={user} msgAlert={msgAlert}/>
					}
				/>
				<Route 
					path='/products'
					element={
						<ProductShow user={user} msgAlert={msgAlert}/>
					}
				/>
				<Route 
					path='/products/:id'
					element={
						<ProductShow user={user} msgAlert={msgAlert}/>
					}
				/>
				<Route
				path='tvs/TvsIndex'
				element={
					<TVIndex user={user} msgAlert={msgAlert}/>
				}
				/>

             
			</Routes>

			


			


			</div>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}


export default App