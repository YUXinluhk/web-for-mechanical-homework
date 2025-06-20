document.addEventListener('DOMContentLoaded', () => {
    const problemTextElement = document.getElementById('problem-text');
    const answerInputElement = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const nextProblemButton = document.getElementById('next-problem-button');
    const feedbackTextElement = document.getElementById('feedback-text');

    let currentProblem = {
        num1: 0,
        num2: 0,
        operator: '+',
        answer: 0
    };

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
        const userAnswer = parseInt(answerInputElement.value, 10);

        feedbackTextElement.classList.remove('correct', 'incorrect'); // Reset classes

        if (isNaN(userAnswer)) {
            feedbackTextElement.textContent = "Please enter a valid number.";
            feedbackTextElement.className = 'incorrect';
            return;
        }

        if (userAnswer === currentProblem.answer) {
            feedbackTextElement.textContent = "Correct!";
            feedbackTextElement.className = 'correct';
        } else {
            feedbackTextElement.textContent = `Incorrect. The answer was ${currentProblem.answer}. Try the next one!`;
            feedbackTextElement.className = 'incorrect';
        }
    }

    function nextProblem() {
        displayProblem();
        answerInputElement.value = '';
        feedbackTextElement.textContent = '';
        feedbackTextElement.className = ''; // Clear classes
        answerInputElement.focus();
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
