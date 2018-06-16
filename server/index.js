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
const http = require('http');


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

if (process.env.NODE_ENV === 'production') {

	console.log('running in production')
	app.use(express.static(path.join(__dirname, '/../client/build')));
	console.log(path.join(__dirname, '/../client/build'));

}

const auth = require('./auth/auth');
app.get('/auth/checkAuthState', auth.isLoggedIn, (req,res) =>{
	return res.status(200).json({message:'OK'});
})
app.use('/user', require('./router/user'))

app.use('/device', auth.isLoggedIn, require('./router/device'))

app.get('/cloud',(req,res)=>{
	message.cloudMessage({message: "test cloud call"})
	return res.status(200).json({message:"cloud call"})
})
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'), function (err) {
		if (err) {
			res.status(500).send(err)
		}
	});
});

const server = http.Server(app);

require('./modules/socketToken').connect(server);




server.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
