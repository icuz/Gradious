document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        console.log('Sending request to /api/login');
        const response = await fetch('http://localhost:8000/api/login', { // Ensure the URL is correct
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
            window.location.href = result.redirectUrl;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    try {
        console.log('Sending request to /api/register');
        const response = await fetch('http://localhost:8000/api/register', { // Ensure the URL is correct
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, isAdmin })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
            alert('User registered successfully');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});