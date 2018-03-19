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
	console.log('=====REQUEST===========');
	console.log(req);
	var title = "Welcome";
	db.categories.findAll({
	  include: [db.places],
	  order: [
	    ["category_name", "ASC"]
	  ]
	})
	.then(function(dbCategory) {
	console.log('=========PROMISE RETURN ========');
	console.log(dbCategory);
	  // into the main index, updating the page
	  var hbsObject = {
	  	title: title,
	    category: dbCategory
	  };
	  console.log('======HANDLEBAR OBJECT========');
	  console.log(hbsObject.category);
	  console.log(hbsObject.category);
	  return res.render("index", hbsObject);
	});
	// var title = "Welcome";
	// var hbsObj = {
	// 	title: title,
	// 	username: req.params.username
	// }
	// res.render("index", hbsObj);
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
		successRedirect: '/landing',
        failureRedirect: '/login',
    })
);

router.post("/signup", function(req, res) {
	console.log(req);
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
  		username: req.body.username,
  		password: bcrypt.hashSync(req.body.password, saltRounds) 
  	};

	db.users.create(user).then(function (err) {
		res.redirect("/login");
	});
});


module.exports = router;