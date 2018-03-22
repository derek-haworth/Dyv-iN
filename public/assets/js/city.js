// $(document).ready(function() {
//   // Getting jQuery references to the post body, title, form, and author select
//   var bodyInput = $("#body");
//   var titleInput = $("#name");
//   var addressInput = $("#address");
//   var cityInput = $("#city");
//   var cmsForm = $("#cms-city");
//   // Adding an event listener for when the form is submitted
//   $(cmsForm).on("submit", handleFormSubmit);
//   // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
//   var url = window.location.search;
//   var postId;
//   var authorId;
//   // Sets a flag for whether or not we're updating a post to be false initially
//   var updating = false;

//   // Getting the authors, and their posts
//   getCities();

//   // A function for handling what happens when the form to create a new post is submitted
//   function handleFormSubmit(event) {
//     debugger;
//     event.preventDefault();
//     // Wont submit the post if we are missing a body, title, or author
//     if (!titleInput.val().trim()  || !authorSelect.val()) {
//       return;
//     }
//     // Constructing a newPost object to hand to the database
//     var newPlace = {
//       cityName: titleInput.val().trim(),
//       address: addressInput.val().trim(),
//       // review: bodyInput.val().trim(),
//       categoryId: authorSelect.val(),
//       cityId: cityInput.val()
//     };

//     // If we're updating a post run updatePost to update a post
//     // Otherwise run submitPost to create a whole new post
//     if (updating) {
//       debugger;
//       newPlace.id = postId;
//       updatePost(newPlace);
//     }
//     else {
//       submitPost(newPlace);
//     }
//   }

//   // Submits a new post and brings user to blog page upon completion
//   function submitPost(place) {
//     debugger;
//     $.post("/api/places", place, function() {
//       window.location.href = "/";
//     });
//   }

//   // A function to get Authors and then render our list of Authors
//   function getCities() {
//     // debugger;
//     $.get("/api/cities", renderCityList);
//   }
//   // Function to either render a list of authors, or if there are none, direct the user to the page
//   // to create an author first
//   function renderCityList(data) {
//     debugger;
    
//     var rowsToAdd = [];
//     for (var i = 0; i < data.length; i++) {
//       rowsToAdd.push(createCategoryRow(data[i]));
//     }
//     cityInput.empty();
//     console.log(rowsToAdd);
//     console.log(cityInput);
//     cityInput.append(rowsToAdd);
//     cityInput.val(authorId);
//   }

//   // Creates the author options in the dropdown
//   function createCategoryRow(city) {
//     var listOption = $("<option>");
//     listOption.attr("value", city.id);
//     listOption.text(city.cityName);
//     return listOption;
//   }


// });
