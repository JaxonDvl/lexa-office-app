import React, { Component } from 'react'
import axios from 'axios'
class Home extends Component {
	constructor() {
		super()
	}

	handleSendRequest = () =>{
		console.log("sending request");
		axios.get('/device/deviceInfo')
		.then(response => {
			console.log(response);
		})
	}

	render() {
		return (
			<div>

				<div className="Home">
					<p>Current User:</p>
					<code>
						{JSON.stringify(this.props)}
					</code>
				</div>
				<div>
					<button className="btn btn-primary" onClick={this.handleSendRequest}>Send Request</button>
				</div>
			</div>
		)
	}

}


export default Home