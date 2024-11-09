// Get the form and email input
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const feedbackInput = document.getElementById('FeedBack');

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Add submit event listener to the form
form.addEventListener('submit', function(e) {
    // Prevent the form from submitting
    e.preventDefault();
    
    // Get the form values
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const feedback = feedbackInput.value.trim();
    
    // Check if email is valid
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        emailInput.focus();
        return;
    }

    // Create data object to send
    const formData = {
        name: name,
        email: email,
        feedback: feedback
    };

    // Send data to backend
    fetch('/submit_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Feedback submitted successfully!');
            form.reset(); // Clear the form
        } else {
            alert('Error submitting feedback. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting feedback. Please try again.');
    });
});