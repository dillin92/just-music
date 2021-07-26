$("#artist-form").submit(function(event) {
    event.preventDefault();
    $("#search-artist").click();
    $("search-text").text("");
});

$("#search-artist").click(function() {
    artistId = $("#search-text").val();
    fetch('https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artistId +'').then(function(response) {
        response.json().then(function(data) {
            const artistCard = $("<div>").addClass("card col s3");
            const artistName = $("<p>").addClass(".card-title").text(data.artists[0].strArtist);
            const artistImg = $("<div>").addClass(".card-image").append('<img class ="responsive-img" src="' + data.artists[0].strArtistThumb + '/preview"/>');

            $("#top-artists").append(artistCard)
            $(artistCard).append(artistName, artistImg);
            });
        });
    });
