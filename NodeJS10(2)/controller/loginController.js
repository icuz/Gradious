// const User = require('../models/login');

// exports.login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const [results] = await User.findByCredentials(username, password);

//         if (results.length > 0) {
//             const user = results[0];
//             if (user.is_admin) {
//                 res.json({ success: true, redirectUrl: 'http://localhost:8000/admin' });
//             } else {
//                 res.json({ success: true, redirectUrl: 'http://localhost:8000/users.html' }); // Changed to users.html
//             }
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Database error' });
//     }
// };

// exports.register = async (req, res) => {
//     const { username, password, isAdmin } = req.body;

//     try {
//         // Check if the user already exists
//         const [existingUser] = await User.findByUsername(username);
//         if (existingUser.length > 0) {
//             return res.json({ success: false, message: 'Username already exists' });
//         }

//         // Create a new user
//         const newUser = {
//             username,
//             password, // In a real application, make sure to hash the password before storing it
//             is_admin: isAdmin
//         };

//         await User.create(newUser);

//         res.json({ success: true, message: 'User registered successfully' });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Database error' });
//     }
// };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/login');
const JWT_SECRET="thisisasecretkey131241";

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await User.findByUsername(username);

        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.json({ success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username, role: user.is_admin ? 'admin' : 'user' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            if (user.is_admin) {
                res.json({ success: true, token, details:{ userId: user.id, username: user.username, role: user.is_admin ? 'admin' : 'user' }, redirectUrl: 'http://localhost:8000/admin' });
            } else {
                res.json({ success: true, token, details:{ userId: user.id, username: user.username, role: user.is_admin ? 'admin' : 'user' }, redirectUrl: 'http://localhost:8000/users.html' });
            }
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
};

exports.register = async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        const [existingUser] = await User.findByUsername(username);
        if (existingUser.length > 0) {
            return res.json({ success: false, message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
            is_admin: isAdmin
        };

        await User.create(newUser);

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error' });
    }
};
