import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null,
			socket : props.socket,
			clockingMsg: "Registration Mode ON",
			msgType : "success"

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleTagId = this.handleTagId.bind(this)
	}
	async componentDidMount() {
		let {clockingMsg, msgType} = this.state;
		const {socket} = this.state;
		socket.on('tag-register', (data) => {
			this.handleTagId(data.tagId)
		})
		let deviceInfo = await axios.get('/device/deviceInfo?deviceId=AX1')
		console.log(deviceInfo.data);
		if(deviceInfo.data["clocking"]=== false) {
			clockingMsg = "Registration Mode ON";
			msgType = "success";
			
			this.setState({
				clockingMsg,
				msgType
			})
		} else {
			clockingMsg = "Registration Mode OFF, Ask Alexa to turn it ON";
			msgType = "danger";
			this.setState({
				clockingMsg,
				msgType
			})
		}

		socket.on('clocking-update', (data) => {
			console.log(data);
			if(data["clocking"]=== false) {
				clockingMsg = "Registration Mode ON";
			msgType = "success";
				this.setState({
					clockingMsg,
					msgType
				})
			} else {
				clockingMsg = "Registration Mode OFF, Ask Alexa to turn it ON";
			msgType = "danger";
				this.setState({
					clockingMsg,
					msgType
				})
			}
		})
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleTagId(targId) {
		let event = {}
		event.target = {}
		event.target.name = "tagId";
		event.target.value = targId;
		this.handleChange(event);
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log(this.state.tagId)
		axios
			.post('/user/signup', {
				username: this.state.username,
				password: this.state.password,
				tagId: this.state.tagId
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					// this.setState({
					// 	redirectTo: '/login'
					// })
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
				<div className={`alert alert-`+this.state.msgType} role="alert">
  					{this.state.clockingMsg}
				</div>
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
					<div className="form-group">
						<label htmlFor="tag">TAG ID: </label>
						<input
							type="text"
							disabled="disabled"
							name="tag"
							className="form-control"
							value={this.state.tagId}
						/>
					</div>
					<button className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
				</form>
			</div>
		)
	}
}

export default SignupForm