const express = require('express'),
	router = express.Router(),
	dummy = require('../controllers/controller-dummy');

router.get('/', dummy.root);
router.get('/users', dummy.getUsers);
router.get('/users/:id', dummy.getOneUser);
router.get('/events', dummy.getEvents);
router.get('/events/:id', dummy.getOneEvent);
router.get('/promos', dummy.getPromos);
router.get('/promos/:id', dummy.getOnePromo);

module.exports = router;
