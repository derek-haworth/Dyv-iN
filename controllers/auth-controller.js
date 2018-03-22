// Node Dependencies
var express = require('express');
var router = express.Router();

var db = require('../models'); 

// ----------------------------------------------------
//  POST/API Routes for Database changes
// ----------------------------------------------------

// This will be for approving new Categories
router.get("/admin", function(req, res) {
  db.places.findAll({
    where: {
      viewable: false
    }
  }).then(function(dbPlaces) {
    var hbsObj = {
      places: dbPlaces
    };
    res.render("cms", hbsObj);
    // res.json(dbPlace);
  });
});

// Create a new User

router.post("/admin", function(req, res) {
  console.log('============');
  console.log('ADMIN');
  console.log(req);
  // Category
  var title = {
    category_name: req.body.category_name
  };

  db.categories.create(title).then(function (err) {
    res.redirect("/admin");
  });

  // City
  var city = {
    cityName: req.body.cityName
  };

  db.cities.create(city).then(function (err) {
    res.redirect("/admin");
  });

  // Place
  var place = {
    name: req.body.name,
    address: req.body.address,
    review: req.body.review
  }

  db.places.create(place).then(function (err) {
    res.redirect("/admin");
  });

});

// GET route for getting all of the posts
router.get("/api/places", function(req, res) {
    db.places.findAll({
      include: [db.categories, db.cities]
    }).then(function(dbPlace) {
      res.json(dbPlace);
    });
});

// POST route for saving a new post
router.post("/api/places", function(req, res) {
  db.places.create(req.body).then(function(dbPlace) {
    res.json(dbPlace);
  });
});

router.get("/api/categories", function(req, res) {
    db.categories.findAll({
      include: [db.places]
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
});

router.get("/api/cities", function(req, res) {
    db.cities.findAll().then(function(dbCity) {
      res.json(dbCity);
    });
});

router.get("/api/posts", function(req, res) {
  db.posts.findAll({
    include: [db.places, db.users]
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});


router.post("/api/posts", function(req, res) {
  var userId = req.user.dataValues.id;

  var obj = {
    userId: userId,
    title: req.body.title,
    body: req.body.body,
    placeId: req.body.placeId
  }
  db.posts.create(obj).then(function(dbPosts) {
    res.json(dbPosts);
  });
});


router.put("/places/update", function(req, res) {
  console.log('==========');
  console.log('UPDATE PLACE');
  console.log('==========');
  console.log(req.body);
  db.places.update({
    viewable: true
  }, {
    where: {
      id: req.body.placeId
    }
  })
  .then(function(data) {
    console.log('==========');
    console.log('DATA');
    console.log('==========');
    console.log(data);
    res.redirect("/admin");
  });
});

// Export routes
module.exports = router;
