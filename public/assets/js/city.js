$(document).ready(function() {

	var citySearch = $('#citySearchForm');
	var cityInput = $('#citySearchField');

	$(citySearch).on("submit", findPlaces);

	function findPlaces(event) {
	  	event.preventDefault();
	    if (!cityInput.val().trim()) {
	      // error-handling
	      return;
	    }
	    // Constructing a newPost object to hand to the database
	    var city = {
	      name: cityInput.val().trim(),
	    };
	   
	}

});
