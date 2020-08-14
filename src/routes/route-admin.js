const express = require('express'),
	router = express.Router();

const Admin = require('../controllers/controller-admin'),
	{ validator, loginValidate } = require('../controllers/controller-admin'),
	controller = new Admin(),
	{
		getLookout,
		lookoutDetail,
		saveRemoveLookout,
		editLookout,
		removedLookouts,
		updateLookout,
		deleteLookout,
	} = require('../controllers/controller-lookout'),
	Utils = require('../utils/util-class'),
	util = new Utils();

router.route('/').get(controller.GetLogin.bind(controller));
router.route('/login').post(loginValidate);
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', '¡Sesión Cerrada!');
	res.redirect('/');
});
router
	.route('/registro')
	.get(controller.GetRegister.bind(controller))
	.post(validator, controller.RequestRegister.bind(controller));
router
	.route('/admin')
	.get(util.isAuthenticated, controller.GetDashboard.bind(controller));
router
	.route('/admin/usuarios')
	.get(util.isAuthenticated, controller.GetUsers.bind(controller));
router
	.route('/admin/eventos')
	.get(util.isAuthenticated, controller.GetEvents.bind(controller));
router
	.route('/admin/calendario')
	.get(util.isAuthenticated, controller.GetCalendar.bind(controller));
router
	.route('/admin/mirador/calendario')
	.get(util.isAuthenticated, controller.GetMiradorCalendar.bind(controller));
router
	.route('/admin/mirador/boletos')
	.get(util.isAuthenticated, controller.ShowTickets);
router.route('/admin/mirador').get(util.isAuthenticated, getLookout);
router
	.route('/admin/mirador/agregar')
	.get(util.isAuthenticated, removedLookouts);
router
	.route('/admin/usuarios/crear-usuario')
	.get(util.isAuthenticated, controller.NewUser.bind(controller))
	.post(
		validator,
		util.isAuthenticated,
		controller.SaveNewUser.bind(controller)
	);
router
	.route('/admin/eventos/crear-evento')
	.get(util.isAuthenticated, controller.NewEvent.bind(controller));
router
	.route('/admin/eventos/mirador/crear')
	.get(util.isAuthenticated, removedLookouts)
	.post(util.isAuthenticated, saveRemoveLookout);
router
	.route('/admin/eventos/regular/crear')
	.get(util.isAuthenticated, controller.NewEvent_regular)
	.post(util.isAuthenticated, controller.SaveNewEvent);
router
	.route('/admin/eventos/detalle/:id')
	.get(util.isAuthenticated, controller.DetailEvent);
router
	.route('/admin/eventos/mirador/detalle/:id')
	.get(util.isAuthenticated, lookoutDetail);
router
	.route('/admin/usuarios/editar/:id')
	.get(util.isAuthenticated, controller.EditUser.bind(controller))
	.post(util.isAuthenticated, controller.UpdateUser.bind(controller));
router
	.route('/admin/eventos/regular/editar/:id')
	.get(util.isAuthenticated, controller.EditEvent.bind(controller))
	.post(util.isAuthenticated, controller.UpdateEvent.bind(controller));
router
	.route('/admin/eventos/mirador/editar/:id')
	.get(util.isAuthenticated, editLookout)
	.post(util.isAuthenticated, updateLookout);
router
	.route('/admin/mirador/remover/:id')
	.get(util.isAuthenticated, editLookout);
// Eliminar elementos
router
	.route('/admin/usuarios/eliminar/:id')
	.get(util.isAuthenticated, controller.DeleteUser.bind(controller));
router
	.route('/admin/eventos/regular/eliminar/:id')
	.get(util.isAuthenticated, controller.DeleteEvent.bind(controller));
router
	.route('/admin/mirador/eliminar/:id')
	.get(util.isAuthenticated, deleteLookout);
router
	.route('/admin/eventos/mis-eventos')
	.get(util.isAuthenticated, controller.MyEvents.bind(controller));

module.exports = router;
