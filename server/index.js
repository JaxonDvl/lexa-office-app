if (process.env.NODE_ENV !== 'production') {
	console.log('Running on dev enviroment')
}
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConn = require('./db')
const passport = require('./passport')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'default',
		store: new MongoStore({ mongooseConnection: dbConn }),
		resave: false,
		saveUninitialized: false
	})
)
app.use(passport.initialize())
app.use(passport.session())

console.log(process.env.DB_HOST);

if (process.env.NODE_ENV === 'production') {

	console.log('running in production')
	app.use(express.static(path.join(__dirname, '/../client/build')));
	console.log(path.join(__dirname, '/../client/build'));

}

app.use('/auth', require('./auth'))



app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'), function (err) {
		if (err) {
			res.status(500).send(err)
		}
	});
});



app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
