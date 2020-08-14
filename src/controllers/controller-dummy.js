const Users = require('../fakeData/users'),
	Events = require('../fakeData/events'),
	Promos = require('../fakeData/promos');

const metadata = {
	name: 'CETRO dummy API',
	version: '0.1',
};

const root = (req, res) => {
	res.status(200).json({
		status: 200,
		message: '¡Bienvenido al API beta del administrador de CETRO!',
		content:
			'Todo el contenido expuesto en este API es falso y solo usado como muestra del tipo de contenido que puede tener',
		restrictions:
			'Por el momento no se permiten peticiones de tipo POST, DELETE, PUT, PATCH ya que solo es contenido de muestra y no se han creado al 100% todos los SCHEMAS de la base de datos.',
		metadata,
		other_endPoints: {
			all_users: {
				URL: 'https://cetro.techarmy.mx/api/0.1/users',
				type: 'GET',
				response: 'Arreglo de objetos',
			},
			one_user: {
				URL: 'https://cetro.techarmy.mx/api/0.1/users/:id',
				type: 'GET',
				response: 'Object',
			},
			all_events: {
				URL: 'https://cetro.techarmy.mx/api/0.1/events',
				type: 'GET',
				response: 'Arreglo de objetos',
			},
			one_event: {
				URL: 'https://cetro.techarmy.mx/api/0.1/events/:id',
				type: 'GET',
				response: 'Object',
			},
			all_promos: {
				URL: 'https://cetro.techarmy.mx/api/0.1/promos',
				type: 'GET',
				response: 'Arreglo de objetos',
			},
			one_promo: {
				URL: 'https://cetro.techarmy.mx/api/0.1/promos/:id',
				type: 'GET',
				response: 'Object',
			},
		},
	});
};

const users = (req, res) => {
	res.status(200).json({
		status: 200,
		metadata,
		users: Users.users,
	});
};
const events = (req, res) => {
	res.status(200).json({
		status: 200,
		metadata,
		events: Events.events,
	});
};

const filterData = (id, data) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === id) {
			return data[i];
		}
	}
	return null;
};

const one_user = (req, res) => {
	const { id } = req.params;
	console.log(id);
	const theUser = filterData(id, Users.users_data);
	if (theUser) {
		res.status(200).json({
			status: 200,
			metadata,
			user: theUser,
		});
	} else {
		res.status(400).json({
			status: 400,
			metadata,
			error: 'That user does not exist!',
		});
	}
};

const one_event = (req, res) => {
	const { id } = req.params;
	console.log(id);
	const theEvent = filterData(id, Events.events_data);
	if (theEvent) {
		res.status(200).json({
			status: 200,
			metadata,
			event: theEvent,
		});
	} else {
		res.status(400).json({
			status: 400,
			metadata,
			error: 'That event does not exist!',
		});
	}
};

const promos = (req, res) => {
	res.status(200).json({
		status: 200,
		metadata,
		promos: Promos.promos,
	});
};

const one_promo = (req, res) => {
	const { id } = req.params;
	console.log(id);
	const thePromos = filterData(id, Promos.promos_data);
	if (thePromos) {
		res.status(200).json({
			status: 200,
			metadata,
			promos: thePromos,
		});
	} else {
		res.status(400).json({
			status: 400,
			metadata,
			error: 'That user does not exist!',
		});
	}
};

exports.root = root;
exports.getUsers = users;
exports.getPromos = promos;
exports.getOneUser = one_user;
exports.getEvents = events;
exports.getOneEvent = one_event;
exports.getOnePromo = one_promo;
