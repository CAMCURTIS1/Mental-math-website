document.addEventListener('DOMContentLoaded', () => {
    const additionButton = document.getElementById('addition');
    const multiplicationButton = document.getElementById('multiplication');
    const squaringButton = document.getElementById('squaring');
    const problemContainer = document.getElementById('problem');
    const answerInput = document.getElementById('answer-input');
    const checkButton = document.getElementById('check-answer');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const backButton = document.getElementById('back-button');
    const buttonContainer = document.querySelector('.button-container');
    const gameArea = document.querySelector('.game');
    const digitSelection = document.querySelector('.digit-selection');
    const digitButtons = document.querySelectorAll('.digit-button');

    let currentOperation = '';
    let currentProblem;
    let currentAnswer;
    let score = 0;
    let totalAttempts = 0;
    let numDigits = 1;
    let problemHistory = [];
    const historyLimit = 5;

    function startGame() {
        digitSelection.style.display = 'none';
        gameArea.style.display = 'block';
        score = 0;
        totalAttempts = 0;
        problemHistory = [];
        updateScore();
        generateProblem();
    }

    function generateProblem() {
        const max = Math.pow(10, numDigits) - 1;
        const min = Math.pow(10, numDigits - 1);
        let a, b;
        let newProblem;

        do {
            switch (currentOperation) {
                case 'addition':
                    a = Math.floor(Math.random() * (max - min + 1)) + min;
                    b = Math.floor(Math.random() * (max - min + 1)) + min;
                    newProblem = `${a} + ${b}`;
                    currentAnswer = a + b;
                    break;
                case 'multiplication':
                    a = Math.floor(Math.random() * (max - min + 1)) + min;
                    b = Math.floor(Math.random() * (max - min + 1)) + min;
                    newProblem = `${a} × ${b}`;
                    currentAnswer = a * b;
                    break;
                case 'squaring':
                    a = Math.floor(Math.random() * (max - min + 1)) + min;
                    newProblem = `${a}²`;
                    currentAnswer = a * a;
                    break;
            }
        } while (problemHistory.includes(newProblem));

        problemHistory.push(newProblem);
        if (problemHistory.length > historyLimit) problemHistory.shift();

        currentProblem = newProblem;
        problemContainer.textContent = currentProblem;
        feedback.textContent = '';
        answerInput.value = '';
        answerInput.style.borderColor = '#ccc';
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (isNaN(userAnswer)) {
            feedback.textContent = 'Please enter a valid number.';
            feedback.style.color = 'orange';
            return;
        }
        totalAttempts++;
        if (userAnswer === currentAnswer) {
            score++;
            feedback.textContent = 'Correct! Well done!';
            feedback.style.color = 'green';
            answerInput.style.borderColor = 'green';
            updateScore();
            generateProblem();
        } else {
            feedback.textContent = 'Incorrect. Try again!';
            feedback.style.color = 'red';
            answerInput.style.borderColor = 'red';
            updateScore();
        }
        answerInput.value = '';
        answerInput.focus();
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score} / ${totalAttempts}`;
    }

    additionButton.addEventListener('click', () => {
        currentOperation = 'addition';
        buttonContainer.style.display = 'none';
        digitSelection.style.display = 'flex';
    });

    multiplicationButton.addEventListener('click', () => {
        currentOperation = 'multiplication';
        buttonContainer.style.display = 'none';
        digitSelection.style.display = 'flex';
    });

    squaringButton.addEventListener('click', () => {
        currentOperation = 'squaring';
        buttonContainer.style.display = 'none';
        digitSelection.style.display = 'flex';
    });

    checkButton.addEventListener('click', checkAnswer);

    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    backButton.addEventListener('click', () => {
        gameArea.style.display = 'none';
        buttonContainer.style.display = 'flex';
    });

    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            numDigits = parseInt(button.getAttribute('data-digits'));
            startGame();
        });
    });

    answerInput.addEventListener('input', () => {
        answerInput.value = answerInput.value.replace(/[^0-9]/g, '');
    });
});
