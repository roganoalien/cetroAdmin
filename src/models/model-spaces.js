const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const SpacesSchema = new Schema({
	name: { type: String, required: true },
});

module.exports = mongoose.model('Space', SpacesSchema);
