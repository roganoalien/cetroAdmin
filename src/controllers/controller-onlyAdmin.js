const moment = require('moment');

const Events = require('../models/model-event'),
	Brands = require('../models/model-marca'),
	Promos = require('../models/model-promo'),
	Datas = require('../models/model-analysis'),
	Spaces = require('../models/model-spaces');

const getAprobarEventos = async (req, res) => {
	const events = await Events.find({ status: 'Sin aprobación' });
	console.log(events);
	res.render('admin/onlyAdmin/aprobar-eventos', {
		title: 'Aprobar Eventos',
		events,
	});
};

const updateEventStatus = (req, res, status, id, message) => {
	Events.findByIdAndUpdate({ _id: id }, { status }, (err) => {
		if (err) throw err;
		req.flash('success', message);
		res.redirect('/admin/aprobar-eventos');
	});
};

const aprobarEvento = (req, res) => {
	const { id } = req.params;
	updateEventStatus(req, res, 'Reservado', id, '¡El evento fue aprobado!');
};

const rechazarEvento = (req, res) => {
	const { id } = req.params;
	updateEventStatus(req, res, 'Rechazado', id, '¡El evento fue rechazado!');
};

const verMarcas = async (req, res) => {
	const brands = await Brands.find();
	res.render('admin/onlyAdmin/marcas', {
		title: 'Marcas',
		brands,
	});
};

const genericGet = (res, template, title) => {
	res.render(template, {
		title,
	});
};

const guardarMarca = (req, res) => {
	const { name, description } = req.body;
	if (!req.files || Object.keys(req.files).length === 0) {
		req.flash('error', 'No se subió ninguna imagen');
		return res.status(400).redirect('/admin/marcas/crear');
	}
	const myImage = req.files.image;
	myImage.mv(`public/uploads/brands/${myImage.name}`, async (err) => {
		if (err) return res.status(500).send(err);
		const newBrand = new Brands({
			name,
			description,
			image: {
				url: `/public/uploads/brands/${myImage.name}`,
			},
		});
		await newBrand.save();
		req.flash('success', '¡Marca creada!');
		res.redirect('/admin/marcas');
	});
};

const editarMarca = async (req, res) => {
	const { id } = req.params;
	const brand = await Brands.findById({ _id: id });
	res.render('admin/onlyAdmin/marca-crear', {
		title: `Editar ${brand.name}`,
		brand,
	});
};

const eliminarMarca = (req, res) => {
	const { id } = req.params;
	Brands.findByIdAndDelete({ _id: id }, (err) => {
		if (err) throw err;
		req.flash('success', '¡La marca se eliminó!');
		res.redirect('/admin/marcas');
	});
};

const crearCupon = async (req, res) => {
	const {
		title,
		discount,
		description,
		valid_until,
		brand,
		keywords,
	} = req.body;
	const theBrand = await Brands.findById({ _id: brand });
	const newPromo = new Promos({
		title,
		discount,
		description,
		valid_until,
		brand: theBrand,
		keywords,
	});
	await newPromo.save();
	req.flash('success', '¡Cupón creado!');
	res.redirect('/admin/cupones');
};

const crearCuponGet = async (req, res) => {
	const brands = await Brands.find();
	res.render('admin/onlyAdmin/cupones-crear', {
		brands,
		title: 'Crear Cupón',
	});
};

const cupones = async (req, res) => {
	const promos = await Promos.find();
	res.render('admin/onlyAdmin/cupones', {
		title: 'Todos los cupones',
		promos,
	});
};

const eliminarCupon = (req, res) => {
	const { id } = req.params;
	Promos.findByIdAndDelete({ _id: id }, (err) => {
		if (err) throw err;
		req.flash('success', '¡Cupón eliminado!');
		res.redirect('/admin/cupones');
	});
};

const getEditarCupon = async (req, res) => {
	const { id } = req.params;
	const promo = await Promos.findById({ _id: id });
	const brands = await Brands.find();
	res.render('admin/onlyAdmin/cupones-crear', {
		title: 'Editar Cupón',
		promo,
		brands,
	});
};

const postEditarCupon = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		discount,
		description,
		valid_until,
		brand,
		keywords,
	} = req.body;
	const theBrand = await Brands.findById({ _id: brand });
	Promos.findByIdAndUpdate(
		{ _id: id },
		{
			title,
			discount,
			description,
			valid_until,
			brand: theBrand,
			keywords,
		},
		(err) => {
			if (err) throw err;
			req.flash('success', '¡El cupón se actualizó');
			res.redirect('/admin/cupones');
		}
	);
};

// CUSTOMS
const getAnalysis = async (req, res) => {
	const datas = await Datas.find();
	res.render('admin/custom/analysis', {
		title: 'Data Analysis',
		datas,
	});
};
const postAnalysis = async (req, res) => {
	const { name, value } = req.body;
	const data = new Datas({
		name,
		value,
	});
	await data.save();
	req.flash('success', '¡Se creó el Data Analysis!');
	res.redirect('/admin/custom/analysis');
};
const deleteAnalysis = async (req, res) => {
	const { id } = req.params;
	Datas.findByIdAndDelete({ _id: id }, (err) => {
		if (err) throw err;
		req.flash('success', '¡Se eliminó el Data Analysis!');
		res.redirect('/admin/custom/analysis');
	});
};
const getSpaces = async (req, res) => {
	const spaces = await Spaces.find();
	res.render('admin/custom/espacios', {
		title: 'Espacios Adicionales',
		spaces,
	});
};
const postSpaces = async (req, res) => {
	const { name } = req.body;
	const space = new Spaces({
		name,
	});
	await space.save();
	req.flash('success', '¡Se creó el Espacio Adicional!');
	res.redirect('/admin/custom/espacios');
};
const deleteSpaces = async (req, res) => {
	const { id } = req.params;
	Spaces.findByIdAndDelete({ _id: id }, (err) => {
		if (err) throw err;
		req.flash('success', '¡Se eliminó el Espacio Adicional!');
		res.redirect('/admin/custom/espacios');
	});
};

const cuponDetalle = async (req, res) => {
	const { id } = req.params;
	const promo = await Promos.findById({ _id: id });
	const today = moment(new Date());
	const valid = moment(promo.valid_until);
	const isValid = valid.diff(today, 'days');
	res.render('admin/onlyAdmin/cupon-detail', {
		title: `Cupon ${id} | CETRO`,
		promo,
		vigente: isValid > 0 ? true : false,
	});
};

exports.getAprobarEventos = getAprobarEventos;
exports.aprobarEvento = aprobarEvento;
exports.rechazarEvento = rechazarEvento;
exports.verMarcas = verMarcas;
exports.genericGet = genericGet;
exports.guardarMarca = guardarMarca;
exports.editarMarca = editarMarca;
exports.eliminarMarca = eliminarMarca;
exports.crearCuponGet = crearCuponGet;
exports.crearCupon = crearCupon;
exports.cupones = cupones;
exports.cuponDetalle = cuponDetalle;
exports.eliminarCupon = eliminarCupon;
exports.getEditarCupon = getEditarCupon;
exports.postEditarCupon = postEditarCupon;
//CUSTOMS
exports.getAnalysis = getAnalysis;
exports.postAnalysis = postAnalysis;
exports.deleteAnalysis = deleteAnalysis;
exports.getSpaces = getSpaces;
exports.postSpaces = postSpaces;
exports.deleteSpaces = deleteSpaces;
