var correctGuess = [];
var incorrectGuess = [];
var allGuesses = [];
var wordStore = '{ "words" : [' +
'{ "word":"dinosaur", "hint":"Reptiles that lived millions of years ago."},' +
'{ "word":"puppy", "hint":"Tiny man\'s best friend."},' +
'{ "word":"dog", "hint":"Man\'s best friend."} ]}';

var gameOn = true;
var obj = JSON.parse(wordStore);
var randValue = Math.floor(Math.random()*(obj.words.length));
var randWord = obj.words[randValue].word.toUpperCase();
var randHint = obj.words[randValue].hint;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//vertical line
ctx.moveTo(105,200);
ctx.lineTo(105,50);
ctx.stroke();
//horizontal line
ctx.moveTo(50,200);
ctx.lineTo(150,200);
ctx.stroke();
//higher horizontal line
ctx.moveTo(50,50);
ctx.lineTo(105,50);
ctx.stroke();


var correctLetterDisplay = document.getElementById('lastDiv');
var incorrectLetterDisplay = document.getElementById('firstDiv');
var hintDisplay = document.getElementById('hintDiv');
var content = [];
for (var i = 0; i < randWord.length; i++) {
  content.push("_ ");
}
content = content.join('');
content = document.createTextNode(content);
correctLetterDisplay.appendChild(content);
correctLetterDisplay.style.textAlign = "center";

function winGame() {
  if (correctGuess.length == randWord.length) {
    alert("YOU HAVE WON!");
    gameOn = false;
  }
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

var arrayCopy = [];
var placeHolder = [];
for (var i = 0; i < randWord.length; i++) {
  arrayCopy.push("_ ");
}

var passedNumber = 0;
var incorrectCount = 0;
addEventListener("keydown", function(event){
  var val = event.keyCode;
  var res = String.fromCharCode(val);
  var outerCount = 0;
  var countLetter = 0;
  var indexHolder = [];
  if (gameOn) {
    if (res.match(/[a-z]/i)) {
      for (var i=0; i < allGuesses.length; i++) {
        if (res == allGuesses[i]) {
          alert("You have already guessed that letter!");
          outerCount += 1;
        }
      }
      if (outerCount == 0) {
        for (var k=0; k < randWord.length;k++) {
          if (res == randWord[k]) {
            correctGuess += [res];
            indexHolder = getAllIndexes(randWord, res);
            for (var j = 0; j < indexHolder.length; j++) {
              if (placeHolder.length == 0) {
                arrayCopy[indexHolder[j]] = res;
                document.getElementById('lastDiv').innerHTML = arrayCopy.join('');
                correctLetterDisplay.style.textAlign = "center";
              }
            }

            countLetter += 1;
            outerCount += 1;
          }
        }
        if (countLetter == 0) {
          incorrectGuess += [res];
          incorrectCount += 1;
          outerCount = 0;
          if (incorrectGuess.length == 1) {
              document.getElementById('firstDiv').innerHTML = incorrectGuess;
              document.getElementById('hintDiv').innerHTML = randHint;
              hintDiv.style.textAlign = "center";
          }
          incorrectLetterDisplay.style.textAlign = "center"
          if (incorrectCount == 1) {
            //draw head
            ctx.beginPath();
            ctx.arc(50,65,15,0,2*Math.PI);
            ctx.stroke();
          }
          if (incorrectCount == 2) {
            //draw body
            ctx.moveTo(50,80);
            ctx.lineTo(50,120);
            ctx.stroke();
            document.getElementById('firstDiv').innerHTML = incorrectGuess;
          }
          if (incorrectCount == 3) {
            //draw left arm
            ctx.moveTo(25,100);
            ctx.lineTo(50,100);
            ctx.stroke();
            document.getElementById('firstDiv').innerHTML = incorrectGuess;
          }
          if (incorrectCount == 4) {
            //draw right arm
            ctx.moveTo(50,100);
            ctx.lineTo(75,100);
            ctx.stroke();
            document.getElementById('firstDiv').innerHTML = incorrectGuess;
          }
          if (incorrectCount == 5) {
            //draw left leg
            ctx.moveTo(50,120);
            ctx.lineTo(35,140);
            ctx.stroke();
            document.getElementById('firstDiv').innerHTML = incorrectGuess;
          }
          if (incorrectCount == 6) {
            //draw right leg
            ctx.moveTo(50,120);
            ctx.lineTo(65,140);
            ctx.stroke();
            document.getElementById('firstDiv').innerHTML = incorrectGuess;
            alert("YOU LOSE!")
            gameOn = false;
          }
        }
        allGuesses += [res];
      }
    }
    winGame();
  }
});
