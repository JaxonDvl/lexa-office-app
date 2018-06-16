import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Switch } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'
import Navigation from './Navigation'
import Report from './components/Report';
import PrivateRoute from './components/PrivateRoute';
class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			loading: true,
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/user/getUser').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user,
					loading: false,
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null,
					loading: false
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/user/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/user/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		if(this.state.loading){
			return (<div></div>)
		}
		return (
			<div className="App">
				<Navigation _logout={this._logout} loggedIn={this.state.loggedIn} />
				<Switch>
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route exact path="/login" render={() => <LoginForm _login={this._login} />}/>
				<PrivateRoute authenticated={this.state.loggedIn} exact path="/signup" component={SignupForm} />
				<PrivateRoute authenticated={this.state.loggedIn} path="/reports" component={Report} />
				</Switch>
			</div>
		)
	}
}

export default App