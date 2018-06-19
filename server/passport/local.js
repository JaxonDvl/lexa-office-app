const User = require('../db/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // default value
	},
	function(username, password, done) {
		User.findOne({ 'username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy