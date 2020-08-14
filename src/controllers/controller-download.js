const User = require('../models/model-user'),
	Event = require('../models/model-event'),
	Mirador = require('../models/model-mirador'),
	Promos = require('../models/model-promo');

const csv = require('csv-express'),
	moment = require('moment');

const downloadEvents = (req, res) => {
	// const events = await Event.find();
	const date = moment().format('DD_MM_YYYY');
	const filename = `cetro_eventos_${date}.csv`;
	Event.find()
		.lean()
		.exec({}, function (err, events) {
			if (err) res.send(err);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${filename}`
			);
			res.csv(events, true);
		});
};

const downloadMirador = (req, res) => {
	const date = moment().format('DD_MM_YYYY');
	const filename = `cetro_miradores_${date}.csv`;
	Mirador.find()
		.lean()
		.exec({}, function (err, miradores) {
			if (err) res.send(err);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${filename}`
			);
			res.csv(miradores, true);
		});
};

const downloadUsers = (req, res) => {
	const date = moment().format('DD_MM_YYYY');
	const filename = `cetro_usuarios_${date}.csv`;
	User.find()
		.lean()
		.exec({}, function (err, users) {
			if (err) res.send(err);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${filename}`
			);
			res.csv(users, true);
		});
};

const downloadCupones = (req, res) => {
	const date = moment().format('DD_MM_YYYY');
	const filename = `cetro_cupones_${date}.csv`;
	Promos.find()
		.lean()
		.exec({}, function (err, promos) {
			if (err) res.send(err);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/csv');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${filename}`
			);
			res.csv(promos, true);
		});
};

exports.downloadEvents = downloadEvents;
exports.downloadMirador = downloadMirador;
exports.downloadUsers = downloadUsers;
exports.downloadCupones = downloadCupones;
