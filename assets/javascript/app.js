//GLOBAL vars

//topics array
var topics = ["mustang", "skiing", "bowling", "HBO"];


//selected topic global
var selectedTopic = topics[0]
console.log(selectedTopic);

//global selected topic to change on button data attr click
// var selectedTopic = 'click me'

//still or loop state of gif
// var stateStill = true;


//test add strings to topics
// topics.push("mustang", "skiing", "bowling", "vhs");



    // Function for displaying movie data
    function renderButtons() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        
        //remove previous buttons and update with n
        $('#topic-buttons').empty();

        // Loop through the array of topics, then generate buttons for each
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var b = $('<button>');

          // Adding a class with data attribute for each gif topic
          b.addClass('topic-class');

        // Adding a data-attribute with a value of the movie at index i
          b.attr('data-topic', topics[i]);

            // Providing the button's text with a value of the movie at index i
          b.text(topics[i]);

    // Adding the button to the HTML
          $('#topic-buttons').append(b);
            
          console.log("adding button " + topics[i]);
         
        }

      }
//END render buttons


    // Function for displaying movie data
    function addTopic () {

      // Delete the content inside the movies-view div prior to adding new movies
      // $('#topic-buttons').empty();

      // (this is necessary otherwise you will have repeat buttons)
      var t = topics[topics.length - 1];
      console.log("last item in topic array is " + t);
      //remove previous buttons and update with n
      // $('#topic-buttons').empty();

      // Loop through the array of topics, then generate buttons for each
      // for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var b = $('<button>');

        // Adding a class with data attribute for each gif topic
        b.addClass('topic-class');

      // Adding a data-attribute with a value of the movie at index i
        b.attr('data-topic', t);

          // Providing the button's text with a value of the movie at index i
        b.text(t);

  // Adding the button to the HTML
        $('#topic-buttons').append(b);
          
        console.log("adding button " + t);
       
        renderButtons();
      }   
//END addTopic button



function loadGif () {

// $("#topic-buttons").on("click", function() {
  // selectedTopic = global var
  console.log('clicked selectedTopic var is ' + selectedTopic);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  // brian API key
  //limit to 10 items
   selectedTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

   console.log("inside ajax");

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
  
    //make results a global object
    results = response.data;

    //check object format
    console.log(results);

    //empty previous gifs
    $("#gifs-display").empty();

    //loop through results from api
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;

      console.log(rating);

      var p = $("<p>").text("Rating: " + rating);

      var topicImage = $("<img>");
    

      //still image initial display
       topicImage.attr("src", results[i].images.fixed_width_still.url);

       //add still and play attrs
       topicImage.addClass("gif-class");

       topicImage.attr("data-state", "still");

       
       topicImage.attr("data-still", results[i].images.fixed_width_still.url);

       topicImage.attr("data-animate", results[i].images.fixed_height.url);


      gifDiv.prepend(p);
      gifDiv.prepend(topicImage);

      $("#gifs-display").prepend(gifDiv);
    }

    //END callback function
  });

}




/////// ON CLICK FUNCTIONS /////////

 // This .on("click") function will trigger the AJAX Call
 $("#topic-buttons").on("click", ".topic-class", function() {
   

  console.log("selected " + $(this).attr("data-topic") );
  
  selectedTopic = $(this).attr("data-topic")
  console.log("t var is " + selectedTopic);
  
  loadGif();

  return;

});


//IMAGE ANIMATION click events

  // This .on("click") function will trigger the AJAX Call
 
  //ADD CHILD ONCLICK!!!! 
//  $("#gifs-display").on("click", ".gif-class", function() {
  $("#gifs-display").on("click", ".gif-class", function() {
//test attributes
console.log("data-state: " + $(this).attr("data-state") );
console.log("data-still: " + $(this).attr("data-still") );
console.log("data-animate: " + $(this).attr("data-animate") );

//calling outside playPause fn
// playPause();
var state = $(this).attr("data-state");
// var state = "animate";

// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
  console.log("state of this gif is now " + state);
  // state = $(this).attr("data-state");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
  console.log("state of this gif is now " + state);
  // state = $(this).attr("data-state");
}

return;
});


      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newTopic = $("#topic-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(newTopic);
        // topics.push(newTopic);
console.log("topics array is " + topics);
        // calling renderButtons which handles the processing of our movie array
       addTopic();
        return;
      });







  //check object format

//END button click event function
// });



//RENDER PAGE CONTENT
renderButtons();

console.log("END");