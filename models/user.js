const connection = require('../utils/database');

const getAllUser = () => {
    return connection.execute("SELECT * FROM users");
}

const findUserByUsername = (username) => {
    return connection.execute("SELECT * FROM users WHERE username = ?", [username]);
}

const findUserByEmail = (email) => {
    return connection.execute("SELECT * FROM users WHERE email = ?", [email]);
}

module.exports = {
    getAllUser,
    findUserByUsername,
    findUserByEmail
}