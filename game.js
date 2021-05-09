let buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
level = 0;
var playState = false;
var gameOver = false;
var gameStarted = false;
playerAnswer = [];


function loadButton(col){
  $("#" + col).toggle("pulsate");
  $("#" + col).toggle("explode");
  console.log("loadButton: " + col)
}

setTimeout(function(){loadButton(buttonColours[0]);}, 0);
setTimeout(function(){loadButton(buttonColours[1]);}, 250);
setTimeout(function(){loadButton(buttonColours[2]);}, 500);
setTimeout(function(){loadButton(buttonColours[3]);}, 750);

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  //playSound(randomChosenColour);
  //buttonAnimate(randomChosenColour);
  gamePattern.push(randomChosenColour);

}

function playSound(col){
  var audio = new Audio('sounds/' + col + '.mp3');
  audio.play();
}

function buttonAnimate(col){
  $("#" + col).toggle("pulsate");
  $("#" + col).toggle("fade");
}

function clearPress(col){
  $("#" + col).removeClass("pressed");
}

$(".btn").bind("click", function() {

  if (gameStarted == true){
    var col = this.id
    $("#" + this.id).addClass("pressed");
    buttonAnimate(this.id);
    playSound(this.id);
    setTimeout(function(){clearPress(col);}, 500);
    console.log(this.id)
    if (gameOver == false){
      console.log("Test 0");
      var playLen = playerAnswer.length;
      var gameLen = gamePattern.length;
      if (playLen == gameLen){
        console.log("Test 1");
      } else {
        playerAnswer.push(col);
        console.log("Test 2");
        checkAnswer();
      }
    }
  }
});

function runGame(col){
  if (gameStarted == false){
      nextSequence();
      playerAnswer = []
      level = level + 1;
      $("h1").text("Level " + level);
      playGameSequence();
      gameStarted = true;
    }
  }

function playGameSequence(){
    for (i = 0; i < gamePattern.length; i++) {
        var col = gamePattern[i];
        setTimeout(function(){loadButton(col);}, 1000);
    }
}

function checkAnswer(){
    for (i = 0; i < playerAnswer.length; i++) {
      if (playerAnswer[i] != gamePattern[i]) {
        gameOver = true;
        $("h1").text("Game Over! High Score: Level " + level);
      }
  }
}

document.addEventListener('click', runGame, event)
document.addEventListener('keypress ', runGame, event)
