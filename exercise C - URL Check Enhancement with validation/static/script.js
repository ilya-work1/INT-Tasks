const Form = document.getElementById('form');
const status = document.getElementById('status');
const urlInput = document.getElementById('URLInput');

// Regular expression to validate URL format with top level domain
const urlRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

Form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');
    
    const url = urlInput.value;
    console.log('URL:', url);
    
    // Check URL format before sending request
    if (!urlRegex.test(url)) {
        console.log('Invalid URL format');
        window.alert("Invalid URL format");
        urlInput.value = ''; // Clear the input field
        return;
    }
    
    console.log('URL is valid, proceeding with check');
    checkURL(url);
});

async function checkURL(url) {
    try {
        const response = await fetch(`/check_url?url=${url}`);
        const data = await response.json();
        console.log('Response:', data);
        status.textContent = `Status code: ${data.status_code}`;
    } catch (error) {
        console.error('Error:', error);
        status.textContent = 'Error checking URL';
    }
}
