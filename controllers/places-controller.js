// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();


router.get("/place/:placeId", function(req, res) {
	var placeId = req.params.placeId;
	db.places.findOne({
		where: {
			id: placeId
		},
	  	include: [db.posts]
	})
	.then(function(placeInfo) {
		console.log(placeInfo);
		var hbsObject = {
			// login: true,
			title: placeInfo.name,
			place: placeInfo
		};

	  return res.render("establishmentPage", hbsObject);
	});
});

module.exports = router;