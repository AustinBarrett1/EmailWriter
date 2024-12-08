document.addEventListener('DOMContentLoaded', function() {
    const saveKeyButton = document.getElementById('saveKeyButton');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const setupDiv = document.getElementById('setup');
    const contentDiv = document.getElementById('content');

    // Check if API key is already saved
    browser.storage.local.get('apiKey').then(result => {
        if (result.apiKey) {
            // API key exists, show main content
            setupDiv.classList.add('d-none');
            contentDiv.classList.remove('d-none');
        } else {
            // API key not set, show setup input
            setupDiv.classList.remove('d-none');
            contentDiv.classList.add('d-none');
        }
    });

    // Save the API key
    saveKeyButton.addEventListener('click', function() {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            browser.storage.local.set({ apiKey: apiKey }).then(() => {
                alert('API key saved!');
                setupDiv.classList.add('d-none');
                contentDiv.classList.remove('d-none');
            });
        } else {
            alert('Please enter a valid API key.');
        }
    });

    // Process button event
    document.getElementById('processButton').addEventListener('click', async() => {
        // Scrub the input text before processing
        let inputText = scrubInput(document.getElementById('inputText').value);
        const action = document.getElementById('action').value;

        if (inputText === "") {
            alert("Please enter some text to process.");
            return;
        }

        try {
            const apiKey = await getApiKey(); // Retrieve API key
            const resultText = await processText(inputText, action, apiKey);
            document.getElementById('resultText').value = resultText;
        } catch (error) {
            document.getElementById('resultText').value = `Error: ${error.message}`;
        }
    });
});

// Function to scrub user input by removing special characters and trimming
function scrubInput(input) {
    // Remove special characters (basic example)
    const sanitizedInput = input.replace(/[<>]/g, "").trim();
    return sanitizedInput;
}

// Function to retrieve API key from storage
function getApiKey() {
    return new Promise((resolve, reject) => {
        browser.storage.local.get('apiKey').then(result => {
            if (result.apiKey) {
                resolve(result.apiKey);
            } else {
                reject(new Error("API key is missing."));
            }
        });
    });
}

// Updated processText function to accept apiKey
async function processText(text, action, apiKey) {
    const promptMap = {
        grammar: `Correct the grammar of this text: ${text}`,
        expand: `Expand this text: ${text}`,
        summarize: `Summarize this text: ${text}`,
        email: `Format this text into an email format: ${text}`
    };

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptMap[action] }],
        max_tokens: 500
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Use the retrieved API key here
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized: Check your API key.");
            } else if (response.status === 429) {
                throw new Error("Rate limit exceeded: Try again later.");
            } else {
                throw new Error(`Unexpected error: ${response.statusText}`);
            }
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error("Invalid response from API.");
        }
    } catch (error) {
        console.error("Error processing text:", error);
        throw error;
    }
}