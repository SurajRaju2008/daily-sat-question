let selectedAnswer = null;
let currentQuestion = null;
const questionContainer = document.getElementById("question");
const btn = document.getElementById("button");
const url = "https://opentdb.com/api.php?amount=1&category=19&type=multiple"; // Fetch 1 multiple-choice question

// Fetch question from the Open Trivia Database API
let getQuestion = async () => {
  questionContainer.classList.remove("fade");

  try {
    const response = await fetch(url);
    const data = await response.json();
    const item = data.results[0]; // Assuming the API returns an array of questions

    currentQuestion = {
      text: item.question,
      options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
      correctAnswer: item.correct_answer,
      explanation: "No explanation available", // Placeholder explanation
    };

    // Store the question and today's date in localStorage
    localStorage.setItem("storedDate", today); // Store today's date
    localStorage.setItem("storedQuestion", JSON.stringify(currentQuestion)); // Store the question

    displayQuestion(currentQuestion); // Display the new question
  } catch (error) {
    console.error("Error fetching question:", error);
    questionContainer.innerHTML = "Sorry, there was an error fetching the question.";
  }
};

// Get today's date as a string (e.g., "2025-04-12")
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Retrieve stored date and question from localStorage
const storedDate = localStorage.getItem("storedDate");
const storedQuestion = localStorage.getItem("storedQuestion");

// If the question is already stored for today, use it
if (storedDate === today) {
  currentQuestion = JSON.parse(storedQuestion);
  displayQuestion(currentQuestion); // Display the stored question
} else {
  // If it's a new day, fetch a new question
  getQuestion();
}






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
  document.getElementById('displayInfo').innerHTML = resultMessage;
  document.getElementById('container').classList.add('show');
  document.getElementById('popup-buttons').innerHTML = `<button onclick="showExplanation()">Show Explanation</button>`;
  document.getElementById('popup-explanation').innerHTML = ''; 
}


function showExplanation() {
  document.getElementById('popup-explanation').innerHTML = currentQuestion.explanation;
}


function checkAnswer(selected, correctAnswer) {
  const isCorrect = selected === correctAnswer;
  const result = {
      correct: isCorrect,
      correctAnswer: correctAnswer,
      explanation: currentQuestion.explanation
  };
  
  // Store the result in sessionStorage
  sessionStorage.setItem('result', JSON.stringify(result));
  
  // Redirect to displayAnswer.html
  window.location.href = 'displayAnswer.html';
}

