$("#save-concert").click(function(concertDetails) {
    concertDetails = $("#concert-details").val();
    const concertLi = $("<li>").text(concertDetails);
    $("#memorable-concerts").append(concertLi);

});
