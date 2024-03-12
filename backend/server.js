import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

// Allow requests from your React application's domain
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// Route to handle the proxy request to the external API
app.post('/api/calculate-emissions', async (req, res) => {
  try {
    // API endpoint
    const url = 'https://api.gravityclimate.com/reports/calculate-manufacturing-emissions';

    // Headers
    const headers = {
      'X-Gravity-Key-Id': 'organization_api_key_01HRD73D3593672ENA29DX718F',
      'X-Gravity-Key-Secret': '095a9c80-25f9-fb94-b9d1-478df0f55a2a',
      'Content-Type': 'application/json'
    };

    console.log(req.body)
    // Make POST request to API using fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body) // Send the request body received from the client
    });

    // Parse response as JSON
    const responseData = await response.json();
  //  console.log(responseData)
    // Send the response back to the client
    res.json(responseData);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
