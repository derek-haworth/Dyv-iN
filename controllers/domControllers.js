// Node Dependencies
var express = require('express');
var router = express.Router();
// Pulls out the Models
var models = require('../models');
var path = require('path');
// var passport = require("passport");


// PUBLIC ROUTES (No User Auth Needed)
// ----------------------------------------------------

// Index Home Page Render
router.get('/', function (req, res){
  res.render('index');
});


// Sign up Page (DOM Render)
router.get('/signup', function (req, res){
  res.render('signup');
});


// Login Page (DOM Render)
router.get('/login', function (req, res){
  res.render('login');
});

// Export routes
module.exports = router;