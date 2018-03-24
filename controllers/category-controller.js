// Node Dependencies
var db = require('../models');
var express = require('express');
var router = express.Router();

// GET route for getting all of the posts
router.get("/categories", function(req, res) {
    console.log('=========');
    console.log('GET CITY ID');
    console.log('=========');
    console.log(req);
    console.log('=========');
    console.log('RESPONSE');
    console.log(res);
    db.places.findAll({
        include: [db.categories],
    	where: {
      		cityId: 1
    	},
        order: [
            ["id", "ASC"]
        ] 
    }).then(function(dbPlace) {
    	console.log('=========');
    	console.log('FIND PLACES FOR ME');
    	console.log('=========');
    	console.log(dbPlace);
    	var hbsObject = {
			 title: dbPlace.category_name,
			 place: dbPlace
		  };
      	res.render("categoryPage", hbsObject);
    });
});


// GET route for getting all of the posts
router.get("/categories/all", function(req, res) {
    db.categories.findAll({
      include: [db.places],
      order: [
        ["id", "ASC"]
      ]
    })
    .then(function(dbCategory) {
      var hbsObject = {
        title: "Categories",
        category: dbCategory
      };
      return res.render("categoryPage", hbsObject);
    });
});


module.exports = router;