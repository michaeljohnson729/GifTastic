var tvShows = ["orange is the new black", "house of cards", "grey's anatomy", "friends", "jersey shore", "jessica jones", "luke cage", "the defenders", "narcos", "the walking dead", "archer", "the office", "parks and rec", "dexter"];


function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-default searchTerms");

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


$("body").on("click", ".searchTerms", function () {
    var search = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=S5EtC2wnRVlu7AA596sPIpZU0NffHR8w&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (var j = 0; j < response.data.length; j++) {
            var gifDiv = $("<div>");
            var animateUrl = response.data[j].images.original.url;
            var stillUrl = response.data[j].images.original_still.url;
            var gifRating = response.data[j].rating;
            console.log(stillUrl);
            var gifTitle = response.data[j].title;
            var gifHolder = $("<img>");
            gifHolder.attr("src", stillUrl);
            gifHolder.attr("alt", "giphy");
            gifHolder.attr("data-animate", animateUrl);
            gifHolder.attr("data-still", stillUrl);
            gifHolder.attr("data-state", "still");
            gifDiv.prepend(gifHolder);
            gifDiv.prepend("<div class='title-rating panel panel-default'> <strong>Title: </strong>"+gifTitle+"  <strong>Rating: </strong>" + gifRating + "</div>");
            //gifDiv.append("<button class='btn btn-default download' id='download'><a href=" + animateUrl + " target='blank' download>Download GIF</button");
            $("#gifs-go-here").prepend(gifDiv);
        }

        $("body").on("click", "img", function () {
            console.log($(this).attr("data-state"));
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            then();
        })

    })
});




