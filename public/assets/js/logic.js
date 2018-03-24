$(document).ready(function() {

  // Place variables
  var placeForm = $('#cms-place');
  var placeTitle = $('#placeName');
  var placeAddress = $('#placeAddress');
  var categorySelect = $("#categoryId");
  var citySelect = $("#cityId");
    
  $(placeForm).on("submit", placeSubmission);

  function placeSubmission(event) {
    event.preventDefault();
      if (!placeTitle.val().trim() || !placeAddress.val().trim() || !categorySelect.val() || !citySelect.val()) {
        // error-handling
        return;
      }
      // Constructing a newPlace object to hand to the database
      var newPlace = {
        name: placeTitle.val().trim(),
        address: placeAddress.val().trim(),
        categoryId: categorySelect.val(),
        cityId: citySelect.val()
      };
     
      adventure.submitPlace(newPlace);
  }

  var adventure = {

    submitPlace: function(place) {
      $.post("/api/places", place, function() {
          window.location.href = "/";
        });
    },

    getCategories: function() {
      $.get('/api/categories', this.renderList);
    },

    getCities: function() {
      $.get('/api/cities', this.renderList);
    },

    renderList: function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(adventure.createOptions(data[i]));
      }
      if (data[0].category_name) {
        categorySelect.empty();
        categorySelect.append(rowsToAdd);

      } else {
        citySelect.empty();
        citySelect.append(rowsToAdd);
      }
    },

    createOptions: function(data) {
      var listOption = $("<option>");
      if (data.category_name) {
        listOption.attr("value", data.id);
        listOption.text(data.category_name);
      } else {
        listOption.attr("value", data.id);
        listOption.text(data.cityName);
      }
        return listOption;
    }

  };

  adventure.getCategories();
  adventure.getCities();


  // Removes duplicate Posts
  var reviews = $('.reviewHolder');
  var reviewEle = reviews.children();
  var splicedReviews = reviewEle.splice(reviewEle.length/2);

  reviews.html(splicedReviews);

});
