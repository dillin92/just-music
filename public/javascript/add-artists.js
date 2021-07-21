$("#search-artist").click(function(artistId) {
    artistId = $("#search-text").val();
    fetch('https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artistId +'').then(function(response) {
        response.json().then(function(data) {
            const artistLi = $("<li>").addClass("list-group-item").text(data.artists[0].strArtist).append('<img src="' + data.artists[0].strArtistThumb + '" />');
            $("#top-artists").append(artistLi);
        });
    });
});
