//Number of images used in the slider, add here if new images are added
const numberOfRow1Images = 5;
const numberOfRow2Images = 4;

//Variable initialization
let imgWidth = 0; 
let otherImgsTotalWidth = 0;

//Clicking left arrow
$(document).on('click', '#arrowLeft', (function(){

    //Left - Row 1
    slideLeft(numberOfRow1Images, 1);
    changeIDsLeft(numberOfRow1Images, 1);

    //Row 2
    slideLeft(numberOfRow2Images, 2);
    changeIDsLeft(numberOfRow2Images, 2);

}));

//Clicking right arrow
$(document).on('click', '#arrowRight', (function(){

    //Right - row 1
    slideRight(numberOfRow1Images, 1);
    changeIDsRight(numberOfRow1Images, 1);

    //Row 2
    slideRight(numberOfRow2Images, 2);
    changeIDsRight(numberOfRow2Images, 2);
        
}));

//Slide images left
function slideLeft(numberOfRowImages, rowNumber){
    otherImgsTotalWidth = 0;
    imgWidth =  $(`#row${rowNumber}img${0}`).width() + 10; //Width + padding of first image in row

    for(i = numberOfRowImages-1; i>0;i--){
        otherImgsTotalWidth += $(`#row${rowNumber}img${i}`).width() + 10; //Total width of all other images (+padding)
        $(`#row${rowNumber}img${i}`).animate({left: "-=" + imgWidth}); //Move all images except the first one left for the width of the first image (+padding)
    }

    $(`#row${rowNumber}img${0}`).animate({left: "+=" + otherImgsTotalWidth}); //Move first image for the total width + padding of all other images
}

//Slide images right
function slideRight(numberOfRowImages, rowNumber){
    otherImgsTotalWidth = 0;
    imgWidth =  $("#row" + rowNumber + "img"+(numberOfRowImages-1)).width() + 10; // Width + padding of last image

    for(i = numberOfRowImages - 2; i>=0;i--){
            otherImgsTotalWidth += $("#row" + rowNumber + "img"+i).width() + 10; //Total width of all other images(+padding)
            $("#row" + rowNumber + "img" + i).animate({left: "+=" + imgWidth});//Move images for the width of last image
    }

    $("#row" + rowNumber + "img" + (numberOfRowImages-1)).animate({left: "-=" + otherImgsTotalWidth}); //Move last image to the beginning 
}

//Change IDs of images to match their position when moving left
function changeIDsLeft(numberOfRowImages, rowNumber){ 
    for(i = 0; i<numberOfRowImages;i++){
        if(i==0){
                $(`#row${rowNumber}img${i}`).attr("id", (`row${rowNumber}img${numberOfRowImages+1}`)); //Give the first image a temporary ID
        }
        else{
                $(`#row${rowNumber}img${i}`).attr("id", (`row${rowNumber}img${i-1}`)); //Give all other images an ID that is one number smaller (example 3->2..)
        }
    }  
    
    $(`#row${rowNumber}img${numberOfRowImages+1}`).attr("id", (`row${rowNumber}img${numberOfRowImages-1}`)); //Change the ID of first image from temporary to last
}

//Change IDs of images to match their position when moving right
function changeIDsRight(numberOfRowImages, rowNumber){
    for(i = numberOfRowImages - 1; i>=0;i--){
        if(i==numberOfRowImages-1){
            $("#row" + rowNumber + "img" + i).attr("id", ("row" + rowNumber + "img" + (numberOfRowImages+1))); //Give the last image temporary ID
        }
    
        else{
            $("#row" + rowNumber + "img" + i).attr("id", ("row" + rowNumber + "img" + (i+1))); //Give all other images ID that is one number higher (example 3->4)
        }
    }  

    $("#row" + rowNumber + "img" + (numberOfRowImages+1)).attr("id", ("row" + rowNumber + "img" + 0)); //Change the ID of last image from temporary to first
}