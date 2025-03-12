chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_text") {
        let text = document.body.textContent || document.body.innerText;
        // Send the extracted text to your backend for summarization
        fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(data => {
            // Display the summary in the popup or another place
            sendResponse({ summary: data.summary });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: "Failed to summarize" });
        });
        return true;  // Keep the message channel open for async response
    }
});
