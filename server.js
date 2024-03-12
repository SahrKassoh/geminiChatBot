// Load environment variables from the .env file.
require('dotenv').config();
console.log(`API Key: ${process.env.GEMINI_API_KEY}`);

// Import the necessary modules.
const express = require('express');
const cors = require('cors');
const app = express(); // Create an instance of express.

const PORT = 8000; // Define the port number.

// Apply middleware.
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing).
app.use(express.json()); // Enable server to accept JSON payloads.

// Just for debugging, print the API key to the console.
console.log(process.env.GEMINI_API_KEY);

// Import Google Generative AI module and initialize with the API key.
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define a POST route for handling the generation requests.
app.post('/gemini', async (req, res) => {
    // Initialize the model.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start a new chat session.
    const chat = model.startChat({
        history: req.body.history
    });

    // Extract the message from the request body.
    const msg = req.body.message;

    // Send the message to the model and wait for the response.
    const result = await chat.sendMessage(msg);
    const response = await result.response;

    // Extract the text from the response and send it back to the client.
    const text = response.text();
    res.send(text);
});

// Start the server and listen on the specified port.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
