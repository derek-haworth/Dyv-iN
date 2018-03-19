// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var passport = require("passport");

var saltRounds = 10;


// Get Routes
// ----------------------------------------------------
router.get("/landing", function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/user/" + req.user.username + "/home");
	} else {
		var hbsObj = {
			title: "Landing"
		};
		res.render("landing", hbsObj);
	}
});

router.get("/", function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/user/" + req.user.username + "/home");
	} else {
		var hbsObj = {
			title: "Home",
			login: true
		};
		res.render("landing", hbsObj);
	}
});

router.get("/user/:username/home", function(req, res) {
	console.log(req);
	var title = "Welcome";
	var hbsObj = {
		title: title,
		username: req.params.username
	}
	res.render("index", hbsObj);
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
		res.render("signup", {
			title: "Sign Up"
		});
	}
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Post Routes
// ----------------------------------------------------
router.post("/login", 
	passport.authenticate('local', { 
		successRedirect: '/landing',
        failureRedirect: '/login',
    })
);

router.post("/signup", function(req, res) {
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
  		username: req.body.username,
  		password:  bcrypt.hashSync(req.body.password, saltRounds) 
  	};

	db.users.create(user).then(function (err) {
		res.redirect("/login");
	});
});


module.exports = router;