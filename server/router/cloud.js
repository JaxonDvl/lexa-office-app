const express = require('express')
const router = express.Router()


router.post("/updateBulb",(req,res)=>{
	message.updateBulb({
			on_off :req.body.onoff, //true false
            color_temp: req.body.color_temp, // LB120:2700-6500 
            brightness:req.body.brightness // 0-100
	})
		.then(function(result) {
			return res.status(200).json(result)
		})
		.catch(function(err){
			return res.status(500).json({error:err});
		})
})

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