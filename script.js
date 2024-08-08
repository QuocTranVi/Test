const gameArea = document.getElementById('gameArea');
const pointsInput = document.getElementById('pointsInput');
const startGameButton = document.getElementById('startGame');
const restartButton = document.getElementById('restart');
const timerDisplay = document.getElementById('timer');
const gameTitle = document.getElementById('gameTitle');

let timer;
let timeElapsed = 0;
let currentNumber = 1;
let totalPoints = 0;

startGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    totalPoints = parseInt(pointsInput.value);
    currentNumber = 1;
    timeElapsed = 0;
    gameTitle.textContent = "LET'S PLAY";
    gameTitle.className = '';
    gameArea.innerHTML = '';
    clearInterval(timer);
    timer = setInterval(updateTimer, 100);

    for (let i = 1; i <= totalPoints; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = i;
        button.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
        button.style.top = Math.random() * (gameArea.clientHeight - 50) + 'px';

        button.addEventListener('click', () => handleButtonClick(button, i));
        gameArea.appendChild(button);
    }

    restartButton.style.display = 'none';
}

function handleButtonClick(button, number) {
    if (number === currentNumber) {
        button.style.backgroundColor = 'red';

        setTimeout(() => {
            button.style.opacity = '0'; 
            setTimeout(() => button.remove(), 500); 
        }, 1000);
        
        currentNumber++;

        if (currentNumber > totalPoints) {
            clearInterval(timer);
            gameTitle.textContent = 'ALL CORRECT';
            gameTitle.className = 'allCorrect';
            restartButton.style.display = 'block';
        }
    } else {
        clearInterval(timer);
        gameTitle.textContent = "GAME OVER";
        gameTitle.className = 'gameOver';
        restartButton.style.display = 'block';
    }
}

function updateTimer() {
    timeElapsed += 0.1;
    timerDisplay.textContent = `Time: ${timeElapsed.toFixed(1)}s`;
}

function restartGame() {
    startGame();
}
