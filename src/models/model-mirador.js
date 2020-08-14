// Usuario con acceso al backend
const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const MiradorSchema = new Schema({
	date: { type: String, required: true },
	time: {
		start: { type: String, required: true },
		end: { type: String, required: true },
	},
	type: { type: String, default: 'mirador' },
	rules: {
		entrance: { type: String, required: true },
		validFor: { type: String, required: true },
		capacity: { type: Number, required: true },
	},
	tickets: { type: Array },
});

module.exports = mongoose.model('Mirador', MiradorSchema);
