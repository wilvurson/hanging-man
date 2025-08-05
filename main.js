const words = ['JAVASCRIPT', 'PYTHON', 'DEVELOPER', 'COMPUTER', 'SOFTWARE'];
const startButton = document.querySelector('.start_button');
const keyboard = document.querySelectorAll('.letter');
const wordDisplay = document.querySelector('.chosen_word');
const attemptsLeftDisplay = document.querySelector('.attempts_left');
const message = document.querySelector('.message');

let selectedWord = '';
let revealedLetters = [];
let attemptsLeft = 6;

function startGame() {
    // Reset game state
    selectedWord = words[Math.floor(Math.random() * words.length)];
    revealedLetters = Array(selectedWord.length).fill('_');
    attemptsLeft = 6;
    message.textContent = '';
    attemptsLeftDisplay.textContent = attemptsLeft;

    // Show underscores for each letter
    wordDisplay.textContent = revealedLetters.join(' ');

    // Enable all letter buttons
    keyboard.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '#636363';
    });
}

function guessLetter(letterButton) {
    const letter = letterButton.textContent;
    letterButton.disabled = true;

    if (selectedWord.includes(letter)) {
        // Reveal matching letters
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                revealedLetters[i] = letter;
            }
        }
        wordDisplay.textContent = revealedLetters.join(' ');

        // Check win condition
        if (!revealedLetters.includes('_')) {
            message.textContent = '🎉 You Win!';
            endGame();
        }

        letterButton.style.backgroundColor = '#4CAF50'; // green
    } else {
        // Wrong guess
        attemptsLeft--;
        attemptsLeftDisplay.textContent = attemptsLeft;

        if (attemptsLeft === 0) {
            message.textContent = `😢 You Lost! The word was: ${selectedWord}`;
            wordDisplay.textContent = selectedWord.split('').join(' ');
            endGame();
        }

        letterButton.style.backgroundColor = '#d9534f'; // red
    }
}

function endGame() {
    // Disable all buttons
    keyboard.forEach(button => button.disabled = true);
}

startButton.addEventListener('click', startGame);

keyboard.forEach(button => {
    button.addEventListener('click', () => guessLetter(button));
});