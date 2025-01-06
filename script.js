let selectedAnswer = null;
let currentQuestion = null;

fetch('questions.json')
  .then(response => response.json()) // Parse the JSON response
  .then(data => { // Handle the entire question data
    const today = new Date().getDate(); // Get today's day (1-31)
    currentQuestion = data.questions.find(q => q.id == today); // Find the question for today by ID

    if (currentQuestion) {
      displayQuestion(currentQuestion); // Display the question if found
    } else {
      document.getElementById('question').innerHTML = "No question available for today."; // If question is not found
    }
  });

function displayQuestion(question) {
  const questionContainer = document.getElementById('question');
  const optionsHTML = []; // Array to hold option buttons

  // Check if the question has options, and if so, create buttons for each option
  if (question.options) {
    for (let i = 0; i < question.options.length; i++) {
      const option = question.options[i];
      optionsHTML.push(`<button onclick="selectAnswer('${option}')">${option}</button>`);
    }
  }

  // Set the inner HTML of the question container
  questionContainer.innerHTML = `
    <p>${question.text}</p>
    <ul>${optionsHTML.join('')}</ul>`;

  document.getElementById('button').innerHTML = '';

  // Update the button only after an answer is selected
  if (selectedAnswer) {
    document.getElementById('button').innerHTML = `<button onclick="checkAnswer('${selectedAnswer}', '${question.correctAnswer}')">Check Answer</button>`;
  }
}

// Store selected answer
function selectAnswer(option) {
  selectedAnswer = option;
  displayQuestion(currentQuestion);
}


function displayExplation(isCorrect) {
  const resultContainer = document.getElementById('result');
  const resultMessage = isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`;
  document.getElementById('popup-text').innerHTML = resultMessage;
  document.getElementById('popup').classList.add('show');
  document.getElementById('popup-buttons').innerHTML = `<button onclick="showExplanation()">Show Explanation</button>`;
  document.getElementById('popup-explanation').innerHTML = ''; 
}


function showExplanation() {
 
  document.getElementById('popup-explanation').innerHTML = currentQuestion.explanation;
}


function checkAnswer(selected, correctAnswer) {
  const isCorrect = selected == correctAnswer;
  displayExplation(isCorrect);
}
