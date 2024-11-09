function Count_Words() {
    // Get the text from textarea
    const text = document.getElementById('words').value;
    
    // Remove extra spaces and split the text into words
    const words = text.trim().split(/\s+/);
    
    // Count words (if the textarea is empty, count will be 0)
    const wordCount = text.trim() === '' ? 0 : words.length;
    
    // Display the result
    document.getElementById('result').innerHTML = `Total words: ${wordCount}`;
}