let gamePattern = [];
const buttonColours = ["red","blue","green","yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;
let highScore = 0;

$("h1").click(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSequence(randomChosenColour);
    // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("level " + level);
    
}
function playSound (name){
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
}
function playSequence(randomChosenColour){
    let delay = 0;
    for (let index = 0; index < gamePattern.length; index++) {
        const element = gamePattern[index];
        setTimeout(() => {
            $("#" + element).fadeOut(100).fadeIn(100);
            playSound(element);
        }, delay);
        delay = delay + 400;

    }
}


$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})


function animatePress (currentColour){
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).toggleClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel){
   if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    
    if(userClickedPattern.length == gamePattern.length){
        userClickedPattern = [];
        setTimeout(() => {
            nextSequence();
        }, 1000);}
   }

   else{
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(() => {
        $("body").toggleClass("game-over");
    }, 200);

    $("#level-title").text("Game Over! Press to restart")
    
    startOver();
    }
}

function startOver() {
    if( highScore <= level){highScore = level};
    $("h2").text("High Score: " + highScore);
    $("h2").removeClass("hidden");
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}


