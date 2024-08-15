CREATE DATABASE IF NOT EXISTS bookings;

use bookings;

select * from bookings;

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    duration_minutes INT NOT NULL
);

INSERT INTO bookings (customer_name, booking_date, booking_time, total_amount, status, payment_method, duration_minutes) 
VALUES
('Aarav Patel', '2024-10-15', '12:30:00', 200.00, 'Confirmed', 'Credit Card', 160),
('Neha Sharma', '2024-09-20', '14:00:00', 150.00, 'Pending', 'Debit Card', 120),
('Rohan Verma', '2024-08-25', '10:00:00', 100.00, 'Cancelled', 'Cash', 90),
('Isha Agarwal', '2024-11-10', '09:30:00', 250.00, 'Confirmed', 'Online', 180),
('Vikram Singh', '2024-12-05', '16:45:00', 300.00, 'Pending', 'Credit Card', 200);
('Rahul Sharma', '2024-07-30', '11:30:00', 120.00, 'Confirmed', 'Debit Card', 100);
('Ananya Singh', '2024-06-15', '15:00:00', 180.00, 'Pending', 'Cash', 150);
('Aryan Verma', '2024-05-20', '13:00:00', 220.00, 'Cancelled', 'Online', 160);
('Suhana Agarwal', '2024-04-10', '10:30:00', 130.00, 'Confirmed', 'Credit Card', 110);
('Rajat Singh', '2024-03-05', '17:00:00', 280.00, 'Pending', 'Debit Card', 190);