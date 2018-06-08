const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let MONGO_URL
const MONGO_LOCAL_URL = 'mongodb://localhost:27017/testDb1'

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
	MONGO_URL = process.env.MONGODB_URI
} else {
	mongoose.connect(MONGO_LOCAL_URL) 
	MONGO_URL = MONGO_LOCAL_URL
}

const db = mongoose.connection
db.on('error', err => {
	console.log(`Error connection: ${err}`)
})
db.once('open', () => {
	console.log(`Connected to DB: ${MONGO_URL}`)
})

module.exports = db