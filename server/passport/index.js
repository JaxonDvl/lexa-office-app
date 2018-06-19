const passport = require('passport')
const LocalStrategy = require('./local')
const User = require('../db/models/user')

passport.serializeUser((user, done) => {
	console.log('serialized: ', user)
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id }, 'username firstName lastName', (err, user) => {
			console.log('deserialize :', user)
			done(null, user)
		});
})

passport.use(LocalStrategy)

module.exports = passport