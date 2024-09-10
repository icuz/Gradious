const User = require('../models/login');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await User.findByCredentials(username, password);

        if (results.length > 0) {
            const user = results[0];
            if (user.is_admin) {
                res.json({ success: true, redirectUrl: 'http://localhost:8000/admin' });
            } else {
                res.json({ success: true, redirectUrl: 'http://localhost:8000/users.html' }); // Changed to users.html
            }
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error' });
    }
};

exports.register = async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await User.findByUsername(username);
        if (existingUser.length > 0) {
            return res.json({ success: false, message: 'Username already exists' });
        }

        // Create a new user
        const newUser = {
            username,
            password, // In a real application, make sure to hash the password before storing it
            is_admin: isAdmin
        };

        await User.create(newUser);

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error' });
    }
};