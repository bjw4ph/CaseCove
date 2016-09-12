var Todo = require('./models/todo');
var Case = require('./models/case');
var User = require('./models/user');
var Round = require('./models/round');
var passport = require('passport');
var jwt = require('express-jwt');

require('../config/passport');



module.exports = function(app) {

	var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

	app.use(passport.initialize());

	app.get('/login', function(req,res){
		res.render('login.ejs');
	});

	app.get('/register', function(req,res){
		res.render('register.ejs');
	})
	
	app.post('/register', function(req, res, next){
	  if(!req.body.username || !req.body.password){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  var user = new User();

	  user.username = req.body.username;

	  user.setPassword(req.body.password)

	  user.save(function (err){
	    if(err){ return next(err); }

	    return res.json({token: user.generateJWT()})
	  });
	});

	app.post('/login', function(req, res, next){
	  if(!req.body.username || !req.body.password){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  passport.authenticate('local', function(err, user, info){
	    if(err){ return next(err); }

	    if(user){
	      return res.json({token: user.generateJWT()});
	    } else {
	      return res.status(401).json(info);
	    }
	  })(req, res, next);
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

	app.post('/addCase', auth, function(req,res){
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

	app.post('/addRound', auth, function(req,res){
		var RoundObject = {
			'caseId' : req.payload._id,
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

	app.get('/roundInfo/:roundId', function(req, res){
		Round.find({'_id': req.params.roundId}, function(error,results){
			res.json({roundInfo: results});
		});
	})

	app.get('/round/:roundId', function(req,res){
		res.render('round.ejs',{
			roundId: req.params.roundId
		});
	})


	
};