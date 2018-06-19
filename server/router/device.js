const express = require('express')
const router = express.Router()
const Device = require('../db/models/device')

router.get('/deviceInfo', (req,res,next) => {
	let deviceId = req.query.deviceId;
	Device.findOne({ 'uuid': deviceId }, "clocking deviceName uuid", (err, deviceMatch) => {
		if(deviceMatch) {
			return res.json(deviceMatch)
		} else {
			return res.json({message: "No device found"})
		}
	})

   
});


router.post('/registerDevice', (req, res) => {
	const { uuid, deviceName, password } = req.body
	Device.findOne({ 'deviceName': deviceName }, (err, deviceMatch) => {
		if (deviceMatch) {
			return res.json({
				error: `Sorry, already a device with : ${deviceName}`
			})
		}
		const newDevice = new Device({
            'uuid':uuid,
			'deviceName': deviceName,
			'password': password
		})
		newDevice.save((err, savedDevice) => {
			if (err) return res.json(err)
			return res.json(savedDevice)
		})
	})
})

module.exports = router