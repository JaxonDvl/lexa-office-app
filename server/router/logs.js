const express = require('express')
const router = express.Router()
const Logs = require('../db/models/logs')

router.get('/getLogs', (req,res,next) => {
    Logs.find({},'firstName lastName date state', (err, logsMatch) => {
	
			return res.json({logsMatch})
	
});
});

module.exports = router