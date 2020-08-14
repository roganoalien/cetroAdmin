// Usuario con acceso al backend
const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const EventSchema = new Schema({
	name: { type: String, required: true },
	date: {
		start: { type: String, required: true },
		end: { type: String, required: true },
		calendarEnd: { type: String, required: true },
	},
	time: {
		start: { type: String, required: true },
		end: { type: String, required: true },
	},
	type: { type: String, required: true },
	classification: { type: String, required: true },
	status: { type: String, default: 'Sin aprobación' },
	responsable: {
		_id: { type: String, required: true },
		name: { type: String, required: true },
	},
	space: { type: String, required: true },
	services: { type: String, required: true },
	comments: { type: String },
	// EXTRA DATA
	client: {
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	capacity: { type: Number, required: true },
	mounting: {
		date: { type: String, required: true },
		time: { type: String, required: true },
	},
	unmounting: {
		date: { type: String, required: true },
		time: { type: String, required: true },
	},
	price: { type: String, required: true },
	advance_payment: { type: String, required: true },
	vertical: { type: String },
	data_analysis: {
		name: { type: String, required: true },
		value: { type: String, required: true },
	},
	additional_spaces: { type: Array },
});

module.exports = mongoose.model('Evento', EventSchema);
