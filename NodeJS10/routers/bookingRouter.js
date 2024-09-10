const express = require('express');
const bookingController = require('../controller/bookingController.js');
const userController = require('../controller/userController.js');
const router = express.Router();

// Fetch all bookings
router.get('/', bookingController.getAllBookings);

// Fetch a booking by its ID
router.get('/:id', bookingController.getBookingById);

// Create a new booking
router.post('/', bookingController.createBooking);

// Update a booking by its ID
router.put('/:id', bookingController.updateBooking);

// Delete a booking by its ID
router.delete('/:id', bookingController.deleteBooking);

// Fetch total users excluding admins
router.get('/admin/total-users', userController.getTotalUsers);

// Fetch total bookings with status "Confirmed" or "Pending"
router.get('/admin/total-bookings', bookingController.getTotalBookings);

// Fetch failed bookings with status "Cancelled"
router.get('/admin/failed-bookings', bookingController.getFailedBookings);

// Fetch pending bookings
router.get('/admin/pending-bookings', bookingController.getPendingBookings);

// Fetch confirmed bookings
router.get('/admin/confirmed-bookings', bookingController.getConfirmedBookings);

// Create a new user
router.post('/admin/create-user', userController.createUser);

router.get('/admin/logs', (req, res) => {
    const logFilePath = path.join(__dirname, '../logs/admin.log');
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to read log file' });
        }
        res.json({ success: true, logs: data });
    });
});

// Delete a user by its ID
router.delete('/admin/delete-user/:id', userController.deleteUser);

// Fetch all users
router.get('/admin/users', userController.getAllUsers);

// Update a user by its ID
router.put('/admin/update-user/:id', userController.updateUser);

module.exports = router;