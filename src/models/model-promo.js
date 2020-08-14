const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const PromoSchema = new Schema({
	title: { type: String, required: true },
	discount: { type: String, required: true },
	description: { type: String, required: true },
	valid_until: { type: String, required: true },
	brand: { type: Object, required: true },
	keywords: { type: Array, required: true },
});

module.exports = mongoose.model('Promo', PromoSchema);
