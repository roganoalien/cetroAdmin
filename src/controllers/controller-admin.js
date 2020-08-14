'use strict';

const passport = require('passport'),
	{ check, validationResult } = require('express-validator/check'),
	fs = require('fs');

const User = require('../models/model-user'),
	Event = require('../models/model-event'),
	Mirador = require('../models/model-mirador'),
	Datas = require('../models/model-analysis'),
	Spaces = require('../models/model-spaces');
const { type } = require('os');

module.exports = class Admin {
	rMessage(error, message, status, response) {
		return {
			error,
			message,
			status,
			response,
		};
	}

	removeLatinCharacters(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	customDeleter(Model, id, req, res, url) {
		Model.deleteOne({ _id: id }, function (err) {
			if (err) throw err;
			req.flash('success', '¡Elemento Eliminado!');
			res.redirect(url);
		});
	}

	DeleteUser(req, res) {
		const { id } = req.params;
		this.customDeleter(User, id, req, res, '/admin/usuarios');
	}

	DeleteEvent(req, res) {
		const { id } = req.params;
		this.customDeleter(Event, id, req, res, '/admin/eventos');
	}

	// customEditor(Model, id, res, template){

	// }

	async EditUser(req, res) {
		const { id } = req.params;
		const theUser = await User.findOne({ _id: id });
		res.render('admin/users/new-user', {
			title: `Editar ${theUser.name}`,
			userEdit: theUser,
		});
	}

	async EditEvent(req, res) {
		const { id } = req.params;
		const event = await Event.findOne({ _id: id });
		const users = await User.find();
		const spaces = await Spaces.find();
		const datas = await Datas.find();
		res.render('admin/events/regular-event', {
			title: `Editar ${event.name}`,
			event,
			users,
			spaces,
			datas,
		});
	}

	async ShowTickets(req, res) {
		const miradores = await Mirador.find();
		res.render('admin/mirador/mirador-boletos', {
			title: 'Boletos vendidos de Mirador',
			lookouts: miradores,
		});
	}

	async GetMiradorCalendar(req, res) {
		const miradores = await Mirador.find();
		const opEvents = [];
		miradores.forEach((item) => {
			const obj = {
				id: item._id,
				className: item.type.toLowerCase(),
				title: 'Mirador',
				start: `${item.date}T${item.time.start}`,
				end: `${item.date}T${item.time.end}`,
				url: `/admin/eventos/mirador/detalle/${item._id}`,
			};
			opEvents.push(obj);
		});
		res.render('admin/mirador/calendario-mirador', {
			title: 'Calendario | CETRO',
			events: opEvents,
		});
	}

	async GetCalendar(req, res) {
		const events = await Event.find();
		const miradores = await Mirador.find();
		const opEvents = [];
		events.forEach((item) => {
			const type = this.removeLatinCharacters(item.type);
			const obj = {
				id: item._id,
				className: type.toLowerCase(),
				title: item.name,
				start: `${item.date.start}T${item.time.start}`,
				end: `${item.date.end}T${item.time.end}`,
				url: `/admin/eventos/detalle/${item._id}`,
			};
			opEvents.push(obj);
		});
		miradores.forEach((item) => {
			const obj = {
				id: item._id,
				className: item.type.toLowerCase(),
				title: 'Mirador',
				start: `${item.date}T${item.time.start}`,
				end: `${item.date}T${item.time.end}`,
				url: `/admin/eventos/mirador/detalle/${item._id}`,
			};
			opEvents.push(obj);
		});
		res.render('admin/calendar/calendar', {
			title: 'Calendario | CETRO',
			events: opEvents,
		});
	}

	GetDashboard(req, res) {
		res.render('admin/dashboard', {
			title: 'Dashboard | CETRO',
		});
	}

	GetLogin(req, res) {
		res.render('open/login', {
			title: 'Iniciar Sesión',
		});
	}

	GetRegister(req, res) {
		res.render('open/register', {
			title: 'Registro de Usuario | CETRO',
		});
	}

	async GetUsers(req, res) {
		const users = await User.find();
		res.render('admin/users/users', {
			title: 'Usuarios | CETRO',
			users,
		});
	}

	async GetEvents(req, res) {
		const events = await Event.find();
		res.render('admin/events/events', {
			title: 'Eventos | CETRO',
			events,
		});
	}

	async DetailEvent(req, res) {
		const { id } = req.params;
		const event = await Event.findOne({ _id: id });
		res.render('admin/events/detail', {
			title: 'Detalle | CETRO',
			event,
		});
	}

	NewUser(req, res) {
		res.render('admin/users/new-user', {
			title: 'Agregar usuario | CETRO',
		});
	}

	async NewEvent(req, res) {
		// const users = await User.find().select('name');
		// const { date, time } = req.query;
		// console.log(date);
		res.render('admin/events/select-type', {
			title: 'Crear Evento | CETRO',
			// users,
			// dateQuery: date,
			// timeQuery: time,
		});
	}

	async NewEvent_regular(req, res) {
		const users = await User.find().select('name');
		// const datas = await Datas.find().select('name');
		const spaces = await Spaces.find();
		const { date, time } = req.query;
		console.log(date);
		res.render('admin/events/regular-event', {
			title: 'Crear Evento | CETRO',
			users,
			dateQuery: date,
			timeQuery: time,
			// datas,
			spaces,
		});
	}

	async MyEvents(req, res) {
		const events = await Event.find();
		res.render('admin/events/my-events', {
			title: 'Mis Eventos | CETRO',
			events,
		});
	}

	async SaveNewEvent(req, res) {
		const {
				name,
				date_init,
				time_init,
				date_end,
				time_end,
				type,
				classification,
				// status,
				responsable,
				space,
				services,
				// validation,
				comments,
				client_name,
				client_email,
				client_phone,
				mounting_date,
				mounting_time,
				unmounting_date,
				unmounting_time,
				price,
				advance_payment,
				capacity,
				vertical,
				// data_analysis,
				da_name,
				da_value,
				additional_spaces,
			} = req.body,
			eventCreated = await Event.findOne({ name }),
			resUser = await User.findOne({ _id: responsable });
		// myData = await Datas.findById({ _id: data_analysis });
		console.log('VALIDATION', typeof validation);
		if (eventCreated) {
			req.flash('error', '¡Ya existe un evento con el mismo nombre!');
			res.redirect('/admin/eventos/crear-evento');
		} else {
			// if (req.user.email === 'test@test.com') {
			// 	req.flash('error', 'No tienes permiso para crear usuarios');
			// 	res.redirect('/admin');
			// 	return false;
			// }
			const newEvent = new Event({
				name,
				date: {
					start: date_init,
					end: date_end,
					calendarEnd: date_end,
				},
				time: {
					start: time_init,
					end: time_end,
				},
				type,
				classification,
				// status,
				space,
				services,
				// validation: validation === 'on' ? true : false,
				comments,
				client: {
					name: client_name,
					email: client_email,
					phone: client_phone,
				},
				capacity,
				mounting: {
					date: mounting_date,
					time: mounting_time,
				},
				unmounting: {
					date: unmounting_date,
					time: unmounting_time,
				},
				price,
				advance_payment,
				vertical,
				data_analysis: {
					name: da_name,
					value: da_value,
				},
				additional_spaces,
			});
			newEvent.responsable._id = resUser._id;
			newEvent.responsable.name = `${resUser.name} ${
				resUser.lastname !== undefined ? resUser.lastname : ''
			}`;
			await newEvent.save();
			req.flash('success', '¡Evento Creado!');
			res.redirect('/admin/eventos');
		}
	}

	async SaveNewUser(req, res) {
		const {
				name,
				lastname,
				email,
				role,
				phone,
				position,
				password,
			} = req.body,
			emailUser = await User.findOne({ email }),
			errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render('admin/users/new-user', {
				title: 'Administrar Usuarios | CETRO',
				errors: errors.array(),
			});
		} else {
			if (req.user.email === 'test@test.com') {
				req.flash('error', 'No tienes permiso para crear usuarios');
				res.redirect('/admin');
				return false;
			}
			if (emailUser) {
				req.flash('error', '¡El email ya está registrado!');
				res.redirect('/admin/usuarios/crear-usuario');
			} else {
				const newUser = new User({ name, email });
				newUser.role = role;
				newUser.lastname = lastname;
				newUser.phone = phone;
				newUser.position = position;
				newUser.password = await newUser.encryptPassword(password);
				await newUser.save();
				req.flash('success', '¡Registro Completado!');
				res.redirect('/admin/usuarios');
			}
		}
	}

	async UpdateEvent(req, res) {
		const { id } = req.params,
			{
				name,
				date_init,
				date_end,
				time_init,
				time_end,
				type,
				classification,
				status,
				responsable,
				space,
				services,
				comments,
				da_name,
				da_value,
				client_name,
				client_email,
				client_phone,
				mounting_date,
				mounting_time,
				unmounting_date,
				unmounting_time,
				price,
				advance_payment,
				capacity,
				vertical,
				// data_analysis,
				additional_spaces,
			} = req.body,
			resUser = await User.findOne({ _id: responsable });
		await Event.updateOne(
			{ _id: id },
			{
				name,
				date: {
					start: date_init,
					end: date_end,
					calendarEnd: date_end,
				},
				time: {
					start: time_init,
					end: time_end,
				},
				type,
				classification,
				status,
				space,
				services,
				comments,
				responsable: {
					_id: resUser._id,
					name: `${resUser.name} ${
						resUser.lastname !== undefined ? resUser.lastname : ''
					}`,
				},
				data_analysis: {
					name: da_name,
					value: da_value,
				},
				client: {
					name: client_name,
					email: client_email,
					phone: client_phone,
				},
				capacity,
				mounting: {
					date: mounting_date,
					time: mounting_time,
				},
				unmounting: {
					date: unmounting_date,
					time: unmounting_time,
				},
				price,
				advance_payment,
				vertical,
				additional_spaces,
			}
		);
		res.redirect('/admin/eventos');
	}

	async UpdateUser(req, res) {
		const { name, lastname, email, role, phone, position } = req.body;
		const { id } = req.params;
		await User.updateOne(
			{ _id: id },
			{ name, lastname, email, role, phone, position }
		);
		res.redirect('/admin/usuarios');
	}

	async RequestRegister(req, res) {
		const { name, email, password } = req.body,
			emailUser = await User.findOne({ email }),
			errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render('open/register', {
				title: 'Registro de Usuario | CETRO',
				errors: errors.array(),
			});
		} else {
			if (emailUser) {
				req.flash('error', '¡El email ya está registrado!');
				res.redirect('/registro');
			} else {
				const newUser = new User({ name, email });
				newUser.password = await newUser.encryptPassword(password);
				await newUser.save();
				req.flash('success', '¡Registro Completado!');
				res.redirect('/');
			}
		}
	}
};

module.exports.loginValidate = passport.authenticate('local', {
	successFlash: '¡Sesión Iniciada!',
	successRedirect: '/admin',
	failureFlash: '¡Email y/o Password incorrecto!',
	failureRedirect: '/',
});

module.exports.validator = [
	check('name')
		.isLength({ min: 4 })
		.withMessage('El nombre debe de tener mínimo 4 carácteres'),
	check('email')
		.not()
		.isEmpty()
		.withMessage('Se debe de elegir un correo')
		.isEmail()
		.withMessage('El correo debe de ser uno válido'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('La contraseña debe de tener al menos 8 carácteres')
		.matches('[0-9]')
		.withMessage('La contraseña debe de tener mínimo un número')
		.matches('[a-z]')
		.withMessage('La contraseña debe de tener mínimo una minúscula')
		.matches('[A-Z]')
		.withMessage('La contraseña debe de tener mínimo una mayúscula'),
	check('password').custom((value, { req }) => {
		if (value !== req.body.confirmPassword) {
			throw new Error('¡Las contraseñas no coinciden!');
		} else {
			return value;
		}
	}),
];
