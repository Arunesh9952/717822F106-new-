// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9000; // Main server runs on port 9876

// Enable CORS for frontend communication
app.use(cors());

// Endpoint to handle number requests
app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;

  // Map the ID to the corresponding mock server API endpoint
  let url;
  switch (id) {
    case 'prime':
      url = 'http://localhost:9001/primes'; // Mock prime numbers API
      break;
    case 'fibo':
      url = 'http://localhost:9001/fibo'; // Mock Fibonacci numbers API
      break;
    case 'even':
      url = 'http://localhost:9001/even'; // Mock even numbers API
      break;
    case 'rand':
      url = 'http://localhost:9001/rand'; // Mock random numbers API
      break;
    default:
      return res.status(400).json({ error: 'Invalid number type' });
  }

  try {
    // Fetch numbers from the mock server API
    const response = await axios.get(url, { timeout: 500 });

    // Return the response in the required format
    res.json({
      numbers: response.data.numbers,
    });
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Main Server running on http://localhost:${port}`);
});