const words = ["JAVASCRIPT", "PYTHON", "HANGMAN", "COMPUTER", "DEVELOPER"];
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.querySelector(".word_display");
const attemptsLeftSpan = document.querySelector(".attempts_left");
const messageDiv = document.querySelector(".message");
const letterButtons = document.querySelectorAll(".letter");
const startButton = document.querySelector(".start_button");

function startGame() {
    // Pick random word
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    attemptsLeftSpan.textContent = remainingAttempts;
    messageDiv.textContent = "";
    
    // Enable all letters
    letterButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "#636363";
    });

    updateWordDisplay();
}

function updateWordDisplay() {
    const display = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    wordDisplay.textContent = display;

    // Check win condition
    if (!display.includes("_")) {
        messageDiv.textContent = "🎉 You Win!";
        disableAllLetters();
    }
}

function handleLetterClick(e) {
    const letter = e.target.textContent;

    if (guessedLetters.includes(letter) || remainingAttempts <= 0) return;

    guessedLetters.push(letter);
    e.target.disabled = true;

    if (!selectedWord.includes(letter)) {
        remainingAttempts--;
        attemptsLeftSpan.textContent = remainingAttempts;
        e.target.style.backgroundColor = "#a00000"; // wrong letter

        if (remainingAttempts === 0) {
            messageDiv.textContent = `💀 You Lost! Word was: ${selectedWord}`;
            revealWord();
            disableAllLetters();
        }
    } else {
        e.target.style.backgroundColor = "#228B22"; // correct letter
        updateWordDisplay();
    }
}

function revealWord() {
    wordDisplay.textContent = selectedWord.split("").join(" ");
}

function disableAllLetters() {
    letterButtons.forEach(btn => btn.disabled = true);
}

// Add event listeners
startButton.addEventListener("click", startGame);
letterButtons.forEach(button => button.addEventListener("click", handleLetterClick));