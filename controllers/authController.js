// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models'); 


// POST/API Routes for Database changes
// ----------------------------------------------------

// Create a new User
router.post('/create/user', function (req, res){
  console.log(req);
  console.log(res);
  // Insert a new user to Users Table
  models.Users.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  ).then(function(){
    // Redirect to index page
    res.redirect('/index');
  });

});

// Export routes
module.exports = router;
