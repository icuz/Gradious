const db = require('../config/dataCon');

class Booking {

    // Fetch all bookings from the database
    static fetchAll() {
        return db.execute('SELECT * FROM bookings');
    }

    // Fetch a booking by its ID
    static findById(id) {
        return db.execute('SELECT * FROM bookings WHERE id = ?', [id]);
    }

    // Create a new booking
    static create(booking) {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = booking;
        if (!customer_name || !booking_date || !booking_time || !total_amount || !status || !payment_method || !duration_minutes) {
            throw new Error('All fields are required');
        }

        return db.execute(
            'INSERT INTO bookings (customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes]
        ).catch(err => {
            throw new Error(err);
        });
    }

    // Update a booking by its ID
    static update(id, booking) {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = booking;

        if (!customer_name || !booking_date || !booking_time || !total_amount || !status || !payment_method || !duration_minutes) {
            throw new Error('All fields are required');
        }

        return db.execute(
            'UPDATE bookings SET customer_name = ?, booking_date = ?, booking_time = ?, total_amount = ?, status = ?, payment_method = ?, duration_minutes = ? WHERE id = ?', 
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes, id]
        );
    }

    // Delete a booking by its ID
    static delete(id) {
        return db.execute('DELETE FROM bookings WHERE id = ?', [id]);
    }

    // Fetch the total number of users (excluding admins)
    static fetchTotalUsers() {
        return db.execute('SELECT COUNT(*) as totalUsers FROM users WHERE is_admin = 0');
    }

    // Fetch the total number of bookings with status "confirmed" or "pending"
    static fetchTotalBookings() {
        return db.execute('SELECT COUNT(*) AS totalBookings FROM bookings WHERE status IN ("confirmed", "pending")');
    }

    // Fetch only the failed bookings
    static fetchFailedBookings() {
        return db.execute('SELECT * FROM bookings WHERE status = "cancelled"');
    }

    static fetchPendingBookings() {
        return db.execute('SELECT * FROM bookings WHERE status = "pending"');
    }

    static fetchConfirmedBookings() {
        return db.execute('SELECT * FROM bookings WHERE status = "confirmed"');
    }
}

module.exports = Booking;