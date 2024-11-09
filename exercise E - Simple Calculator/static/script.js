function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = 'Please enter valid numbers';
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            num1: num1,
            num2: num2,
            operation: operation
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('result').textContent = data.error;
        } else {
            document.getElementById('result').textContent = `Result: ${data.result}`;
        }
    })
    .catch(error => {
        document.getElementById('result').textContent = 'An error occurred';
    });
}