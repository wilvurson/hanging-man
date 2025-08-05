const words = ["hool", "food", "code", "computer"];
const word = words[Math.floor(Math.random() * words.length)];
const startBtn = document.querySelector(".start");
let guessed = [];
let wrongGuesses = 0;

function displayWord() {
  const display = word
    .split("")
    .map((letter) => (guessed.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("display-word").textContent = display;
}

function updateStatus() {
  document.getElementById(
    "hangman-status"
  ).textContent = `Wrong guesses: ${wrongGuesses}`;
}

document.querySelectorAll(".word button").forEach((btn) => {
  btn.addEventListener("click", function () {
    const letter = this.textContent;
    this.disabled = true;
    if (word.includes(letter)) {
      guessed.push(letter);
    } else {
      wrongGuesses++;
      updateStatus();
    }
    displayWord();
    if (!document.getElementById("display-word").textContent.includes("_")) {
      alert("You win!");
    }
    if (wrongGuesses >= 6) {
      alert(`You lose! The word was: ${word}`);
    }
  });
});

displayWord();
updateStatus();
