$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#postBody");
    var titleInput = $("#title");
    var cmsForm = $("#posts");
    var url = window.location.href;
    var placeSelect = url.split('/').pop();

    $(cmsForm).on("submit", handlePostSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handlePostSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body, title, or author
      if (!titleInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newPost = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        placeId: placeSelect
      };

        submitPost(newPost);
      }
    }
  
    function submitPost(post) {
      $.post("/api/posts", post, function() {
        window.location.href = "/";
      });
    }
   
});