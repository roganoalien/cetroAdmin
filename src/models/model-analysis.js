const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const DataSchema = new Schema({
	name: { type: String, required: true },
	value: { type: String, required: true },
});

module.exports = mongoose.model('Data', DataSchema);
