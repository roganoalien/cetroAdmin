const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const AdditionalSchema = new Schema({
	space: { type: String, required: true },
});

module.exports = mongoose.model('Additional', AdditionalSchema);
