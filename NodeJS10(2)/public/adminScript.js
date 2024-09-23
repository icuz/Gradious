document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8000/api';

    // Fetch data from the backend
    async function fetchAdminStats() {
        try {
            const [usersResponse, bookingsResponse, failedBookingsResponse, pendingBookingsResponse, confirmedBookingsResponse] = await Promise.all([
                fetch(`${apiUrl}/users/total`),
                fetch(`${apiUrl}/bookings/admin/total-bookings`),
                fetch(`${apiUrl}/bookings/admin/failed-bookings`),
                fetch(`${apiUrl}/bookings/admin/pending-bookings`),
                fetch(`${apiUrl}/bookings/admin/confirmed-bookings`)
            ]);

            if (!usersResponse.ok || !bookingsResponse.ok || !failedBookingsResponse.ok || !pendingBookingsResponse.ok || !confirmedBookingsResponse.ok) {
                throw new Error('One or more requests failed');
            }

            const totalUsersData = await usersResponse.json();
            const totalBookingsData = await bookingsResponse.json();
            const failedBookingsData = await failedBookingsResponse.json();
            const pendingBookingsData = await pendingBookingsResponse.json();
            const confirmedBookingsData = await confirmedBookingsResponse.json();

            return {
                totalUsers: totalUsersData.totalUsers || 0,
                totalBookings: totalBookingsData.totalBookings || 0,
                failedBookings: failedBookingsData.bookings || [],
                pendingBookings: pendingBookingsData.bookings || [],
                confirmedBookings: confirmedBookingsData.bookings || []
            };
        } catch (error) {
            console.error('Error fetching admin stats:', error);
            return {
                totalUsers: 0,
                totalBookings: 0,
                failedBookings: [],
                pendingBookings: [],
                confirmedBookings: []
            };
        }
    }

    // Update the stats and bookings on the page
    function updateAdminStats() {
        fetchAdminStats().then((stats) => {
            const totalUsersElement = document.getElementById('totalUsers');
            const totalBookingsElement = document.getElementById('totalBookings');
            // const bookingsList = document.getElementById('bookingsList');    
            const pendingBookingsElement = document.getElementById('pendingRequests');
            const confirmedBookingsElement = document.getElementById('confirmedRequests');
    
            if (totalUsersElement) {
                totalUsersElement.textContent = stats.totalUsers;
            }
    
            if (totalBookingsElement) {
                totalBookingsElement.textContent = stats.totalBookings;
            }
    
            if (pendingBookingsElement) {
                pendingBookingsElement.textContent = stats.pendingBookings.length;
            }
    
            if (confirmedBookingsElement) {
                confirmedBookingsElement.textContent = stats.confirmedBookings.length;
            }
        });
    }

    // User management form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        if (!userName) {
            alert('User name is required');
            return;
        }

        const user = {
            id: userId,
            name: userName,
            password: password,
            role: role
        };

        if (userId) {
            updateUser(userId, user);
        } else {
            createUser(user);
        }
    });

    function createUser(user) {
        fetch(`${apiUrl}/bookings/admin/create-user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            console.log('Response status:', response.status); // Log the response status
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data); // Log the response data
            if (data.success) {
                alert('User created successfully');
                updateAdminStats(); // Refresh stats after creating user
                resetUserForm();
            } else {
                alert('Failed to create user: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors
            alert('An error occurred while creating the user.');
        });
    }

    function updateUser(id, user) {
        fetch(`${apiUrl}/bookings/admin/update-user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(() => {
            alert('User updated successfully');
            updateAdminStats(); // Refresh stats after updating user
            resetUserForm();
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteUser() {
        const userId = document.getElementById('userId').value;
        if (!userId) {
            alert('Please enter a user ID to delete');
            return;
        }

        fetch(`${apiUrl}/bookings/admin/delete-user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('User deleted successfully');
                updateAdminStats(); // Refresh stats after deleting user
                resetUserForm();
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function resetUserForm() {
        document.getElementById('userForm').reset();
    }

    // Define the getUsers function
    function getUsers() {
        fetch(`${apiUrl}/bookings/admin/users`)
            .then(response => response.json())
            .then(data => {
                const usersList = document.getElementById('usersList');
                if (!usersList) {
                    console.error('Element with ID "usersList" not found in the DOM.');
                    return;
                }
                usersList.innerHTML = ''; // Clear any existing users
    
                data.forEach(user => { // Iterate over the array of users
                    const userDiv = document.createElement('div');
                    userDiv.className = 'user';
                    userDiv.innerHTML = `
                        <p><strong>ID:</strong> ${user.id}</p>
                        <p><strong>Name:</strong> ${user.username}</p>
                        <p><strong>Password:</strong> ${user.password}</p>
                    `;
                    usersList.appendChild(userDiv);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }
    function fetchAndDisplayLogs() {
        fetch('/bookings/admin/logs')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const logsElement = document.getElementById('adminLogsContent');
                    if (logsElement) {
                        logsElement.textContent = data.logs;
                    }
                } else {
                    console.error('Failed to fetch logs:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching logs:', error);
            });
    }

    window.deleteUser = deleteUser;
    window.getUsers = getUsers;
    window.resetUserForm = resetUserForm;

    fetchAndDisplayLogs();
    updateAdminStats();
    getUsers();
});