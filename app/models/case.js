var mongoose = require('mongoose');

module.exports = mongoose.model('Case', {
	creatorID : {type: String, required : true },
	name : {type: String, required : true},
	wins : {type: String, required : false },
	losses : {type: String, required : false },
	category : {type: String, required : false },
	description : {type: String, required : false },
	text : {type: String, required : false },
	open : {type: Boolean, required: true},
	userAccessIDs: {type: Array, required: false}
});