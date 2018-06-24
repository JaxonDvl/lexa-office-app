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

import { serverUrl } from './helpers/constants';
import socketClient from "socket.io-client";
class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			loading: true,
			socket: null,
			serverUrl: serverUrl
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/user/getUser').then(response => {
			let { serverUrl, socket } = this.state;

			console.log(response.data)
			if (!!response.data.user) {
				if (!socket) {
					socket = socketClient(serverUrl);
					socket.clientConnUser = response.data.user.username;
					socket.emit('login-web', { username: socket.clientConnUser });
					console.log('User logged in');
					socket.on('login-client.success', function (data) {
						console.log("socket registered to backend", data);
					})
				}
				this.setState({
					loggedIn: true,
					user: response.data.user,
					loading: false,
					socket
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
	componentWillUnmount() {
		console.log("called unmount");
		this.state.socket.emit("logout");
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/user/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.state.socket.emit("logout");
				this.setState({
					loggedIn: false,
					user: null,
					socket: null
				})
			}
		})
	}

	_login(username, password) {
		let { serverUrl, socket } = this.state;
		axios
			.post('/user/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					if (!socket) {
						socket = socketClient(serverUrl);
						socket.clientConnUser = response.data.user.username;
						socket.emit('login-web', { username: socket.clientConnUser });
						console.log('User logged in');
						socket.on('login-client.success', function (data) {
							console.log(data);
						})
					}
					this.setState({
						loggedIn: true,
						user: response.data.user,
						socket
					})
				}
			})
	}

	render() {
		if (this.state.loading) {
			return (<div></div>)
		}
		return (
			<div className="App">
				<Navigation _logout={this._logout} loggedIn={this.state.loggedIn} />
				<Switch>
					<Route exact path="/" render={() => <Home user={this.state.user} />} />
					<Route exact path="/login" render={() => <LoginForm _login={this._login} />} />
					<PrivateRoute authenticated={this.state.loggedIn} exact socket={this.state.socket} path="/signup" component={SignupForm} />
					<PrivateRoute authenticated={this.state.loggedIn} exact socket={this.state.socket} user={this.state.user} path="/reports" component={Report} />
				</Switch>
			</div>
		)
	}
}

export default App