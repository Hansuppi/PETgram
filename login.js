
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var path = require('path');
const routes = require('./routes');

var connection = mysql.createConnection({
	host     : 'mysql.metropolia.fi',
	user     : 'minnaeni',
	password : '@)kT]IY8jjk]zE4/',
	database : 'minnaeni'
});

var app = express();

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'));

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'CSS')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', routes);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.ejs'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		
        return response.sendFile(path.join(__dirname + '/html/home.ejs'));
	} else {
		response.send('Please login or create account to view this page!');
	}
	response.end();
});


app.listen(3000, () => {
  console.log('Server is running at localhost:3000');
});


