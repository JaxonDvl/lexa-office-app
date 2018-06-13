const express = require('express')
const router = express.Router()
const Device = require('../db/models/device')
// const passport = require('../passport')

router.get('/deviceInfo', (req,res,next) => {
    console.log("request device data")
    return res.json({deviceInfo: "some info"})
});
// GET basic info for the user
// router.get('/user', (req, res, next) => {
// 	console.log('===== user!!======')
// 	console.log(req.user)
// 	if (req.user) {
// 		return res.json({ user: req.user })
// 	} else {
// 		return res.json({ user: null })
// 	}
// })

// router.post(
// 	'/login',
// 	function (req, res, next) {
// 		console.log(req.body)
// 		console.log('================')
// 		next()
// 	},
// 	passport.authenticate('local'),
// 	(req, res) => {
// 		console.log('POST to /login')
// 		const user = JSON.parse(JSON.stringify(req.user)) // hack
// 		const cleanUser = Object.assign({}, user)
// 		if (cleanUser.local) {
// 			console.log(`Deleting ${cleanUser.local.password}`)
// 			delete cleanUser.local.password
// 		}
// 		res.json({ user: cleanUser })
// 	}
// )

// router.post('/logout', (req, res) => {
// 	if (req.user) {
// 		req.session.destroy()
// 		res.clearCookie('connect.sid') // clean up!
// 		return res.json({ msg: 'logging you out' })
// 	} else {
// 		return res.json({ msg: 'no user to log out!' })
// 	}
// })

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