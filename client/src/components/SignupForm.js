import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
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
		axios
			.post('/user/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="sign-up-form">
				<h1>Signup form</h1>
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
					<div className="form-group">

						<label htmlFor="confirmPassword">Confirm Password: </label>
						<input
							type="password"
							name="confirmPassword"
							className="form-control"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
					</div>
					{/* </ul> */}
					<button className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
				</form>
			</div>
		)
	}
}

export default SignupForm