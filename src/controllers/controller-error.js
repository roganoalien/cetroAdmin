'use strict';

module.exports = class CustomError {
	Default(req, res) {
		res.status(404).json({
			error: 404,
			message: '¡Parece que solicitó una URL no válida!',
			status: 404,
			response: {
				text: '¡Por favor intenta con otra URL!',
			},
		});
	}
};
