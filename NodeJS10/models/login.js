const db = require('../config/dataCon');

class User {
    // Fetch a user by username and password
    static findByCredentials(username, password) {
        return db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    }

    // Check if a username already exists
    static findByUsername(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }

    // Create a new user
    static create(user) {
        return db.execute('INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)', [user.username, user.password, user.is_admin]);
    }
}

module.exports = User;