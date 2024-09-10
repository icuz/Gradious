const fs = require('fs');
const path = require('path');
const UserManager = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserManager.fetchAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

exports.getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await UserManager.fetchTotalUsers();
        res.status(200).json({ totalUsers });
    } catch (err) {
        console.error('Error fetching total users:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await UserManager.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const newUser = {
            username,
            password,
            is_admin: 0 // Assuming new users are not admins by default
        };

        await UserManager.create(newUser);

        // Log the operation
        const logEntry = `User created: ${JSON.stringify(newUser)}\n`;
        const logFilePath = path.join(__dirname, '../logs/admin.log');

        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const affectedRows = await UserManager.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;

    try {
        const user = {
            username,
            password
        };

        const affectedRows = await UserManager.update(id, user);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}