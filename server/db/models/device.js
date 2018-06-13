const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise


const deviceSchema = new Schema({
	uuid: { type: String, unique: true },
    deviceName: { type: String, unique: false },
    password: { type: String, unique: false }
})


deviceSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

//enable this to hash the password
// deviceSchema.pre('save', function(next) {
// 	if (!this.password) {
// 		console.log('No Password provided');
// 		next()
// 	} else {
// 		this.password = this.hashPassword(this.password)
// 		next()
// 	}
// })



// Create reference to User & export
const Device = mongoose.model('Device', deviceSchema)
module.exports = Device