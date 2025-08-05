const wordList = ["JAVASCRIPT", "PYTHON", "HANGMAN", "MONSTER", "PROGRAM", "VARIABLE", "REACT"]; // you can add more
const maxAttempts = 6;

let chosenWord = "";
let guessedLetters = [];
let attemptsLeft = maxAttempts;

const wordDisplay = document.querySelector(".word_display");
const message = document.querySelector(".message"); // ✅ FIXED: changed from getElementById
const attemptsSpan = document.querySelector(".attempts_left");
const letterButtons = document.querySelectorAll(".letter");
const startButton = document.querySelector(".start_button");

function pickRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

function displayWord() {
    let display = "";
    for (let letter of chosenWord) {
        display += guessedLetters.includes(letter) ? letter + " " : "_ ";
    }
    wordDisplay.textContent = display.trim();
}

function updateAttempts() {
    attemptsSpan.textContent = attemptsLeft;
}

function disableAllButtons() {
    letterButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = "#999";
        button.style.cursor = "default";
    });
}

function showMessage(text, color = "black") {
    message.textContent = text;
    message.style.color = color;
}

function checkGameStatus() {
    const currentDisplay = wordDisplay.textContent.replace(/ /g, "");
    if (currentDisplay === chosenWord) {
        showMessage("You Won! 🎉", "green");
        disableAllButtons();
    } else if (attemptsLeft <= 0) {
        showMessage(`Game Over! The word was "${chosenWord}" 😢`, "red");
        disableAllButtons();
    }
}

function handleGuess(letter, button) {
    if (guessedLetters.includes(letter) || attemptsLeft <= 0) return;

    guessedLetters.push(letter);
    button.disabled = true;
    button.style.backgroundColor = "#999";
    button.style.cursor = "default";

    if (!chosenWord.includes(letter)) {
        attemptsLeft--;
    }

    displayWord();
    updateAttempts();
    checkGameStatus();
}

function setupGame() {
    chosenWord = pickRandomWord();
    guessedLetters = [];
    attemptsLeft = maxAttempts;
    updateAttempts();
    showMessage("");
    displayWord();

    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "#636363";
        button.style.cursor = "pointer";
        const letter = button.textContent;
        button.onclick = () => handleGuess(letter, button);
    });
}

// Start button click listener
startButton.addEventListener("click", setupGame);

// Start the game on load
setupGame();