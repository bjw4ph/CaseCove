var Todo = require('./models/todo');
var Case = require('./models/case');
var User = require('./models/user');
var Round = require('./models/round');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	

	// application -------------------------------------------------------------
	app.get('/random', function(req,res){
		console.log("Made It");
		res.render('home.ejs');
	});

	app.get('/', function(req, res) {
		console.log("The get request");
		res.render('home.ejs'); // load the single view file (angular will handle the page changes on the front-end)
	});
	app.get('/addCase', function(req,res){
		res.render('addCase.ejs');
	})

	app.get('/getCases', function(req, res){
		console.log("called getCases");
		Case.find(function(error, results){
			res.json({results: results});
		})
	})

	app.post('/addCase', function(req,res){
		var CaseObject = {
			'creatorID' : req.body.creatorID,
			'name' : req.body.name,
			'wins' : req.body.wins,
			'losses' : req.body.losses,
			'category' : req.body.category,
			'description' : req.body.description,
			'text' : req.body.text,
			'open' : req.body.open
		};

		var newcase = new Case(CaseObject);
		newcase.save(function(error, title){
			console.log('Data');
			console.log(title);
		});
		res.json({message: "You Did it"});
	});

	app.get('/case/:caseId', function(req,res){
		res.render('case.ejs', {
				'caseId' : req.params.caseId
		})
	})

	app.get('/caseInfo/:caseId', function(req, res){
		Case.find({'_id': req.params.caseId}, function(error, results){
			res.json({caseInfo: results[0]});
		});
	});

	app.get('/caseRounds/:caseId', function(req,res){
		Round.find({'caseId': req.params.caseId}, function(error, results){
			res.json({rounds: results});
		});
	})

	app.post('/addRound', function(req,res){
		var RoundObject = {
			'caseId' : req.body.caseId,
			'date' : req.body.date,
			'gov' : req.body.gov,
			'opp' : req.body.opp,
			'pmSpeaks' : req.body.pmSpeaks,
			'loSpeaks' : req.body.loSpeaks,
			'mgSpeaks' : req.body.mgSpeaks,
			'moSpeaks' : req.body.moSpeaks,
			'winner' : req.body.winner,
			'reason' : req.body.reason,
			'notes' : req.body.notes
		}

		var newRound = new Round(RoundObject);
		console.log(newRound);
		newRound.save(function(error, title){
			if(error){
				console.log("Error " + error);
			} else {
				console.log(title);
			}
		})
		res.json({message: "Great Job"});
	})

	app.get('/addRound', function(req,res){
		res.render('addRound.ejs',{
			caseId: ''
		});
	});

	app.get('/addRound/:caseId', function(req,res){
		res.render('addRound.ejs',{
			caseId: req.params.caseId
		});
	});


	
};