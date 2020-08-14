// Usuario con acceso al backend
const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	{ Schema } = mongoose;

const AdminSchema = new Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: 'admin' },
	lastname: { type: String },
	phone: { type: String },
	position: { type: String },
});
// Cifrar contraseña
AdminSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};
// Descifrar contraseña
AdminSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);
