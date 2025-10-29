
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../../'))); // Serve static files from the root

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.post('/save-stance', (req, res) => {
  // This endpoint is now a placeholder. 
  // The actual form submission will be handled by Netlify Forms.
  res.status(200).json({ success: true, message: 'Data received' });
});

module.exports.handler = serverless(app);
