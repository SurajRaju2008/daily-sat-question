fetch('questions.json')
  .then(response => response.json()) // Parse the JSON response
  .then(questions => {               // Handle the array of questions
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format(NEED TO CHANGE TO JUST DAY)
    const todaysQuestion = questions.find(q => q.date === today); // Find today's question

    if (todaysQuestion) {
      displayQuestion(todaysQuestion); // Display the question if found
    } else {
      document.getElementById('question').innerHTML = "No question available for today."; // If question is not found
    }
  })

function displayQuestion(question) {
  const questionContainer = document.getElementById('question');
  const optionsHTML = []; // Array to hold option buttons

  // Use a for loop to create each option button
  for (let i = 0; i < 4; i++) {
    const option = question.options[i];
    optionsHTML += '<li><button onclick="checkAnswer(\'' + option + '\', \'' + question.answer + '\', \'' + question.explanation + '\')">' + option + '</button></li>';
  }
    // Set the inner HTML of the question container
  questionContainer.innerHTML = `
  <p>${question.question}</p>
  <ul>${optionsHTML.join('')}</ul>`;
}