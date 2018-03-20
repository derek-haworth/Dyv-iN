$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#postBody");
    var titleInput = $("#title");
    var cmsForm = $("#posts");
    var placeSelect = $("#place");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handlePostSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var placeId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // Getting the authors, and their posts
    getPlaces();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handlePostSubmit(event) {
      debugger;
      event.preventDefault();
      // Wont submit the post if we are missing a body, title, or author
      if (!titleInput.val().trim() || !bodyInput.val().trim() || !placeSelect.val()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newPost = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim()
      };
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        debugger;
        newPost.id = postId;
        updatePost(newPost);
      }
      else {
        submitPost(newPost);
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
      debugger;
      $.post("/api/posts", post, function() {
        window.location.href = "/";
      });
    }
  
    // A function to get Authors and then render our list of Authors
    function getPlaces() {
      debugger;
      $.get("/api/places", renderPlaceList);
    }
    
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    function renderPlaceList(data) {
      debugger;
      
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaceRow(data[i]));
      }
      placeSelect.empty();
      console.log(rowsToAdd);
      console.log(placeSelect);
      placeSelect.append(rowsToAdd);
      placeSelect.val(placeId);
    }
  
    // Creates the author options in the dropdown
    function createPlaceRow(place) {
      var listOption = $("<option>");
      listOption.attr("value", place.id);
      listOption.text(place.name);
      return listOption;
    }
  
  
  });
  