const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routers/bookingRouter'); 

// Set up the express app
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the booking API');
});

// Use the booking routes
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error); // Log the error for debugging
    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});

// Set the port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});