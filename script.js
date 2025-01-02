fetch('questions.json')
  .then(response => response.json()) // Parse the JSON response
  .then(data => { // Handle the entire question data
    const today = new Date().getDate(); // Get today's day (1-31)
    const todaysQuestion = data.questions.find(q => q.id == today); // Find the question for today by ID

    if (todaysQuestion) {
      displayQuestion(todaysQuestion); // Display the question if found
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
      optionsHTML.push(`<li><button>${option}</button></li>`);
    }
    document.getElementById.('button').innerHTML = '<li><button onclick = "checkAnswer(\'' + option + '\', \'' + question.correctAnswer + '\')">' + checkAnswer + '</button></li>';
  }

  // Set the inner HTML of the question container
  questionContainer.innerHTML = `
    <p>${question.text}</p>
    <ul>${optionsHTML.join('')}</ul>`;
}

function checkAnswer(selected, correctAnswer) {
  const resultContainer = document.getElementById('result');
  if (selected == correctAnswer) {
    resultContainer.innerHTML = "Correct!";
  } else {
    resultContainer.innerHTML = "Incorrect! The correct answer is: " + correctAnswer;
  }
}
