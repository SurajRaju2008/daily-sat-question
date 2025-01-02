fetch('questions.json')
    .then(response => response.json()) 
    .then(questions => {               
        const today = new Date().toISOString().split('T')[0];
        const todaysQuestion = questions.find(q => q.date === today);})
