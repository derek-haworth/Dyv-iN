// Dependencies
// =============================================================
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
require('./config/passport');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// required for passport
app.use(cookieParser());
app.use(session({
  secret: 'mysecret'
}));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ 
    defaultLayout: "main" 
  })
);
app.set("view engine", "handlebars");


// Global user var
app.use(function (req, res, next){
  res.locals.user = req.user || null;
  next();
})

// Import DOM controller
var domRouter = require('./controllers/domController.js');
app.use('/', domRouter);

// Import Auth controller

var authRouter = require('./controllers/authController.js');
app.use('/', authRouter);

//Sync models
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("I\'m listening... on port " + PORT);
    });
});