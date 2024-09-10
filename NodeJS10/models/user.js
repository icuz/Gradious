const db = require('../config/dataCon');

class UserManager {
    static async fetchTotalUsers() {
        try {
            const [rows] = await db.execute('SELECT COUNT(*) as totalUsers FROM users WHERE is_admin = 0');
            return rows[0].totalUsers;
        } catch (error) {
            console.error('Error fetching total users:', error);
            throw error;
        }
    }

    static async fetchAllUsers() {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE is_admin = 0');
            return rows;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async create(user) {
        try {
            const [result] = await db.execute('INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)', [user.username, user.password, user.is_admin]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async update(id, user) {
        try {
            const [result] = await db.execute('UPDATE users SET username = ?, password = ? WHERE id = ?', [user.username, user.password, id]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async findByUsername(username) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }
}

module.exports = UserManager;