// app.js
document.getElementById('submit-btn').addEventListener('click', function () {
    const inputText = document.getElementById('input-text').value;
    if (inputText) {
        // Placeholder translation logic
        // Replace with real translation logic if needed
        document.getElementById('output').innerHTML = `Translated text: ${inputText}`;
    } else {
        document.getElementById('output').innerHTML = 'Please enter some text.';
    }
});
