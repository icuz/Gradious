document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8000/api/bookings';

    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const bookingId = document.getElementById('bookingId').value;
        const customerName = document.getElementById('customerName').value;
        const bookingDate = document.getElementById('bookingDate').value;
        const bookingTime = document.getElementById('bookingTime').value;
        const totalAmount = document.getElementById('totalAmount').value;
        const status = document.getElementById('status').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const durationMinutes = document.getElementById('durationMinutes').value;

        console.log('Form Values:', {
            bookingId,
            customerName,
            bookingDate,
            bookingTime,
            totalAmount,
            status,
            paymentMethod,
            durationMinutes
        });

        const booking = {
            customer_name: customerName,
            booking_date: bookingDate,
            booking_time: bookingTime,
            total_amount: totalAmount,
            status: status,
            payment_method: paymentMethod,
            duration_minutes: durationMinutes
        };

        if (bookingId) {
            updateBooking(bookingId, booking);
        } else {
            createBooking(booking);
        }
    });

    function createBooking(booking) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .then(() => {
            alert('Booking created successfully');
            getBookings();
            resetForm();
        })
        .catch(error => console.error('Error:', error));
    }

    function updateBooking(id, booking) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .then(() => {
            alert('Booking updated successfully');
            getBookings();
            resetForm();
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteBooking(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Booking deleted successfully');
                getBookings();
            } else {
                alert('Failed to delete booking');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function editBooking(id, customerName, bookingDate, bookingTime, totalAmount, status, paymentMethod, durationMinutes) {
        document.getElementById('bookingId').value = id;
        document.getElementById('customerName').value = customerName;
        
        if (bookingDate) {
            const date = new Date(bookingDate);
            const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            document.getElementById('bookingDate').value = formattedDate;
        } else {
            document.getElementById('bookingDate').value = '';
        }
        
        if (bookingTime) {
            const formattedTime = bookingTime.slice(0, 5);
            document.getElementById('bookingTime').value = formattedTime;
        } else {
            document.getElementById('bookingTime').value = '';
        }
        
        document.getElementById('totalAmount').value = totalAmount;
        document.getElementById('status').value = status;
        document.getElementById('paymentMethod').value = paymentMethod;
        document.getElementById('durationMinutes').value = durationMinutes;

        window.scrollTo(0, 0);
    }

    function getBookings() {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const bookingsDiv = document.getElementById('bookings');
            bookingsDiv.innerHTML = '';
            data.forEach(booking => {
                const date = new Date(booking.booking_date);
                const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                const bookingTime = booking.booking_time ? booking.booking_time.slice(0, 5) : 'N/A';
                const bookingElement = document.createElement('div');
                bookingElement.innerHTML = `
                    <p>
                        <strong>ID:</strong> ${booking.id} <br>
                        <strong>Customer Name:</strong> ${booking.customer_name} <br>
                        <strong>Booking Date:</strong> ${formattedDate} <br>
                        <strong>Booking Time:</strong> ${bookingTime} <br>
                        <strong>Total Amount:</strong> ${booking.total_amount} <br>
                        <strong>Status:</strong> ${booking.status} <br>
                        <strong>Payment Method:</strong> ${booking.payment_method} <br>
                        <strong>Duration (Minutes):</strong> ${booking.duration_minutes} <br>
                        <button onclick="editBooking('${booking.id}', '${booking.customer_name}', '${booking.booking_date}', '${booking.booking_time}', '${booking.total_amount}', '${booking.status}', '${booking.payment_method}', '${booking.duration_minutes}')">Edit</button>
                        <button onclick="deleteBooking('${booking.id}')">Delete</button>
                    </p>
                `;
                bookingsDiv.appendChild(bookingElement);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function findBookingById() {
        const bookingId = document.getElementById('bookingIdInput').value;
    
        if (!bookingId) {
            alert('Please enter a booking ID');
            return;
        }
    
        fetch(`${apiUrl}/${bookingId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || (Array.isArray(data) && data.length === 0) || (!Array.isArray(data) && !data.id)) {
                    alert('Booking not found');
                    return;
                }
    
                const booking = Array.isArray(data) ? data[0] : data;
    
                const defaultBooking = {
                    id: '',
                    customer_name: '',
                    booking_date: '',
                    booking_time: '',
                    total_amount: '',
                    status: '',
                    payment_method: '',
                    duration_minutes: ''
                };
    
                const finalBooking = { ...defaultBooking, ...booking };
    
                const date = new Date(finalBooking.booking_date);
                const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                const bookingTime = finalBooking.booking_time ? finalBooking.booking_time.slice(0, 5) : 'N/A';
    
                const bookingsDiv = document.getElementById('bookings');
                bookingsDiv.innerHTML = `
                    <div>
                        <h3>Search Result</h3>
                        <p>
                            <strong>ID:</strong> ${finalBooking.id} <br>
                            <strong>Customer Name:</strong> ${finalBooking.customer_name} <br>
                            <strong>Booking Date:</strong> ${formattedDate} <br>
                            <strong>Booking Time:</strong> ${bookingTime} <br>
                            <strong>Total Amount:</strong> ${finalBooking.total_amount} <br>
                            <strong>Status:</strong> ${finalBooking.status} <br>
                            <strong>Payment Method:</strong> ${finalBooking.payment_method} <br>
                            <strong>Duration (Minutes):</strong> ${finalBooking.duration_minutes} <br>
                            <button onclick="editBooking('${finalBooking.id}', '${finalBooking.customer_name}', '${formattedDate}', '${bookingTime}', '${finalBooking.total_amount}', '${finalBooking.status}', '${finalBooking.payment_method}', '${finalBooking.duration_minutes}')">Edit</button>
                            <button onclick="deleteBooking('${finalBooking.id}')">Delete</button>
                        </p>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching booking:', error);
                alert('Booking not found');
            });
    }

    function resetForm() {
        document.getElementById('bookingForm').reset();
        document.getElementById('bookingId').value = '';
    }

    window.getBookings = getBookings;
    window.editBooking = editBooking;
    window.deleteBooking = deleteBooking;
    window.findBookingById = findBookingById;
    window.resetForm = resetForm;

    getBookings();
});