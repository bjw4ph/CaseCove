var Todo = require('./models/todo');
var Case = require('./models/case');
var User = require('./models/user');
var Round = require('./models/round');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

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


	
};