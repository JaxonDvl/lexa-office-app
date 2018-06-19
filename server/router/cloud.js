const express = require('express')
const router = express.Router()

router.post("/changeClockState",(req,res)=>{
	message.changeClockState({state: req.body.clockState})
		.then(function(result) {
			return res.status(200).json(result)
		})
		.catch(function(err){
			return res.status(500).json({error:err});
		})
})

router.get("/temp",(req,res)=>{
	message.cloudMessageTemperature({message: null})
		.then(function(result) {
			return res.status(200).json(result)
		})
		.catch(function(err){
			return res.status(500).json({error:err});
		})
})

router.get("/hum",(req,res)=>{
	message.cloudMessageHumidity({message: null})
		.then(function(result) {
			return res.status(200).json(result)
		})
		.catch(function(err){
			return res.status(500).json({error:err});
		})
})

module.exports = router;