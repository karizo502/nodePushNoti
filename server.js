// Include our packages in our main server file
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql')
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors')
var conn = require('./config/connectionconfig');

var authRoute = require('./app/routes/auth');
var userRoute = require('./app/routes/users');
var teamRoute = require('./app/routes/team');
var impactRoute = require('./app/routes/impact');
var deptRoute = require('./app/routes/depts');
var statusRoute = require('./app/routes/status');
var formRoute = require('./app/routes/forms');
var assessRoute = require('./app/routes/assess');

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize passport for use
app.use(passport.initialize());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
//   res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS')
//   next();
// });

app.use(cors());

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {
  res.send('Risk Assess System.');
});


// Bring in defined Passport Strategy
require('./config/passport')(passport);

// Set url for API group routes
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', teamRoute);
app.use('/api', impactRoute);
app.use('/api', deptRoute);
app.use('/api', statusRoute);
app.use('/api', formRoute);
app.use('/api', assessRoute);

// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');