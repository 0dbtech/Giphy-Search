$(document).ready(function() {


//GLOBAL vars

//topics array
var topics = ["mustang", "skiing", "bowling", "HBO"];

//selected topic global
var selectedTopic = topics[0]

console.log(selectedTopic);

//END global vars


//////FUNCTIONS START///////


  // Create topic buttons
  function renderButtons() {

    //remove previous buttons to prevent duplicates
    $('#topic-buttons').empty();

      // Loop through the array of topics
      for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        var b = $('<button>');

        // Adding a class with data attribute for each gif topic
        b.addClass('topic-class btn btn-secondary');

        // Adding a data-attribute with a value of the topic at index i
        b.attr('data-topic', topics[i]);

        // Providing the button's text with a value of the topic at index i
        b.text(topics[i]);

        // Adding button to the HTML
        $('#topic-buttons').append(b);
            
          console.log("adding button " + topics[i]); 
        }
        //END for loop  
    }
    //END renderButtons function


  // add new gif search topic from user input
  function addTopic () {

    //select new topic as last item in topics array
    var t = topics[topics.length - 1];

    console.log("last item in topic array is " + t);
    
    //call renderButton function to add to dom
    renderButtons();
  }   
  //END addTopic button


  function loadGif () {

    // selectedTopic = global var
    console.log('selectedTopic var is ' + selectedTopic);

    // base Giphy url to query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    
    // brian API key
    //limit return to 10 items
    selectedTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
        
          //grab giphy object
          results = response.data;

          //check object format
          console.log(results);

          //empty previous gifs
          $("#gifs-display").empty();

          //loop through results from api
          for (var i = 0; i < results.length; i++) {
          
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            console.log("rating is: " + rating);
            
            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img>");
          
            //still image initial display
            topicImage.attr("src", results[i].images.fixed_width_still.url);

            //add still and play attributes
            topicImage.addClass("gif-class");

            topicImage.attr("data-state", "still");

            topicImage.attr("data-still", results[i].images.fixed_width_still.url);

            topicImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.prepend(p);

            gifDiv.prepend(topicImage);

            $("#gifs-display").prepend(gifDiv);

          //END for loop  
          }

      //END callback function
      });

    //END loadGif
    }


/////// ON CLICK FUNCTIONS /////////

  //use child element slector for dynamic divs
  $("#topic-buttons").on("click", ".topic-class", function() {
   
    console.log("selected " + $(this).attr("data-topic") );
    
    //grap topic attribute from button and push to global var for use in loadGif fn
    selectedTopic = $(this).attr("data-topic")
    
    console.log("selectedTopic var is now " + selectedTopic);
  
    loadGif();

    return;

    });


//IMAGE ANIMATION click event

  //add child element selector 
  $("#gifs-display").on("click", ".gif-class", function() {

    //test attributes
    console.log("data-state: " + $(this).attr("data-state") );
    console.log("data-still: " + $(this).attr("data-still") );
    console.log("data-animate: " + $(this).attr("data-animate") );

    //gif state var still or animate
    var state = $(this).attr("data-state");

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("state of this gif is now " + state);
       
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("state of this gif is now " + state);
        
      }

    return;
    });


  // add new topic button
  $("#add-topic").on("click", function(event) {
        
      // event.preventDefault() prevents the form from trying to submit itself.
      event.preventDefault();

      // grab text from the input box and remove white space from start/end of input
      var newTopic = $("#topic-input").val().trim();

      // push text input to end of array
      topics.push(newTopic);
      
      // check array
      console.log("topics array is " + topics);
      
      // calling addTopic fn
      addTopic();
      
      return;
      });


      
////RENDER PAGE LOAD CONTENT
renderButtons();

console.log("END");

//Document ready END
});