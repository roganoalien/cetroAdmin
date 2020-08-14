// Usuario con acceso al backend
const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const TicketSchema = new Schema({
	date: { type: String, required: true },
	time: { type: String, required: true },
	user: {
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	used: { type: Boolean, default: false },
});

module.exports = mongoose.model('Ticket', TicketSchema);
