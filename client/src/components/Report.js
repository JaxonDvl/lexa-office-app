import React, { Component } from 'react'
import axios from 'axios'
import {serverUrl} from '../helpers/constants';
import ReportTable from './ReportTable';
class Report extends Component {
	constructor(props) {
        super(props)
		this.state ={
			socket : props.socket,
			logs : [],
			clockingMsg: "Clocking Mode ON",
			msgType : "success"
		}
	}
	async componentDidMount() {
		let {clockingMsg, msgType} = this.state;
		let socket = this.state.socket;
		socket.emit('hello-from-client',{message:'hi'})
		let logs = await axios.get('/logs/getLogs')
		let deviceInfo = await axios.get('/device/deviceInfo?deviceId=AX1')
		console.log(deviceInfo.data);
		socket.on('clocking-data-log', async (data) => {
			let updatedLogs = await axios.get('/logs/getLogs')
			this.setState({
				logs: updatedLogs.data.logsMatch.reverse(),	
			})
		})
		if(deviceInfo.data["clocking"]=== false) {
			clockingMsg = "Clocking Mode OFF, Ask Alexa to turn it ON";
			msgType = "danger";
			this.setState({
				logs: logs.data.logsMatch,
				clockingMsg,
				msgType
			})
		} else {
			clockingMsg = "Clocking Mode ON";
			msgType : "success";
			this.setState({
				logs: logs.data.logsMatch,
				clockingMsg,
				msgType
			})
		}
		socket.on('clocking-update', (data) => {
			if(data["clocking"]=== false) {
				clockingMsg = "Clocking Mode OFF, Ask Alexa to turn it ON";
				msgType = "danger";
				this.setState({
					logs: logs.data.logsMatch.reverse(),
					clockingMsg,
					msgType
				})
			} else {
				clockingMsg = "Clocking Mode ON";
				msgType = "success";
				this.setState({
					logs: logs.data.logsMatch.reverse(),
					clockingMsg,
					msgType
				})
			}
		})
	
		this.setState({
			logs: logs.data.logsMatch.reverse(),
			clockingMsg,
			msgType
		})
	  }



	render() {
		console.log(this.props.user);
		return (
			<div>
                <h1>Report page</h1>
				<div className={`alert alert-`+this.state.msgType} role="alert">
  					{this.state.clockingMsg}
				</div>
				<ReportTable logs={this.state.logs} />
			</div>
		)
	}

}


export default Report