var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gamestarted = false;
var level = 0;

$(document).keypress(function () { 

    //if game has not started
    if (!gamestarted) {

        $("#level-title").text("Level " + level);
        nextSequence();
        gamestarted = true;
    }
});

function checkAnswer(currentLevel) {

    //check if the current pressed button is correct
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success")

   // check that they have finished their sequence 
if(gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
        nextSequence();
    }, 1000)
}


} else {console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

}

//detect clicked button
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Called after user click, pass the index of the last clicked button to function
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {

    userClickedPattern=[];

    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);


    //select button with same id as randomChosenColor and add flash animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    

    // alert("testing!");
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//reset game if wrong answer
function startOver() {
    level = 0;
    gamePattern = [];
    gamestarted = false;
}