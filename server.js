// 1. Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // For handling requests between different ports (if needed)

// 2. Setup the Express app
const app = express();
const port = 3000; // We'll run this server on port 3000

// 3. Use middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json({ limit: '10mb' })); // Allow the server to read incoming JSON data
app.use(express.static(__dirname)); // Serve static files (like your HTML, CSS, assets) from the current directory

// 4. Create the route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Civic-AI-Negotiator.html'));
});

// 5. Create the API endpoint to SAVE the stance
app.post('/save-stance', (req, res) => {
    try {
        const finalData = req.body;
        if (!finalData || !finalData.participantId) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        // Define the folder and filename
        const stancesDir = path.join(__dirname, 'Stances');
        const filename = `result_${finalData.participantId}.json`;
        const filepath = path.join(stancesDir, filename);

        // Check if the "Stances" directory exists, if not, create it
        if (!fs.existsSync(stancesDir)) {
            fs.mkdirSync(stancesDir, { recursive: true });
            console.log('Created "Stances" directory.');
        }

        // Write the data to the file
        fs.writeFileSync(filepath, JSON.stringify(finalData, null, 2), 'utf8');

        console.log(`Successfully saved stance to: ${filepath}`);
        
        // Send a success response back to the front-end
        res.status(200).json({ success: true, message: `Stance saved to ${filename}` });

    } catch (error) {
        console.error('Error saving stance:', error);
        res.status(500).json({ success: false, message: 'Failed to save stance on server.' });
    }
});

// 6. Start the server
app.listen(port, () => {
    console.log(`Server running! Open your browser to http://localhost:${port}`);
});
