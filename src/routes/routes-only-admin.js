const express = require('express'),
	router = express.Router();

const Utils = require('../utils/util-class'),
	util = new Utils(),
	oAdminController = require('../controllers/controller-onlyAdmin');

router
	.route('/admin/aprobar-eventos')
	.get(util.isAdmin, oAdminController.getAprobarEventos);
router
	.route('/admin/eventos/aprobar/:id')
	.get(util.isAdmin, oAdminController.aprobarEvento);
router
	.route('/admin/eventos/rechazar/:id')
	.get(util.isAdmin, oAdminController.rechazarEvento);
router.route('/admin/marcas').get(util.isAdmin, oAdminController.verMarcas);
router
	.route('/admin/marcas/crear')
	.get(util.isAdmin, (req, res) => {
		oAdminController.genericGet(
			res,
			'admin/onlyAdmin/marca-crear',
			'Crear Marca'
		);
	})
	.post(util.isAdmin, oAdminController.guardarMarca);
router
	.route('/admin/marcas/eliminar/:id')
	.get(util.isAdmin, oAdminController.eliminarMarca);
router.route('/admin/cupones').get(util.isAdmin, oAdminController.cupones);
router
	.route('/admin/cupones/crear')
	.get(util.isAdmin, oAdminController.crearCuponGet)
	.post(util.isAdmin, oAdminController.crearCupon);
router
	.route('/admin/cupones/eliminar/:id')
	.get(util.isAdmin, oAdminController.eliminarCupon);
router
	.route('/admin/cupones/editar/:id')
	.get(util.isAdmin, oAdminController.getEditarCupon)
	.post(util.isAdmin, oAdminController.postEditarCupon);
router
	.route('/admin/cupones/detalle/:id')
	.get(util.isAdmin, oAdminController.cuponDetalle);
router
	.route('/admin/custom/analysis')
	.get(util.isAdmin, oAdminController.getAnalysis)
	.post(util.isAdmin, oAdminController.postAnalysis);
router
	.route('/admin/custom/analysis/eliminar/:id')
	.get(util.isAdmin, oAdminController.deleteAnalysis);
router
	.route('/admin/custom/espacios')
	.get(util.isAdmin, oAdminController.getSpaces)
	.post(util.isAdmin, oAdminController.postSpaces);
router
	.route('/admin/custom/spaces/eliminar/:id')
	.get(util.isAdmin, oAdminController.deleteSpaces);

module.exports = router;
