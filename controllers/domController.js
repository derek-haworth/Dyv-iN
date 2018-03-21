// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var passport = require("passport");

var saltRounds = 10;

// Get Routes
// ----------------------------------------------------

router.get("/", function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/user/" + req.user.username + "/home");
	} else {
		db.categories.findAll({
		  include: [db.places],
		  order: [
		    ["category_name", "ASC"]
		  ]
		})
		.then(function(dbCategory) {
		  // into the main index, updating the page
		  var hbsObject = {
		  	// login: true,
		  	title: "Welcome",
		  	loginErrors: req.session.messages,
		    category: dbCategory
		  };
		  return res.render("landing", hbsObject);
		});
	}
});

router.get("/user/:username/home", function(req, res) {

	var title = "Welcome";

	db.categories.findAll({
	  include: [db.places],
	  order: [
	    ["category_name", "ASC"]
	  ]
	})
	.then(function(dbCategory) {
	console.log(dbCategory);
	  // into the main index, updating the page
	  var hbsObject = {
	  	login: true,
	  	title: title,
	    category: dbCategory
	  };
	  console.log(hbsObject.category);
	  return res.render("index", hbsObject);

	});
});

router.get("/user/:username/profile", function(req, res) {
	var username = req.user.username;
	var title = "Profile";
	db.users.findOne({
		where: {
			username: username
		},
	  	include: [db.posts]
	})
	.then(function(db) {
	console.log(db);
	  // into the main index, updating the page
	  var hbsObject = {
	  	title: title,
	    db: db
	  };
	  console.log(hbsObject.db);
	  return res.render("profile", hbsObject);
	  
	});
});

router.get("/login", function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/user/" + req.user.username + "/home");
	} else {
		var hbsObj = {
			title: "Login",
			login: true
		};
		res.render("login", hbsObj);
	}
});

router.get("/signup", function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/login")
	} else {
		var message = req.session.message;
		var hbsObj = {
			title: "Sign Up",
			errorMessage: message
		}
		res.render("signup", hbsObj);
	}
});

router.get("/admin", function(req, res) {
	res.render("cms");
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Post Routes
// ----------------------------------------------------
router.post("/login", 
	passport.authenticate('local', { 
		successRedirect: '/',
        failureRedirect: '/',
        failureMessage: 'Invalid username or password'
    })
);

router.post("/signup", function(req, res) {
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
  		username: req.body.username,
  		password: bcrypt.hashSync(req.body.password, saltRounds) 
  	};

  	// if a new user created, redirect them to login page NOT modal
	db.users.create(user)
	.then(function (err) {
		req.session.valid = true;
		res.redirect("/login");
	})
	// Unsuccesful signup will render the signup page
	.catch(function(err) {
		//using express sessions to pass along error message 
		req.session.message = err.errors[0].message;
		res.redirect("/signup");
	});
});


module.exports = router;