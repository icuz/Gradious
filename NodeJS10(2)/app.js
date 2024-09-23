const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookingRoutes = require('./routers/bookingRouter'); 
const loginController = require('./controller/loginController'); // Import login controller
const bookingController = require('./controller/bookingController'); // Import booking controller
const userController = require('./controller/userController'); // Import user controller
const jwtMiddelware = require('./middleware/jwtMiddleware');
// Set up the express app
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define a root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Changed to index.html
});

// Login route
app.post('/api/login', loginController.login);

// Register route
app.post('/api/register', loginController.register); // Added register route

// Admin route
app.get('/admin',jwtMiddelware.isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Users route
app.get('/users',jwtMiddelware.isUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html')); // Changed to users.html
});

// Use the booking routes
app.use('/api/bookings',jwtMiddelware.isUser, bookingRoutes);

// Endpoint to fetch all users
app.get('/api/users', userController.getAllUsers);

// Endpoint to fetch total users excluding admins
app.get('/api/users/total', bookingController.getTotalUsers);

// Endpoint to fetch total bookings with status "Confirmed" or "Pending"
app.get('/api/bookings/total', bookingController.getTotalBookings);

// Endpoint to fetch failed bookings
app.get('/api/bookings/failed', bookingController.getFailedBookings);


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