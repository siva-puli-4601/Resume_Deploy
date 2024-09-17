const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');

// Load environment variables from .env file
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist/assign')));

// Use the routes defined in your routes file
app.use('/api/users1', require('./routes/routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/assign', 'index.html'));
});

// Define the port for the server
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
