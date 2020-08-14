const express = require('express'),
	router = express.Router();

const downloadController = require('../controllers/controller-download'),
	Utils = require('../utils/util-class'),
	util = new Utils();

router
	.route('/admin/download/events')
	.get(util.isAuthenticated, downloadController.downloadEvents);
router
	.route('/admin/download/miradores')
	.get(util.isAuthenticated, downloadController.downloadMirador);
router
	.route('/admin/download/usuarios')
	.get(util.isAuthenticated, downloadController.downloadUsers);
router
	.route('/admin/download/cupones')
	.get(util.isAuthenticated, downloadController.downloadCupones);

module.exports = router;
