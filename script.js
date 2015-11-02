var correctGuess = [];
var incorrectGuess = [];
var allGuesses = [];
var wordStore = '{ "words" : [' +
'{ "word":"dinosaur", "hint":"Reptiles that lived millions of years ago."},' +
'{ "word":"dog", "hint":"Man\'s best friend."} ]}';

var obj = JSON.parse(wordStore);
var randValue = Math.floor(Math.random()*(obj.words.length));
var randWord = obj.words[randValue].word.toUpperCase();
var randHint = obj.words[randValue].hint;

console.log(randWord, "hint:", randHint);

var correctLetterDisplay = document.getElementById('lastDiv');
var content = [];
for (var i = 0; i < randWord.length; i++) {
  content.push("_ ");
}
console.log(content);
content = content.join('');
console.log(content);
content = document.createTextNode(content);
correctLetterDisplay.appendChild(content);
correctLetterDisplay.style.textAlign = "center";

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

addEventListener("keydown", function(event){
  var val = event.keyCode;
  var res = String.fromCharCode(val);
  var outerCount = 0;
  var countLetter = 0;
  var indexHolder = []
  if (res.match(/[a-z]/i)) {
    console.log(res, "is an alphabet character.");

    for (var i=0; i < allGuesses.length; i++) {
      if (res == allGuesses[i]) {
        alert("You have already guessed that letter!");
        outerCount += 1;
      }
    }
    if (outerCount == 0) {
      for (var i=0; i < randWord.length;i++) {
        if (res == randWord[i]) {
          correctGuess += [res];
          indexHolder = getAllIndexes(randWord, res);
          for (var i = 0; i < indexHolder.length; i++) {
            console.log(content[2*i]);
            content[2*i] = res;
            console.log(content[2*i]);
          }
          correctLetterDisplay.appendChild(content);
          correctLetterDisplay.style.textAlign = "center";
          countLetter += 1;
          outerCount = 0;
        }
      }
      if (countLetter == 0) {
        incorrectGuess += [res];
        outerCount = 0;
      }
      allGuesses += [res];
    }
  }
/**
  else {
    alert("That's not a letter you dummy!");
  }
  **/
  console.log("correct:", correctGuess, "incorrect:", incorrectGuess, "all guesses:", allGuesses);
});
