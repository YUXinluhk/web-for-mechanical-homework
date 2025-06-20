document.addEventListener('DOMContentLoaded', () => {
    const problemTextElement = document.getElementById('problem-text');
    const answerInputElement = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const nextProblemButton = document.getElementById('next-problem-button');
    const feedbackTextElement = document.getElementById('feedback-text');

    // DOM elements for stats and timer
    const correctCountElement = document.getElementById('correct-count');
    const incorrectCountElement = document.getElementById('incorrect-count');
    const streakCountElement = document.getElementById('streak-count');
    const timerDisplayElement = document.getElementById('timer-display');

    let currentProblem = {
        num1: 0,
        num2: 0,
        operator: '+',
        answer: 0
    };

    // Statistics variables
    let correctCount = 0;
    let incorrectCount = 0;
    let currentStreak = 0;

    // Timer variables
    let timerInterval;
    let secondsElapsed = 0;

    function updateStatsDisplay() {
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
        streakCountElement.textContent = currentStreak;
    }

    function startTimer() {
        stopTimer(); // Clear any existing timer
        secondsElapsed = 0;
        timerDisplayElement.textContent = `${secondsElapsed}s`;
        timerInterval = setInterval(() => {
            secondsElapsed++;
            timerDisplayElement.textContent = `${secondsElapsed}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1; // Numbers between 1 and 10
        const num2 = Math.floor(Math.random() * 10) + 1;
        // For now, let's stick to addition. We can extend this later.
        const operator = '+';
        let problemString = '';
        let answer = 0;

        switch (operator) {
            case '+':
                problemString = `${num1} + ${num2} = ?`;
                answer = num1 + num2;
                break;
            // We can add more cases for subtraction, multiplication, etc.
            // case '-':
            //     problemString = `${num1} - ${num2} = ?`;
            //     answer = num1 - num2;
            //     break;
        }

        currentProblem = { num1, num2, operator, answer };
        return problemString;
    }

    function displayProblem() {
        problemTextElement.textContent = generateProblem();
    }

    function checkAnswer() {
        stopTimer(); // Stop timer when an answer is submitted
        const userAnswer = parseInt(answerInputElement.value, 10);

        feedbackTextElement.classList.remove('correct', 'incorrect'); // Reset classes

        if (isNaN(userAnswer)) {
            feedbackTextElement.textContent = "Please enter a valid number.";
            feedbackTextElement.className = 'incorrect';
            // We don't update game stats for invalid input, but we could if desired
            return;
        }

        if (userAnswer === currentProblem.answer) {
            feedbackTextElement.textContent = "Correct!";
            feedbackTextElement.className = 'correct';
            correctCount++;
            currentStreak++;
        } else {
            feedbackTextElement.textContent = `Incorrect. The answer was ${currentProblem.answer}. Try the next one!`;
            feedbackTextElement.className = 'incorrect';
            incorrectCount++;
            currentStreak = 0;
        }
        updateStatsDisplay();
    }

    function nextProblem() {
        displayProblem();
        answerInputElement.value = '';
        feedbackTextElement.textContent = '';
        feedbackTextElement.className = ''; // Clear classes
        answerInputElement.focus();
        updateStatsDisplay(); // Update stats display (e.g., if streak was reset but not from a wrong answer)
        startTimer(); // Start timer for the new problem
    }

    // Event Listeners
    submitButton.addEventListener('click', checkAnswer);
    nextProblemButton.addEventListener('click', nextProblem);

    // Allow submitting with Enter key in the input field
    answerInputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    // Load the first problem when the page loads
    nextProblem();
});
