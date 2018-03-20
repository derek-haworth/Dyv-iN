// Node Dependencies
var express = require('express');
var router = express.Router();

var db = require('../models'); 



// POST/API Routes for Database changes
// ----------------------------------------------------

// Create a new User

router.post("/admin", function(req, res) {

  var title = {
    category_name: req.body.category_name
  };

  db.categories.create(title).then(function (err) {
    res.redirect("/");
  });

  var place = {
    name: req.body.name,
    address: req.body.address,
    review: req.body.review
  }

  db.places.create(place).then(function (err) {
    res.redirect("/");
  });

  var post = {
    title: req.body.title,
    body: req.body.body
  };

  db.posts.create(post).then(function (err) {
    res.redirect("/");
  });

});


// GET route for getting all of the posts
router.get("/api/places", function(req, res) {
    db.places.findAll({
      include: [db.categories]
    }).then(function(dbPlace) {
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

router.get("/api/posts", function(req, res) {
  db.posts.findAll({
    include: [db.places],
    include: [db.users]
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// POST route for saving a new post
router.post("/api/places", function(req, res) {
  console.log("====================");
  console.log("MJB HERE");
  console.log("====================");
  console.log(req.body);
  db.places.create(req.body).then(function(dbPlace) {
    res.json(dbPlace);
  });
});

router.post("/api/posts", function(req, res) {
  db.posts.create(req.body).then(function(dbPosts) {
    res.json(dbPosts);
  });
});

// Export routes
module.exports = router;
