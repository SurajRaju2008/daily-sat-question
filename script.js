fetch('questions.json')
  .then(response => response.json())
  .then(questions => {
    const today = new Date().toISOString().split('T')[0];
    const todaysQuestion = questions.find(q => q.date === today);

    if (todaysQuestion) {
      document.getElementById('question').innerHTML = `
        <p>${todaysQuestion.question}</p>
        <ul>
          ${todaysQuestion.options.map(option =>
            `<li><button onclick="checkAnswer('${option}', '${todaysQuestion.answer}', '${todaysQuestion.explanation}')">${option}</button></li>`
          ).join('')}
        </ul>
      `;
    } else {
      document.getElementById('question').innerHTML = "No question for today.";
    }
  })