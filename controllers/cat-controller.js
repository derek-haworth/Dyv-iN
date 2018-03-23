// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();

// ----------------------------------------------------
// LOGGED IN PROFILE ROUTES
// ----------------------------------------------------

// When user logins in direct them to profile page
// Profile page display recents posts and bio information grabbed in sign up
router.get("/category/:category_name", function(req, res) {
	var category_name = req.category.category_name;
	db.users.findAll({
		where: {
			category_name: categoryId
		},
	  	include: [db.posts]
	})
	.then(function(categoryInfo) {
		console.log(categoryInfo);
	  var hbsObject = {
	    categoryId: categoryInfo
	  };

	  return res.render("profile", hbsObject);
	});
});

module.exports = router;