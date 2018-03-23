// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();

// ----------------------------------------------------
// LOGGED IN PROFILE ROUTES
// ----------------------------------------------------

// When user logins in direct them to profile page
// Profile page display recents posts and bio information grabbed in sign up
router.get("/place/:placeId", function(req, res) {
	var name = req.place.name;
	var address = req.place.address;
	db.users.findOne({
		where: {
			name: name
		},
	  	include: [db.posts]
	})
	.then(function(placeInfo) {
		console.log(placeInfo);
	  var hbsObject = {
	  	placeId: placeInfo
	  };

	  return res.render("establishmentPage", hbsObject);
	});
});

module.exports = router;