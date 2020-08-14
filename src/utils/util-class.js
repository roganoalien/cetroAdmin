'use strict';

module.exports = class Utils {
	globalAuthnticated(req, res) {
		if (req.isAuthenticated()) {
			return true;
		} else {
			req.flash('error', '¡Necesitas iniciar sesión para acceder!');
			res.redirect('/');
		}
	}

	isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			req.flash('error', '¡Necesitas iniciar sesión para acceder!');
			res.redirect('/');
		}
	}

	isAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.role === 'admin') {
			return next();
		} else {
			req.flash('error', '¡No tienes los permisos necesarios!');
			res.redirect('/admin');
		}
	}
};
