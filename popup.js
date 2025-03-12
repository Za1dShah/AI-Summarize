document.getElementById('summarize-btn').addEventListener('click', async function() {
    const text = document.getElementById('text-input').value;
    const summaryOutput = document.getElementById('summary-output');
    const loadingIndicator = document.getElementById('loading');

    if (text.trim() === '') {
        alert('Please enter some text to summarize!');
        return;
    }

    // Show loading
    loadingIndicator.classList.remove('hidden');
    summaryOutput.textContent = ''; // Clear previous summary

    try {
        // Make the API call to the backend (replace with your own API logic)
        const response = await fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Failed to summarize text.');
        }

        const data = await response.json();
        summaryOutput.textContent = data.summary;
    } catch (error) {
        summaryOutput.textContent = 'Error: ' + error.message;
    } finally {
        loadingIndicator.classList.add('hidden');
    }
});

// Toggle Dark Mode
document.getElementById('mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
