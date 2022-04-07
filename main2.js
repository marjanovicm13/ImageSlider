"use strict";

//Variable initialization
var imgWidth = 0;

$(document).ready(function () {
    //Clicking left arrow button
    $("#arrowLeft").on("click", function () {
        $("#arrowLeft").prop("disabled", true);
        $("#arrowRight").prop("disabled", true); //Disable both arrow buttons when one of them is clicked

        //Left - Row 1
        slideLeft(1);

        //Row 2
        slideLeft(2);
    });

    //Clicking right arrow button
    $("#arrowRight").on("click", function () {
        $("#arrowRight").prop("disabled", true);
        $("#arrowLeft").prop("disabled", true); //Disable both arrow buttons when one of them is clicked

        //Right - row 1
        slideRight(1);

        //Row 2
        slideRight(2);
    });
});

//Slide images left
function slideLeft(rowNumber) {
    var imgClass = $(".row" + rowNumber);
    imgWidth = imgClass.first().width() + 10; //Width + padding of first image in row

    imgClass.first().nextAll().each(function () {
        $(this).animate({ left: "-=" + imgWidth }); //Move all images left except the first one
    });

    imgClass.first().fadeOut("slow", "linear", function () {
        //Fade out first image, when it fades out, the callback function is called
        imgClass.each(function () {
            $(this).css("left", "0px"); //Reset css left for all images to 0
        });
        imgClass.first().fadeIn("slow", "linear", function () {
            //Fade in first image, when the animation finishes, the callback function is called
            $("#arrowLeft").prop("disabled", false);
            $("#arrowRight").prop("disabled", false); //Enable both arrow buttons after the slideLeft is done
        });
        imgClass.first().insertAfter(imgClass.last()); //Insert first image after the last one as it is now on the end 
    });
}

//Slide images right
function slideRight(rowNumber) {
    var imgClass = $(".row" + rowNumber);
    imgWidth = imgClass.last().width() + 10; // Width + padding of last image in row

    imgClass.last().prevAll().each(function () {
        $(this).animate({ left: "+=" + imgWidth }); //Move all images right except the last one
    });

    imgClass.last().animate({ left: "+=" + imgWidth }, function () {
        //Move the last image right, when it finishes moving right the callback function is called
        imgClass.each(function () {
            //Reset css left for all images to 0
            $(this).css("left", "0px");
        });
        imgClass.last().insertBefore(imgClass.first()); //Insert last image before the first one
        $("#arrowRight").prop("disabled", false);
        $("#arrowLeft").prop("disabled", false); //Enable both arrow buttons after the slideRight is done
    });
}
