var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.getAllUsers = function (callback) {
	var query = {};
	User.find(query, callback);
}

module.exports.getUserByUsername = function (username, callback) {
	var query = {
		username: username
	};
	User.findOne(query, callback);
}

module.exports.RemoveUserByUsername = function (account, callback) {
	User.remove({
		username: account
	}, function (err) {
		if (err) return handleError(err);
	});
}

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

module.exports.updateUser = function (user, callback) {
	User.findById(user.id, function (err, acc) {
		if (err) return handleError(err);

		acc.name = user.name;
		acc.email = user.email;
		acc.password = user.password;
		acc.save();
	});
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}
