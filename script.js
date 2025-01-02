fetch('questions.json')
    .then(response => response.json()) 
    .then(questions => {               
        const today = new Date().toISOString().split('T')[0];
        const todaysQuestion = questions.find(q => q.date === today);})
        const questionDisplay = document.getElementById("questionDisplay");
    
    // Loop through the questions
    if (currentIndex < questions.length) {
        questionDisplay.textContent = questions[currentIndex].text; // Display the current question
        currentIndex++; // Move to the next question
    } else {
        questionDisplay.textContent = "No more questions!";
        currentIndex = 0; // Reset the index if needed
    }

// Attach event listener to the button
document.getElementById("showQuestionBtn").addEventListener("click", displayNextQuestion);