var mongoose = require('mongoose');

module.exports = mongoose.model('Round', {
	caseId: {type: String, required: true},
	date: {type: String, required : false},
	gov : {type: String, required : true },
	opp : {type: String, required : false },
	pmSpeaks : {type: String, required : false },
	loSpeaks : {type: String, required : false },
	mgSpeaks : {type: String, required : false },
	moSpeaks : {type: String, required : false },
	winner : {type: String, required : false },
	reason : {type: String, required : false },
	notes : {type: String, required : false }
});