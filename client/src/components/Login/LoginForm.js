import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="login-form">
					<h1>Login form</h1>
					<form>
					<div className="form-group">
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							className="form-control"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							className="form-control"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						</div>
						<button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
					</form>

				</div>
			)
		}
	}
}

export default LoginForm