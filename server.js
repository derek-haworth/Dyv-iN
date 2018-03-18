// Dependencies
// =============================================================
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(session({
//   secret: 'mysecret',
//   saveUninitialized: true,
//   resave: true
// }));

// required for passport
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// require('./config/passport')(app);

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ 
    defaultLayout: "main" 
  })
);
app.set("view engine", "handlebars");

// Sync models
db.sequelize.sync();

// Global user var
app.use(function (req, res, next){
  res.locals.user = req.user || null;
  next();
})

// Import DOM controller
var domRouter = require('./controllers/domControllers.js');
app.use(domRouter);


app.listen(PORT, function() {
    console.log("I\'m listening... on port " + PORT);
});
