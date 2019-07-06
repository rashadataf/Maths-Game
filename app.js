let playing = false;
let score;
let handle;
let timeRemaining;
let answer;
document.querySelector(".startReset").addEventListener("click", function() {
  if (playing === false) {
    playing = true;
    score = 0;
    document
      .querySelectorAll(".scoreValue")
      .forEach(element => (element.innerHTML = score));
    document.querySelector(".timeRemaining").style.display = "block";
    timeRemaining = 60;
    document.querySelector(".time").innerHTML = timeRemaining;
    document.querySelector(".startReset").innerHTML = "Reset Gme";
    startCounter();
    generateQA();
  } else {
    location.reload();
  }
});

function startCounter() {
  handle = setInterval(function() {
    timeRemaining -= 1;
    if (timeRemaining === 0) {
      stopCounter();
    }
    document.querySelector(".time").innerHTML = timeRemaining;
  }, 1000);
}

function stopCounter() {
  clearInterval(handle);
  document.querySelector(".gameOver").style.display = "block";
  document.querySelector(".timeRemaining").style.display = "none";
}

function generateQA() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  answer = x * y;
  document.querySelector(".questions").innerHTML = x + "x" + y;
  let values = [answer];
  for (let i = 1; i < 4; i++) {
    const value =
      (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
    values[i] = value;
  }
  values = shuffle(values);
  let choices = document.querySelectorAll(".choice");
  choices.forEach(choice => (choice.innerHTML = values.pop()));
}

document.querySelectorAll(".choice").forEach(choice =>
  choice.addEventListener("click", function() {
    if (parseInt(choice.innerHTML) === answer) {
      score += 1;
      updateScore();
      document.querySelector(".correct").style.display = "block";
      setTimeout(function() {
        document.querySelector(".correct").style.display = "none";
      }, 700);
      generateQA();
    } else {
      document.querySelector(".wrong").style.display = "block";
      setTimeout(function() {
        document.querySelector(".wrong").style.display = "none";
      }, 700);
    }
  })
);

function updateScore() {
  document
    .querySelectorAll(".scoreValue")
    .forEach(element => (element.innerHTML = score));
}

// to shuffle a given array
// this function was taken from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
