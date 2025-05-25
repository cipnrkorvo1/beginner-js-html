const result = document.getElementById('result');
const moves = ['rock', 'paper', 'scissors'];
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

function play(move) {
    // Randomly select a move for the computer
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    
    // Determine the result
    if (move === computerMove) {
        result.textContent = "It's a tie!";
        // no score change
    } else if (
        (move === 'rock' && computerMove === 'scissors') ||
        (move === 'paper' && computerMove === 'rock') ||
        (move === 'scissors' && computerMove === 'paper')
    ) {
        result.textContent = 'You win!';
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        result.textContent = 'You lose!';
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
}