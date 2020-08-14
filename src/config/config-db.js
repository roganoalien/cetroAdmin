const mongoose = require('mongoose');
const { config } = require('./config-app');

const URI = `mongodb://localhost/${config.db_name}`;

mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('DB connected!');
});

connection.on('error', (err) => {
	console.log('Mongoose ERROR');
	console.log(err);
});
