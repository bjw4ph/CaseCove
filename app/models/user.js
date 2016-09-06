var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username : {type: String, required : true },
	firstName : {type: String, required : true},
	lastName : {type: String, required : true},
	email : {type: String, required : true},
	school : {type: String, required : true}
});