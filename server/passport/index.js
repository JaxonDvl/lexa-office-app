const passport = require('passport')
const LocalStrategy = require('./local')
const User = require('../db/models/user')

passport.serializeUser((user, done) => {
	console.log('serialized: ')
	console.log(user) 
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('de serialize')
	User.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log('deserialize')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

passport.use(LocalStrategy)

module.exports = passport