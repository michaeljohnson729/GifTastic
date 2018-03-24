var tvShows = ["orange is the new black", "house of cards", "grey's anatomy", "friends", "jersey shore", "jessica jones", "luke cage", "the defenders", "narcos", "rick and morty", "archer", "the office", "parks and rec", "dexter"];


function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-default");
        a.attr("data-name", tvShows[i]);
        a.text(tvShows[i]);
        $("#gif-buttons").append(a);
    }
}


$("#add-show").on("click", function (event) {
    event.preventDefault();
    var newShow = $("#show-input").val();
    tvShows.push(newShow);

    
    renderButtons();

});
renderButtons();

$("button").on("click", function() {
    var search = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=S5EtC2wnRVlu7AA596sPIpZU0NffHR8w&limit=10";
    
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
    
    
     for (var j = 0; j < response.data.length; j++) {
        var gifDiv = $("<div class='item'>");
        var imageUrl = response.data[j].images.original.url;
        console.log(imageUrl);     
      var gifHolder = $("<img>");     
      gifHolder.attr("src", imageUrl);
      gifHolder.attr("alt", "giphy");
      gifDiv.prepend(gifHolder)
      $("#gifs-go-here").prepend(gifDiv);
    }
});
})


