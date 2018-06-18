import React, { Component } from 'react'
import axios from 'axios'
import {serverUrl} from '../helpers/constants';
import socketClient from "socket.io-client";
class Report extends Component {
	constructor(props) {
        super(props)
		console.log("mountent reports")
		this.state ={
			socket : null,
			serverUrl : serverUrl
		}
	}
	componentDidMount() {
		let { serverUrl, socket } = this.state;
		socket = socketClient(serverUrl);
		socket.emit('login-web');
		this.setState({
			socket
		})
		// socket.on("FromAPI", data => this.setState({ response: data }));
	  }
	  componentWillUnmount() {
		  console.log("called unmount");
		this.state.socket.emit("logout");
	  }


	render() {
		return (
			<div>
                <h1>Report page</h1>
			</div>
		)
	}

}


export default Report