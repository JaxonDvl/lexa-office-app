const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise


const logsSchema = new Schema({
	firstName: { type: String, unique: false },
    lastName: { type: String, unique: false },
    tagId : { type: String, unique: false },
    state: { type: String, unique: false },
    date: { type : Date, default: Date.now }
})


// Create reference to User & export
const Logs = mongoose.model('Logs', logsSchema)
module.exports = Logs