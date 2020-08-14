const moment = require('moment');
// const Lookout = require('../models/model-lookout-deleted');
const Mirador = require('../models/model-mirador');

const createTwoWeeks = () => {
	const array = [moment().format('YYYY-MM-DD')];
	for (let i = 0; i < 14; i++) {
		array.push(
			moment()
				.add(i + 1, 'days')
				.format('YYYY-MM-DD')
		);
	}
	return array;
};

const compareArrays = (array1, array2) => {
	for (let i = 0; i < array2.length; i++) {
		const index = array1.indexOf(array2[i].date);
		if (index > -1) {
			array1.splice(index, 1);
		}
	}
	console.log('ARRAY 1', array1);
	console.log('ARRAY 2', array2);
	return array1;
};

const createObjectEvent = (id, className, title, date, url) => {
	const myObj = {
		id,
		className,
		title,
		start: `${date}T09:00:00`,
		end: `${date}T22:00:00`,
		url,
	};
	return myObj;
};

const createFilteredCalendar = (filtered) => {
	const newArray = [];
	filtered.forEach((item, index) => {
		const toPush = createObjectEvent(
			index,
			'mirador',
			'Mirador',
			item,
			'/admin/mirador'
		);
		newArray.push(toPush);
	});
	return newArray;
};

const createDeletedCalendar = (deleted) => {
	const newArray = [];
	deleted.forEach((item) => {
		const toPush = createObjectEvent(
			item._id,
			'no-mirador',
			'Sin Mirador',
			item.date,
			`/admin/mirador/remover/${item._id}`
		);
		newArray.push(toPush);
	});
	return newArray;
};

const createSingleArray = (filtered, deleted) => {
	deleted.forEach((item) => {
		filtered.push(item);
	});
	return filtered;
};

const getLookout = async (req, res) => {
	// Obtenemos las fechas eliminadas del mirador
	const deletedDates = await Mirador.find();
	// Creamos las dos semanas de eventos del mirador
	const arrayOfDates = createTwoWeeks();
	// Obtenemos arreglo de las fechas filtradas
	const filteredArray = compareArrays(arrayOfDates, deletedDates);
	// Obtenemos arreglo con los objetos de eventos de las fechas filtradas
	const finalFiltered = createFilteredCalendar(filteredArray);
	// Obtenemos arreglo con los objetos de eventos de las fechas eliminadas
	const finalDeleted = createDeletedCalendar(deletedDates);
	// Obtenemos un solo arreglo con todos los objetos de los eventos creados
	const singleArray = createSingleArray(finalFiltered, finalDeleted);
	res.render('admin/lookout/all-lookout', {
		events: singleArray,
	});
};

// const removeLookout = (req, res) => {
// 	res.render('admin/lookout/delete-lookout');
// };

const saveRemoveLookout = async (req, res) => {
	const { dates, time_start, time_end, entrance, valid, capacity } = req.body;
	const datesArray = dates.split(', ').sort();
	console.log(time_start, time_end);
	let hours =
		parseInt(time_start.replace(':00', ''), 10) -
		parseInt(time_end.replace(':00', ''), 10);
	hours = hours < 0 ? hours * -1 : hours === 0 ? 23 : hours;
	console.log(hours);
	// console.log(typeof datesArray, datesArray.sort());
	const lookout = await Mirador.find({ date: { $in: datesArray } });
	console.log(lookout, lookout.length);
	if (lookout.length > 0) {
		req.flash('error', '¡Ya existen eventos en esas fechas!');
		res.redirect('/admin/eventos/mirador/crear');
	} else {
		for (let i = 0; i < datesArray.length; i++) {
			const ticketsArray = [];
			for (let j = 0; j < hours + 1; j++) {
				const time = parseInt(time_start.replace(':00', ''), 10) + j;
				const ticketObject = {
					time: time < 10 ? `0${time}:00` : `${time}:00`,
					capacity,
					sold: 0,
				};
				ticketsArray.push(ticketObject);
			}
			const newLookout = new Mirador({
				date: datesArray[i],
				time: {
					start: time_start,
					end: time_end,
				},
				rules: {
					entrance,
					validFor: valid,
					capacity,
				},
				tickets: ticketsArray,
			});
			await newLookout.save();
		}
		req.flash('success', '¡Mirador/es creado/s!');
		res.redirect('/admin/calendario');
	}
};

const editLookout = async (req, res) => {
	const { id } = req.params;
	const lookout = await Mirador.find({ _id: id });
	res.render('admin/events/mirador-event', {
		lookout: lookout[0],
	});
};

const updateLookout = async (req, res) => {
	const { id } = req.params;
	const { dates, time_start, time_end, entrance, valid, capacity } = req.body;
	await Mirador.updateOne(
		{ _id: id },
		{
			date: dates,
			time: {
				start: time_start,
				end: time_end,
			},
			rules: {
				entrance,
				validFor: valid,
				capacity,
			},
		}
	);
	res.redirect('/admin/calendario');
};

const removedLookouts = async (req, res) => {
	// const lookout = await Lookout.find();
	res.render('admin/events/mirador-event', {
		title: 'Agregar Mirador',
	});
};

const customDeleter = (Model, id, req, res, url) => {
	Model.deleteOne({ _id: id }, function (err) {
		if (err) throw err;
		req.flash('success', '¡Elemento Eliminado!');
		res.redirect(url);
	});
};

const deleteLookout = async (req, res) => {
	const { id } = req.params;
	customDeleter(Mirador, id, req, res, '/admin/mirador/fechas-removidas');
};

const lookoutDetail = async (req, res) => {
	const { id } = req.params;
	const mirador = await Mirador.findOne({ _id: id });
	res.render('admin/events/mirador-detalle', {
		title: 'Detalle | CETRO',
		event: mirador,
	});
};

exports.getLookout = getLookout;
// exports.removeLookout = removeLookout;
exports.lookoutDetail = lookoutDetail;
exports.saveRemoveLookout = saveRemoveLookout;
exports.editLookout = editLookout;
exports.removedLookouts = removedLookouts;
exports.deleteLookout = deleteLookout;
exports.updateLookout = updateLookout;
