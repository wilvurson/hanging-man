const words = [
    "COMPUTER", "PROGRAMMING", "JAVASCRIPT", "PYTHON", "HANGMAN", "DEVELOPER", "ALGORITHM", "FUNCTION", "VARIABLE", "ARRAY",
    "OBJECT", "LOOP", "CONDITION", "STRING", "NUMBER", "BOOLEAN", "DEBUGGING", "SYNTAX", "COMPILER", "INTERPRETER",
    "LIBRARY", "FRAMEWORK", "API", "DATABASE", "SERVER", "CLIENT", "HTML", "CSS", "WEB", "APPLICATION",
];

let word = "";
let guessed = [];
let guessesLeft = 7;

const displayWordElem = document.getElementById("display_word");
const hangmanStatus = document.getElementById("hangman_status");
const letterButtons = document.querySelectorAll(".letter");
const startBtn = document.querySelector(".start");
const box = document.querySelector(".box");
const resultScreen = document.getElementById("result_screen");
const resultMessage = document.getElementById("result_message");
const resultPlayBtn = resultScreen.querySelector("button");

function pickRandomWord() {
  word = words[Math.floor(Math.random() * words.length)];
  guessed = [];
  guessesLeft = 7;

  letterButtons.forEach((btn) => {
    btn.disabled = false;
    btn.style.backgroundColor = "";
    btn.style.color = "";           
    btn.style.borderColor = "";     
  });

  displayWord();
  updateStatus();
  updateHangmanImage();
  hideResultScreen();
}


function displayWord() {
  const display = word
    .split("")
    .map((letter) => (guessed.includes(letter) ? letter : "_"))
    .join(" ");
  displayWordElem.textContent = display;
}

function updateStatus() {
  hangmanStatus.textContent = `Guesses left : ${guessesLeft}`;
  hangmanStatus.style.pointerEvents = "none";
}

function updateHangmanImage() {
  const stage = 7 - guessesLeft;
  box.style.backgroundImage = `url('./images/hangman-${stage}.svg')`;
}

function disableAllButtons() {
  letterButtons.forEach((btn) => {
    btn.disabled = true;
  });
}

function showResultScreen(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = "flex";
}

function hideResultScreen() {
  resultScreen.style.display = "none";
}

letterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const letter = this.textContent;

    if (word.includes(letter)) {
      guessed.push(letter);
      this.disabled = true;
      this.style.backgroundColor = "lightgreen";
      this.style.color = "white";
        this.style.borderColor = "green";
    } else {
      guessesLeft--;
      updateStatus();
      updateHangmanImage();
      this.disabled = true;
      this.style.backgroundColor = "red";
      this.style.color = "white";
      this.style.borderColor = "darkred";
    }

    displayWord();

    if (!displayWordElem.textContent.includes("_")) {
      disableAllButtons();
      showResultScreen("You won.");
    }

    if (guessesLeft === 0) {
      disableAllButtons();
      showResultScreen(`The word was <> ${word} <> buddy.`);
    }
  });
});

startBtn.addEventListener("click", pickRandomWord);
resultPlayBtn.addEventListener("click", pickRandomWord);

pickRandomWord();
