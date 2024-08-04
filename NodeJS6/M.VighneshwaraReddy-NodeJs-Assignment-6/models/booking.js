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

        return db.execute('INSERT INTO bookings (customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes])
            .catch(err => {
                throw new Error(err);
            });
    }

    // Update a booking by its ID
    static update(id, booking) {
        const { customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes } = booking;

        if (!customer_name || !booking_date || !booking_time || !total_amount || !status || !payment_method || !duration_minutes) {
            throw new Error('All fields are required');
        }

        return db.execute('UPDATE bookings SET customer_name = ?, booking_date = ?, booking_time = ?, total_amount = ?, status = ?, payment_method = ?, duration_minutes = ? WHERE id = ?', 
            [customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes, id]);
    }

    // Delete a booking by its ID
    static delete(id) {
        return db.execute('DELETE FROM bookings WHERE id = ?', [id]);
    }
}

module.exports = Booking;