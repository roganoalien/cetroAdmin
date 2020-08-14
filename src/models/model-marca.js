const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const BrandSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	image: {
		url: { type: String, required: true },
	},
});

module.exports = mongoose.model('Brand', BrandSchema);
