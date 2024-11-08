async function convertTemperature() {
    const celsiusInput = document.getElementById('celsius').value;
    const resultDiv = document.getElementById('result');
    
    // Input validation
    if (celsiusInput === '' || celsiusInput === null) {
        alert('Please enter a temperature');
        return;
    }

    const celsius = parseFloat(celsiusInput);
    
    // Check if input is a valid number
    if (isNaN(celsius)) {
        alert('Please enter a valid number');
        return;
    }
    
    // Check if input is within reasonable range (-273.15°C is absolute zero)
    if (celsius < -273.15) {
        alert('Temperature cannot be below absolute zero (-273.15°C)');
        return;
    }

    // Check if input is too large
    if (celsius > 1000000) {
        alert('Temperature is unreasonably high. Please enter a smaller value');
        return;
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                celsius: celsius
            })
        });

        const data = await response.json();
        
        if (data.success) {
            resultDiv.textContent = `Temperature in Fahrenheit: ${data.fahrenheit}°F`;
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error converting temperature. Please try again.');
        console.error(error);
    }
}

// Add event listener for Enter key
document.getElementById('celsius').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});