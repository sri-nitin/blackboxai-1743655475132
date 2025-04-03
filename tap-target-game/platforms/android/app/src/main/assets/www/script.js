// Game state
let score = 0;
let timeLeft = 30;
let gameInterval;
let isGameRunning = false;

// DOM elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const finalScoreDisplay = document.getElementById('finalScore');
const tapSound = document.getElementById('tapSound');
const gameOverSound = document.getElementById('gameOverSound');

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
target.addEventListener('click', handleTargetClick);
target.addEventListener('touchstart', handleTargetClick);

// Game functions
function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    isGameRunning = true;
    
    // Update displays
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    
    // Show game screen
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Start timer
    clearInterval(gameInterval);
    gameInterval = setInterval(updateTimer, 1000);
    
    // Move target to random position
    moveTarget();
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function handleTargetClick() {
    if (!isGameRunning) return;
    
    // Play tap sound
    tapSound.currentTime = 0;
    tapSound.play();
    
    // Increase score
    score++;
    scoreDisplay.textContent = score;
    
    // Move target to new random position
    moveTarget();
}

function moveTarget() {
    const gameArea = gameScreen.getBoundingClientRect();
    const maxX = gameArea.width - target.offsetWidth;
    const maxY = gameArea.height - target.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.position = 'absolute';
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    
    // Play game over sound
    gameOverSound.currentTime = 0;
    gameOverSound.play();
    
    // Show game over screen
    gameScreen.classList.add('hidden');
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}