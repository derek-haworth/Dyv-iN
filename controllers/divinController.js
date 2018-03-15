// DivIn route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('Home page');
})

// About page route.
router.get('/new', function (req, res) {
  res.send('User Profile Create');
})

// About page route.
router.get('/city', function (req, res) {
  res.send('Main app page');
})