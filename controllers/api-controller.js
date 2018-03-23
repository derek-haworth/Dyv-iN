// var db = require('../models');
// var express = require('express');
// var router = express.Router();

// // Require jQuery
// var sget = require('simple-get');

// router.get("/categories", function(req, res) {
//   console.log('============');
//   console.log('REQ QUERY');
//   console.log('============');
//   console.log(req);
//   var formInput = req.query;
//   var city = formInput.citySearch;
//   var options = Object.keys(formInput);
//   var type = '';
//   var tabList = [];
//   for (var i = 0; i < options.length; i++) {
//     if(options[i] !== 'citySearch') {
//       tabList.push(options[i]);
//     }
//   }
//   var parkList = [];
//   var museumList = [];
//   var restaurantsList = [];
//   var shoppingList = [];
//   var nightlifeList = [];

//   // var selection = ('#categoryId option:selected').text();

//   var counter = 0;
//   var newQuery = function() {
//     var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "&type=" + tabList + "&key=AIzaSyBl2OfYKjzT3NZV89NR7TJmgGtVV4fZ3eA";
//     // Exit condition
//     if (counter >= tabList.length) {
//       var allLists = {
//         // username: username,
//         tabs: tabList,
//         parks: parkList,
//         museums: museumList,
//         restaurants: restaurantsList,
//         malls: shoppingList,
//         nightlife: nightlifeList
//       };
//       console.log("allLists:", allLists)
//       res.render("categoryPage.handlebars",allLists);
//       return;
//     }
//     // GET request to google api
//     sget.concat(query, function(err, response, data) {
//       if (err) throw err;
//       var typeResults = JSON.parse(data.toString('utf-8'));

//       switch(tabList[counter]) {
//         case "park":
//             parkList = typeResults.results.slice(0,15);
//             break;
//         case "museum":
//             museumList = typeResults.results.slice(0,15);
//             break;
//         case "bar":
//             restaurantsList = typeResults.results.slice(0,15);
//             break;
//         case "shopping_mall":
//             shoppingList = typeResults.results.slice(0,15);
//             break;
//         case "night_club":
//             nightlifeList = typeResults.results.slice(0,15);
//             break;            
//         default:
//             park = typeResults.results.slice(0,15);
//       }
//       counter ++;
//       newQuery();
//     });
//   }

//   newQuery();
// });


// module.exports = router;