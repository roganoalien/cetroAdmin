// Usuario con acceso al backend
const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const LookoutSchema = new Schema({
	date: { type: String, required: true },
});

module.exports = mongoose.model('Lookout', LookoutSchema);
