$("#concerts-form").submit(function(event) {
    event.preventDefault();
    return false
});
$("#save-concert").click(function() {
    concertDetails = $("<p>").addClass("card-content").text($("#concert-details").val());
    const concertLi = $("<li>").addClass("memorable-concert");
    const concertCard = $("<div>").addClass("card col s10");
    const concertName = $("<h4>").addClass("card-title").text($("#concert-name").val());
    const concertDate=$("<span>").text($("#concert-date").val());

    $(concertLi).append(concertCard);
    $(concertCard).append(concertName, concertDate, concertDetails);
    $("#memorable-concerts").append(concertLi);

});

// $(document).ready(function(){
//     $('.datepicker').datepicker();
//   });

