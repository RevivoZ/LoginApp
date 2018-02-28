var express = require('express');
var router = express.Router();
var User = require('../models/user');



// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
	User.getAllUsers(function (err, users) {
		if (err) throw err;
		res.render('index', {
			accounts: users
		});
	});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
}


module.exports = router;
