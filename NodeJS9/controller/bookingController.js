const Booking = require('../models/booking');

// Helper function to validate booking details
const validateBookingDetails = (booking) => {
    const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = booking;
    if (!customer_name || !booking_date || !booking_time || !total_amount || !status || !payment_method || !duration_minutes) {
        return 'All fields are required';
    }
    if (isNaN(total_amount) || total_amount <= 0) {
        return 'Total amount must be a positive number';
    }
    if (isNaN(duration_minutes) || duration_minutes <= 0) {
        return 'Duration must be a positive number';
    }
    return null;
};

exports.getAllBookings = async (req, res) => {
    try {
        const [bookings] = await Booking.fetchAll();
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to fetch booking details by id from the database
exports.getBookingById = async (req, res) => {
    try {
        const [booking] = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        console.error('Error fetching booking:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to create booking details in the database
exports.createBooking = async (req, res) => {
    const validationError = validateBookingDetails(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = req.body;
        await Booking.create({
            customer_name,
            booking_date,
            booking_time,
            total_amount,
            status,
            payment_method,
            duration_minutes
        });
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        console.error('Error creating booking:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to update booking details in the database
exports.updateBooking = async (req, res) => {
    try {
        const bookingDetails = req.body;
        const validationError = validateBookingDetails(bookingDetails);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        await Booking.update(req.params.id, bookingDetails);
        res.status(200).json({ message: 'Booking updated' });
    } catch (err) {
        console.error('Error updating booking:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to delete booking details from the database
exports.deleteBooking = async (req, res) => {
    try {
        await Booking.delete(req.params.id);
        res.status(200).json({ message: 'Booking deleted' });
    } catch (err) {
        console.error('Error deleting booking:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};