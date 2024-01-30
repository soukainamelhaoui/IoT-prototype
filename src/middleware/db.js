const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Spiral*0*0*0',
    database: 'nodered',
    connectionLimit: 10
});

async function verifyUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.promise().query(query, [username]);

    return rows.length > 0;
}

async function verifyUser(username, password) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.promise().query(query, [username]);

    if (rows.length > 0) {
        const storedHashedPassword = rows[0].password;

        const passwordMatches = await bcrypt.compare(password, storedHashedPassword);

        return passwordMatches;
    }

    return false;
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function registerUser(username, hashedPassword) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await pool.promise().query(query, [username, hashedPassword]);
}

async function getUserPermissions(username) {
    const query = 'SELECT permissions FROM users WHERE username = ?';
    try {
        const [rows] = await pool.promise().query(query, [username]);
        return rows.length > 0 ? rows[0].permissions : null;
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        return null;
    }
}

module.exports = {
    verifyUsername,
    verifyUser,
    hashPassword,
    registerUser,
    getUserPermissions
};
